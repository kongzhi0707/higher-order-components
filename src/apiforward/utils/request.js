
// src/utils/request.js

const axios = require('axios');
const userAgent = require('./userAgent');

const request = (paramInfo) => {
  function getDataFn(obj) {
  	const getData = {
  	  url: obj.url,
  	  method: obj.method || 'get',
  	  baseURL: obj.baseURL || 'http://news.baidu.com/',
  	  headers: {
  	  	'User-Agent': userAgent(),
  	  }
  	};
  	if (getData.method === 'get') {
  	  getData.params = obj.data;
  	} else {
  	  getData.data = obj.data;
  	}
  	return getData;
  }
  if (!Array.isArray(paramInfo)) {
  	return axios(getDataFn(paramInfo));
  } else {
  	const fetchArray = paramInfo.map(v => {
  	  return axios(getDataFn(v));
  	});
  	return new Promise((resolve, reject) => {
  	  axios.all(fetchArray)
  	  	.then(axios.spread(function(...arg){
  	  	  // 多个请求都执行完成
  	  	  resolve(arg);
  	  	})).catch(err => {
  	  	  console.log('请求异常:' +err);
  	  	})
  	});
  }
};

module.exports = request;