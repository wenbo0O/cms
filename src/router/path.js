import NurserySetting from '@/pages/NurserySetting'
import Login from '@/pages/Login' // 登录
import FarewellPartyAdministration from '@/pages/FarewellPartyAdministration' // 告别会管理
import UnitManagement from '@/pages/UnitManagement' // 单位管理
import AccountManagementView from '@/pages/UnitManagement/components/AccountManagement/ViewBox' // 单位管理 - 账号管理&新建
import HallManagementView from '@/pages/UnitManagement/components/HallManagement/ViewBox' // 单位管理 - 告别厅管理&新建
import CustomInfoView from '@/pages/UnitManagement/components/CustomInfoManagement/ViewBox' // 单位管理 - 风俗信息&新建编辑查看

/**
 * jurisdiction 权限鉴别
 * 1 操作者
 * 2 审核者
 * 3 单位管理员
 */
export default [{
    path: '/',
    name: 'NurserySetting',
    component: NurserySetting,
    meta: {
      title: "demo",
      jurisdiction: [1, 2, 3]
    }
  },
  {
    path: '/Login1',
    name: 'Login',
    component: Login,
    meta: {
      title: "登录",
      jurisdiction: [1, 2]
    }
  },
  {
    path: '/FarewellPartyAdministration',
    name: 'FarewellPartyAdministration',
    component: FarewellPartyAdministration,
    meta: {
      title: "demo",
      jurisdiction: [1]
    }
  },
  {
    path: '/Unit',
    name: 'UnitManagement',
    component: UnitManagement,
    redirect: '/Unit/AccountManagementView',
    meta: {
      title: "demo",
      jurisdiction: [1]
    },
    children: [{
      path: '/Unit/AccountManagementView',
      name: 'AccountManagementView',
      component: AccountManagementView,
      meta: {
        title: "demo",
        jurisdiction: [1]
      }
    }, {
      path: '/Unit/HallManagementView',
      name: 'HallManagementView',
      component: HallManagementView,
      meta: {
        title: "demo",
        jurisdiction: [1]
      }
    }, {
      path: '/Unit/CustomInfoView',
      name: 'CustomInfoView',
      component: CustomInfoView,
      meta: {
        title: "风俗信息管理",
        jurisdiction: [1]
      }
    }]
  }, {
    path: '*',
    redirect: '/'
  }



]
