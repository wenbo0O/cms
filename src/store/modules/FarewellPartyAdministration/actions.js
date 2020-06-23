import {
  _findAllAppointments,
  _findAllFHs
} from '@/api/FarewellPartyAdministration'

import {
  catchErr
} from '@/utils/utils'
import {
  Message
} from 'element-ui'

export default {
  async getFindAllFHs({
    commit,
    state
  }, parmas = {
    data: state.tableFromData,
    pageInfo: state.tableFromPageInfo
  }) {
    let [err, res] = await catchErr(_findAllAppointments(parmas));
    if (err) {
      Message({
        message: err || "系统异常",
        type: "error",
        duration: 1000,
        forbidClick: true
      });
    } else if (res) {
      commit('SETOPTIONS', {
        TableCustomInfoManagement: res
      });
    }
  },

  // 获取告别厅菜单
  async findAllFHs({
    commit
  }) {
    let [err, res] = await catchErr(_findAllFHs());
    if (err) {
      Message({
        message: err || "系统异常",
        type: "error",
        duration: 1000,
        forbidClick: true
      });
    } else if (res) {
      commit('SETOPTIONS', {
        arrFhId: res.data
      });
    }
  }

}
