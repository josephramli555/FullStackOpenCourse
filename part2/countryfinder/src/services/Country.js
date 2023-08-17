import axios from 'axios'

const BASEURL = 'https://studies.cs.helsinki.fi/restcountries/api'


const getAll = () => {
    let response = axios.get(BASEURL + '/all')
        .then(res => res.data)
        .catch(err => console.log(err))
    return response
}

const exported = {
    getAll
}

export default exported
