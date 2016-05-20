import axios from "axios"

let http = axios.create()

http.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default http