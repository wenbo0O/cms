import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import routes from './path'

import {
  Message
} from 'element-ui'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes
})

const jurisdiction = 3;
let isLogin = true;
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  };
  if (!isLogin) {
    if (to.path == "/userlogin") {
      next();
    } else {
      next({
        path: "/userlogin"
      });
    }
  } else {
    if (to.meta.jurisdiction.includes(jurisdiction)) {
      if (to.path == "/userlogin") {
        next({
          path: "/"
        });
      } else {
        next();
      };
    } else {
      Message({
        showClose: true,
        message: '无访问权限',
        type: 'warning',
        duration: 1000,
        onClose: function () {
          next({
            path: "/"
          });
        }
      });

    }
  }

});

export default router;
