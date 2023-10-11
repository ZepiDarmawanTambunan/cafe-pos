import axios from 'axios';

const Api = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true, // if use session
})

export default Api;