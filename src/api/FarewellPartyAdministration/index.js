import urls from './urls'
import Service from '@/utils/fetch'

/**
 * 告别厅管理 预约管理
 */
// 获取当前账号权限下的全部预约信息列表
export function _findAllAppointments(data) {
  return Service({
    url: urls.findAllAppointments,
    data
  })
}

// 获取全部告别厅列表
export function _findAllFHs(data) {
  return Service({
    url: urls.findAllFHs,
    data
  })
}

// 逻辑删除预约信息
export function _delAppointment(data) {
  return Service({
    url: urls.delAppointment,
    data
  })
}

// 新建或修改预约
export function _editAppointment(data) {
  return Service({
    url: urls.editAppointment,
    data
  })
}

// 条件获取全部关系信息列表
export function _findAllRelations(data) {
  return Service({
    url: urls.findAllRelations,
    data
  })
}

// 修改预约信息状态：1-确定预约、2-仪式完成、3-审核管理、4-审核通过
export function _updAMStatus(data) {
  return Service({
    url: urls.updAMStatus,
    data
  })
}
