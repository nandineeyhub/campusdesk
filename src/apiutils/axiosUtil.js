import axios from 'axios';
import { defaultConfig } from './Config';

const axiosInt = axios.create({ 
    baseURL: defaultConfig.baseAPIUrl
}
);

axiosInt.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'There is an error!'
    )
);

export default axiosInt;
