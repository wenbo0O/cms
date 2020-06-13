import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import routes from './path'

const router = new Router({
  mode: 'history',
  routes
})

const jurisdiction = 3;
let isLogin = false;
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  // console.log(to.meta.jurisdiction.includes(jurisdiction))
  if (to.meta.title) {
    document.title = to.meta.title;
  };
  if (to.path == "/login") {
    next();
  }
  // if (!isLogin) {
  //   if (to.path == "/login1") {
  //     next();
  //   } else {
  //     next({
  //       path: "/aaa"
  //     });
  //   }
  // } else {
  //   if (to.meta.jurisdiction.includes(jurisdiction)) {
  //     next();
  //   } else {
  //     next({
  //       path: "/"
  //     });
  //   };
  // };

});

export default router;
