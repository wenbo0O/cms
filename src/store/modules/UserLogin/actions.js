import {
  _sendLogin,
  _validateCaptcha
} from '@/api/UserLogin'
import {
  catchErr
} from '@/utils/utils'
import {
  Message
} from 'element-ui'
import router from '@/router'

export default {
  async sendLogin({
    commit,
    state
  }, parmas = state.ruleForm) {
    let [err, res] = await catchErr(_validateCaptcha({
      data: parmas.baseReqDto
    }));
    if (err) {
      Message.error(err || '系统异常');
      return false;
    };

    let [err_login, res_login] = await catchErr(_sendLogin({
      name: parmas.unit + '_' + parmas.account,
      pwd: parmas.pwd
    }));
    if (err_login) {
      Message.error(err || '错了哦，系统异常');
    } else if (res_login) {
      Message.success(res.message);
      console.log(res)
      console.log(router)
      // router.replace({
      //   path: router.$router.query.redirect
      // });
      // let {
      //   id,
      //   food_name,
      //   price,
      //   food_content
      // } = res.data;
      // let parmas = {
      //   id,
      //   food_name,
      //   price,
      //   food_content
      // }
      // commit('SETOPTIONS', parmas)
    }
  }
}
