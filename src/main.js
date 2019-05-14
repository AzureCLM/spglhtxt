import Vue from 'vue';
import App from './App.vue';
//引入element-ui
import ElementUI from 'element-ui';
//引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
//引入axios
import axios from 'axios';
//引入路由
import VueRouter from 'vue-router';
//引入Login
import Login from './pages/Login.vue';
//引入Admin
import Admin from './pages/Admin.vue';
//引入GoodsList
import GoodsList from './pages/GoodsList.vue';
//引入GoodsAdd
import GoodsAdd from './pages/GoosAdd.vue';
//引入GoodsEdit
import GoodsEdit from './pages/GoodsEdit.vue';
//引入CategoryList
import CategoryList from './pages/CategoryList.vue';

const routes = [{
    path: '/',
    redirect: '/admin'
  },  
  {
    path: '/login',
    meta: '登录',
    component: Login
  },
  {
    path: '/admin',
    meta: '管理后台',
    component: Admin,
    children: [{
        path: 'goods-list',
        meta: '商品列表',
        component: GoodsList
      },
      {
        path: 'goods-add',
        meta: '添加商品',
        component: GoodsAdd
      },
      {
        path: 'goods-edit/:id',
        meta: '编辑商品',
        component: GoodsEdit
      },
      {
        path: 'category-list',
        meta: '栏目列表',
        component: CategoryList
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

//路由导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  //先判断是否进入登录页面，以免造成死循环
  if (to.path == '/login') {
    return next();
  }
  //判断是否已经登录
  if (!localStorage.getItem('username')) {
    next('/login');
  } else {
    next();
  }
})

axios.defaults.withCredentials = true;
//axios的公共路径
axios.defaults.baseURL = 'http://localhost:8899';
//把axios绑定到vue实例的$axios上
Vue.prototype.$axios = axios;

//是否是生成环境
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
// Vue.use(Less)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')