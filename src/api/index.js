import axios from 'axios';
// import { i18n } from "@i18n";
import { Message } from 'element-ui';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    Message.error('错了哦，请求出错了');
    return Promise.reject(error);
  }
);

export const reqHandler = function(option = {}) {
  return axios(option);
};
