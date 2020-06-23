export default {
  /**
   * 账号管理
   */
  // 获取全部账号信息列表
  findAllAdmins: '/api/bygAdmin/findAllAdmins',

  // 校验当前账户是否有未完成的工作复制文档
  checkAdmin: '/api/bygAdmin/checkAdmin',

  // 停用/启用单位登录账户
  upDownAdmin: '/api/bygAdmin/upDownAdmin',

  // 编辑&新建 单位登录账户信息
  editAdmin: '/api/bygAdmin/editAdmin',


  /**
   * 告别厅管理
   */
  // 获取全部告别厅信息列表
  findAllFHs: '/api/bygFarewellHall/findAllFHs',

  // 新建或修改告别厅信息复制文档
  editFH: '/api/bygFarewellHall/editFH',

  // 逻辑删除告别厅信息复制文档
  delFHById: '/api/bygFarewellHall/delFHById',


  /**
   * 风俗信息管理
   */
  // 获取风俗信息数据列表
  findAllCustoms: '/api/bygCustom/findAllCustoms',

  // 获取风俗信息数据
  findCustomById: '/api/bygCustom/findCustomById',

  // 新建或编辑风俗信息数据
  editCustom: '/api/bygCustom/editCustom',

  // 编辑风俗信息排序
  editCustomNo: '/api/bygCustom/editCustomNo',

  // 删除风俗信息
  delCustom: '/api/bygCustom/delCustom'
}
