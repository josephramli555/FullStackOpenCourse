import axios from 'axios'
const baseUrl = '/api/users'

const getAll = ()=>{
    let request = axios.get(baseUrl)
    return request.then(res=>res.data)
}
export default {getAll}