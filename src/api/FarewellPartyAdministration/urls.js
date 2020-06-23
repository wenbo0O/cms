export default {
  /**
   * 告别厅管理 预约管理
   */
  // 获取全部告别厅列表
  findAllFHs: '/api/bygAM/common/findAllFHs',

  // 获取当前账号权限下的全部预约信息列表
  findAllAppointments: '/api/bygAM/common/findAllAppointments',

  // 逻辑删除预约信息
  delAppointment: '/api/bygAM/operate/delAppointment',

  // 新建或修改预约
  editAppointment: '/api/bygAM/operate/editAppointment',

  // 条件获取全部关系信息列表
  findAllRelations: '/api/bygAM/operate/findAllRelations',

  // 修改预约信息状态：1-确定预约、2-仪式完成、3-审核管理、4-审核通过
  updAMStatus: '/api/bygAM/common/updAMStatus'

}
