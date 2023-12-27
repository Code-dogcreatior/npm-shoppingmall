import axios from 'axios';
import { Modal } from 'antd';
const axiosInstance = axios.create({
    baseURL : `http://one77.cc/api/one77/mall` ,
    withCredentials : true
})

axiosInstance.interceptors.response.use(res => {
    if(res.data.code == 0){
        return res.data.data;
    }
    else if(res.data.code == -1){
        return null;
    }
    else if(res.data.code > 0){
        Modal.error({title : res.data.errorMessage })
    }else{
        return Promise.reject(res.data);
    }
})

export default axiosInstance;