/**
 * api 接口统一管理
*/
// 域名引入
import { namespace } from './domain';
import HttpClient from './http';

const loc = window.location;
let prefix = '';
const dev = 'mode=dev';
const apiforward = ['localhost', '127.0.0.1'];
let domain = namespace;

if (loc.href.indexOf(dev) > -1) {
  // prefix = '';
} else {
  const flag = apiforward.filter((v) => loc.href.indexOf(v) > -1);
  if (flag) {
    prefix = '/api';
    domain = '';
  }
}
console.log('-----prefix----', prefix);

// 统一处理异常信息
const exception = {
  responseException(err) {
    console.log('返回异常', err);
    let message = '';
    const status = err.status - 0;
    switch (status) {
      case 400:
        message = '请求错误(400)';
        break;
      case 401:
        message = '未授权，请重新登录(401)';
        break;
      case 403:
        message = '拒绝访问(403)';
        break;
      case 404:
        message = '请求出错(404)';
        break;
      case 408:
        message = '请求超时(408)';
        break;
      case 500:
        message = '服务器错误(500)';
        break;
      case 501:
        message = '服务未实现(501)';
        break;
      case 502:
        message = '网络错误(502)';
        break;
      case 503:
        message = '服务不可用(503)';
        break;
      case 504:
        message = '网络超时(504)';
        break;
      case 505:
        message = 'HTTP版本不受支持(505)';
        break;
      default:
        message = `连接出错(${status})!`;
    }
    return `${message}，请检查网络或联系管理员！`;
  }
};
const httpClient = new HttpClient(exception);
const params = function(options) {
  const obj = {};
  for (const i in options) {
    if (options.hasOwnProperty(i)) {
      obj[i] = options[i];
    }
  }
  return obj;
};

// ---------------  公用的上传和下载 ---------------
export const fileUpload = options => httpClient.request({
  url: '',
  params: params(options),
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' }
});

// 文件下载
export const download = options => httpClient.request({
  url: '',
  params: params(options),
  method: options.method || 'post',
  responseType: options.blob || 'arraybuffer'
});


// 接口请求示列
export const getWidget = options => httpClient.request({
  url: `${domain}` + prefix + '/widget',
  params: params(options),
  method: 'get',
  // 请求拦截器回调函数
  requestCallBack(cfg) {
    console.log('xxxx--请求拦截器添加参数----');
    console.log(cfg);
    cfg.headers.Accept = 'application/x-www-form-urlencoded';
    cfg.headers.common.Authorization = 'AUTH_TOKEN';
  },
  // 响应拦截器回调函数
  responseCallBack(cfg) {
    // cfg.status = 404;
    console.log('---响应拦截器可以对返回的数据进行构造---', cfg);
    // cfg.data = {'xx': 11};
  }
});
