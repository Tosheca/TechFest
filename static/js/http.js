import axios from "axios"

let http = axios.create()

http.defaults.headers.common['Authorization'] = "";

export default http