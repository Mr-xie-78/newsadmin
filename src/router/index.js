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
      children:[
        {
          path:'postlist',
          name:'PostListPage',
          component:PostList
        },
        {
          path:'editpost',
          name:'EditPostPage',
          component:EditPost
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
