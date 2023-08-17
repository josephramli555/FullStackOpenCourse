import axios from 'axios'
const BASEURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(BASEURL)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(BASEURL, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const URIDELETE = BASEURL + `/${id}`
    const request = axios.delete(URIDELETE)
    return request.then(response =>response.data)
}

const updatePerson = (id,newObject)=>{
    const URIUPDATE = BASEURL + `/${id}`
    const request  = axios.put(URIUPDATE,newObject)
    return request.then(response=>response.data)
}

const exported = {
    getAll,
    create,
    deletePerson,
    updatePerson
}

export default exported
