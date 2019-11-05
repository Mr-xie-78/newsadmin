<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题" style="width:500px">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      
       <el-form-item>
            <vue-editor 
            v-model="form.content"
            :useCustomImageHandler="true"
            @image-added="imgUpload"
            :editorToolbar="customToolbar"
            ></vue-editor>
        </el-form-item>

      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox :label="item.id" v-for="(item,index) in getcheckList" :key="index">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    <el-form-item>
          <el-upload
              :action="$axios.defaults.baseURL + '/upload/'"
              list-type="picture-card"
              :on-success="coverUploaded"
              :on-remove="coverRemoved"
              :headers="{Authorization:token}">
              <i class="el-icon-plus"></i>
          </el-upload>
      </el-form-item>

    <el-form-item label="类型">
        <el-radio v-model="form.type" label="1">文章</el-radio>
        <el-radio v-model="form.type" label="2">视频</el-radio>
    </el-form-item>

    <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components:{
    VueEditor
  },
  data(){
    return {
      form:{
        title:'',
        categories:[],
        type:'',
        content:'<h1>有内容</h1>',
        cover:[]
      },
      getcheckList: [],
      customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]],
      token:localStorage.getItem('token'),
    }
  },
  mounted(){
    this.$axios({
      url:'/category',
      method:'get',
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }).then(res=>{
      // console.log(res);
      const {data} = res.data
      var newList = []
      data.forEach(e => {
        if(e.id !=0 && e.id != 999){
          newList.push(e)
        }
      });
      this.getcheckList = newList
    })
  },
  methods:{
    onSubmit(){
      // console.log(this.form);
      var newIdList = []
      this.form.categories.forEach(e => {
        newIdList.push({id:e})
      });
      this.form.categories = newIdList

      var newCoverList = []
      this.form.cover.forEach(e => {
        newCoverList.push({id:e})
      });
      this.form.cover = newCoverList
      console.log(this.form);
      // 处理完数据，发请求，发布文章
      this.$axios({
        url:'/post',
        method:'post',
        data:this.form
      }).then(res=>{
        console.log(res);
        if(res.data.data.message=="文章发布成功"){
          console.log(123);
          this.$router.push({
            name:'PostListPage'
          })
        }
      })
    },
    imgUpload(file, Editor, cursorLocation, resetUploader){
      var formData = new FormData();
      formData.append("file", file);
      this.$axios({
        url:'/upload',
        method:'post',
        data:formData
      }).then(result => {
          let url = this.$axios.defaults.baseURL + result.data.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
      });   
    },
    coverRemoved() {
        // 处理封面图插件,删除图片时的函数
        console.log("删除了图片");  
    },
    coverUploaded(res){
      // console.log(res);
      this.form.cover.push(res.data.id)
      // console.log(this.form); 
    }
  }
}
</script>

<style lang="less" scoped>
  .el-checkbox-group{
    padding: 10px 20px;
    width: 700px;
    font-size: 18px
  }
</style>