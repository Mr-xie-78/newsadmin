import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/page/Login"
import Home from "@/page/Home"
import PostList from "@/page/PostList"
import EditPost from "@/page/EditPost"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home,
      meta:'首页',
      children:[
        {
          path:'postlist',
          name:'PostListPage',
          component:PostList,
          meta:'文章列表',
        },
        {
          path:'editpost',
          name:'EditPostPage',
          component:EditPost,
          meta:'文章发布',
        }
      ]
    },
    {
      path:'/login',
      name:'LoginPage',
      component:Login,
    }
  ]
})
