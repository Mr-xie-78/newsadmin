<template>
    <el-container class="wrapper">
        <el-aside width="200px">
            <div class="logo">
                黑马头条
            </div>
            <el-menu>
                <el-menu-item index="2" @click="$router.push('/postlist')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章列表</span>
                </el-menu-item>
                <el-menu-item index="4" @click="$router.push('/editpost')">
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
            user: JSON.parse(localStorage.getItem('user'))
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
// 如果没样式，也有可能是标签误删了
</style>