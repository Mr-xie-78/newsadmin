<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column 
        label="id"
        width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="缩略图"
        width="200">
        <template slot-scope="scope">
          <img :src="$fixMig(scope.row.cover[0].url)" alt="" class="thumbnail">
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        width="500">
        <template slot-scope="scope">
        <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="作者名称"
        width="100">
        <template slot-scope="scope">
        <span>{{ scope.row.user.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next"
      :page-sizes="[2, 5, 10, 20]"
      :total="100"
      @current-change="changePage"
      @size-change="changeSize">
    </el-pagination>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            pageIndex: 1,
            pageSize: 10,
        }
    },
    mounted(){
      this.getPostList()
    },
    methods:{
      changePage(val){
        this.pageIndex = val
        this.getPostList()
      },
      getPostList(){
        this.$axios({
            url:'post',
            method:'get',
            params:{
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
        }).then(res=>{
            // console.log(res);
            this.tableData = res.data.data
        })
      },
      changeSize(val){
        this.pageSize = val
        this.getPostList()
      }
    }
}
</script>
<style lang="less" scoped>
  .thumbnail {
    width: 200px;
    height: 120px;
    object-fit: cover;
}
</style>
