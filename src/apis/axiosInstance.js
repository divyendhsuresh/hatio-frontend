import axios from "axios";
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

let axiosInstance = axios;
export default axiosInstance