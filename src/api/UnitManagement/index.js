import urls from './urls'
import Service from '@/utils/fetch'

/**
 * 账号管理
 */
// 获取全部账号信息列表
export function _getFindAllAdmins(data) {
  return Service({
    url: urls.findAllAdmins,
    data
  })
}

// 校验当前账户是否有未完成的工作
export function _getCheckAdmin(data) {
  return Service({
    url: urls.checkAdmin,
    data
  })
}

// 停用/启用单位登录账户
export function _upDownAdmin(data) {
  return Service({
    url: urls.upDownAdmin,
    data
  })
}

// 编辑&新建 单位登录账户信息
export function _editAdmin(data) {
  return Service({
    url: urls.editAdmin,
    data
  })
}


/**
 * 告别厅管理
 */
// 获取全部告别厅信息列表
export function _findAllFHs(data) {
  return Service({
    url: urls.findAllFHs,
    data
  })
}

// 新建或修改告别厅信息复制文档
export function _editFH(data) {
  return Service({
    url: urls.editFH,
    data
  })
}

// 逻辑删除告别厅信息复制文档
export function _delFHById(data) {
  return Service({
    url: urls.delFHById,
    data
  })
}


/**
 * 风俗信息管理
 */
// 获取风俗信息数据列表
export function _findAllCustoms(data) {
  return Service({
    url: urls.findAllCustoms,
    data
  })
}

// 获取风俗信息数据
export function _findCustomById(data) {
  return Service({
    url: urls.findCustomById,
    data
  })
}

// 新建或编辑风俗信息数据
export function _editCustom(data) {
  return Service({
    url: urls.editCustom,
    data
  })
}

// 编辑风俗信息排序
export function _editCustomNo(data) {
  return Service({
    url: urls.editCustomNo,
    data
  })
}

// 删除风俗信息
export function _delCustom(data) {
  return Service({
    url: urls.delCustom,
    data
  })
}
