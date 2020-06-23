import urls from './urls'
import Service from '@/utils/fetch'

// 登录接口
export function _sendLogin(data) {
  let postData = new FormData()
  Object.keys(data).forEach(key => {
    postData.append(key, data[key])
  });

  return Service({
    url: urls.sendLogin,
    data: postData,
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  })
}

// 获取单位登录验证码base64数据
export function _getCaptchaBase64() {
  return Service({
    url: urls.getCaptchaBase64
  })
}

// 校验单位登录验证码
export function _validateCaptcha(data) {
  return Service({
    url: urls.validateCaptcha,
    data
  })
}
