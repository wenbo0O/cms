export default {
  data: [],
  // navtab当前index
  numTableActiveIndex: 0,
  // 请求时禁用组件
  tableLoading: true,
  // 新增餐点右侧弹窗数据Start
  showPrintPage: false, // 显示/隐藏
  submitFormLoading: false, // 滑框提交按钮
  rightPopTitle: "", // 滑框标题


  /**
   * 账号管理
   */
  TableAccountManagement: {},
  // 账号管理切换
  indexAccountManagement: 0,
  // 告别厅管理切换
  indexHallManagement: 0,
  // 风俗信息管理切换
  indexCustomInfoManagement: 1,
  // 新建账号&编辑账号 表单数据集合
  NewAccountManagementFromData: {
    role: {
      id: "",
      name: ""
    }
  },


  /**
   * 告别厅管理
   */
  TableHallManagement: {},
  // 告别厅管理 子页面索引切换
  indexHallManagement: 0,
  // 新建&编辑告别厅 表单数据集合
  NewHallManagementFromData: {},


  /**
   * 风俗信息管理
   */
  TableCustomInfoManagement: {},
  // 风俗信息管理 子页面索引切换
  indexCustomInfoManagement: 0,
  // 详情页查看&编辑 当前数据id
  customId: null,
  // 新建&编辑风俗信息管理 表单数据集合
  picvideoPath: {
    pictureUrls: [],
    videoUrl: "",
    videoCoverUrl: ""
  },
  // 风俗信息模板预览
  previewDialogVisible: false
}
