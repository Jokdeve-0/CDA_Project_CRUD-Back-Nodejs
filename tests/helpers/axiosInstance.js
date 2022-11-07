const axios = require('axios');
const { identity, merge } = require('lodash');
const baseUrl = 'http://localhost:8081/api';
module.exports= axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


let csrfLoading;
async function provideCsrf(config) {
  if (config.url === 'csrfToken') {
    return config;
  }

  if (!csrfLoading) {
    csrfLoading = axiosInstance.get('csrfToken');
  }
  await csrfLoading;

  const newHeaders = { 'x-csrf-token': 'xxxxxx' };


  return merge(config,{headers: newHeaders});
}

function handleError(error) {
  // console.log("axios32",error.response)
  if (error.response && error.response.status === 401 || error.message) {
    // window.location = '/login';
  }
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(provideCsrf);
axiosInstance.interceptors.request.use(identity, handleError);
axiosInstance.interceptors.response.use(identity, handleError);