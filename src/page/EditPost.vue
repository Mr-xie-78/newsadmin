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

    <el-form-item label="封面图片">
              <!-- 加上file-list这个属性，才能实现数据的双向绑定 -->
          <el-upload v-if="$route.query.id"
              :file-list="coverList"
              :action="$axios.defaults.baseURL + '/upload/'"
              list-type="picture-card"
              :on-success="coverUploaded"
              :on-remove="coverRemoved"
              :headers="{Authorization:token}">
              <i class="el-icon-plus"></i>
          </el-upload>
          <el-upload v-else
              :action="$axios.defaults.baseURL + '/upload/'"
              list-type="picture-card"
              :on-success="coverUploaded"
              :on-remove="coverRemoved"
              :headers="{Authorization:token}">
              <i class="el-icon-plus"></i>
          </el-upload>
      </el-form-item>

      

     <el-form-item label="类型">
          <el-radio-group v-model="form.type">
              <el-radio :label="1">文章</el-radio>
              <el-radio :label="2">视频</el-radio>
          </el-radio-group>
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
      postId:this.$route.query.id,
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
      coverList:[]
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
    if(this.postId){
        // 如果有postId就发请求获取数据，渲染页面
        this.$axios({
          url:'/post/'+this.postId,
          method:'get'
        }).then(res=>{
          console.log(res);
          const {data} = res.data
          // 处理栏目数据
          var newcategoriesList = []
          data.categories.forEach(e=>{
            newcategoriesList.push(e.id)
          })
          data.categories = newcategoriesList

          // 如果是历史遗留数据, 带有 div 标签 
          // 富文本框不能接受,就要使用 正则表达式来替换 div 为 p
          data.content = data.content.replace(/div/g, 'p')

          // 处理封面图片
          data.cover.forEach((e,index)=>{
              e.url = this.$fixMig(e.url)
              e.uid = index
          })
          this.coverList = data.cover
          // console.log(this.coverList);
          this.form = data
        })
        }
  },
  methods:{
    onSubmit(){
      // console.log(this.form);
      if(this.form.title == ''|| this.form.categories == [] ||  this.form.type == ''||  this.form.content == ''||  this.form.cover == []){
        this.$message.error('不能有空');
        return
      }
      var newIdList = []
      this.form.categories.forEach(e => {
        newIdList.push({id:e})
      });
      this.form.categories = newIdList
      // console.log(this.form);
      // 处理完数据，发请求，发布文章
      if(this.postId){
        this.form.cover = this.coverList
      }
      this.$axios({
        url: this.postId? '/post_update/'+this.postId : '/post',
        method:'post',
        data:this.form
      }).then(res=>{
        console.log(res);
        if(res.data.message=="文章发布成功"){
          this.$router.push({
            name:'PostListPage'
          })
        }else if(res.data.message == "文章编辑成功"){
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
    coverRemoved(file,fileList) {
		// file是当前删除的文件
		// fileList是生育的文件
        // 处理封面图插件,删除图片时的函数
		console.log("删除了图片");  
		this.form.cover = fileList
    },
    coverUploaded(res,file){
      // console.log(res);
      this.form.cover = [...this.form.cover,{
        id:res.data.id,
        url:this.$fixMig(res.data.url)
      }]
      this.coverList.push(file)
      // console.log(this.form); 
      // console.log(this.coverList);
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