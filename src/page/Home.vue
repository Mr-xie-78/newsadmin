<template>
    <el-container class="wrapper">
        <el-aside width="200px">
            <div class="logo">
                黑马头条
            </div>
            <el-menu>
                <el-menu-item index="2" @click="jumpPage('/postlist')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章列表</span>
                </el-menu-item>
                <el-menu-item index="4" @click="jumpPage('/editpost')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
              <el-header class="el-header">
                  <!-- 在vue里面使用axios是要加$的，因为添加到原型的时候设计的 -->
                <img class="avatar" v-if="user.head_img" :src="$axios.defaults.baseURL + user.head_img" alt="">
                <img class="avatar" v-else src="../assets/logo.png" alt="">
                <span class="nickname">{{user.nickname}}</span>
            </el-header>
            <div class="meta" @click="$router.back()">
                {{breadcrumb}}
            </div>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
     data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            mate:''
        }
    },
    computed:{
        // 监听路由变化，更改meta
        breadcrumb(){
            let res = '';
            // console.log(this.$route)
            this.$route.matched.forEach(e => {
                res+=e.meta+'->'
            });
            return res
        }
    },
    methods:{
        // 再点击一次同样的路由会报错，所以，要判断路由是否哟改变
        jumpPage(path){
            if(path != this.$route.path){
                this.$router.push(path)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
}
.el-header{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .avatar {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 10px;
    }
    .nickname {
        font-weight: bold;
    }
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
   .logo{
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #000;
    }
  
  .el-aside {
     background-color: #888;
    color: #fff;
    text-align: center;
    line-height: 200px;
  }
  .meta{
      margin: 10px 50px;
  }
// 如果没样式，也有可能是标签误删了
</style>