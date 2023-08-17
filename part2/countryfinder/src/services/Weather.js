import axios from "axios"
const APIKEY = process.env.REACT_APP_WEATHERKEY
const BASEURL = 'https://api.openweathermap.org/data/2.5/'


const getWeather = (city) => {
    const URL = `${BASEURL}/weather?q=${city}&appid=${APIKEY}`
    let response = axios.get(URL)
        .then(res => res.data)
        .catch(err => {
            console.log("Request weather error", err)
        })
    return response

}


const exported = {
    getWeather
}
export default exported

