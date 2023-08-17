import { useState } from 'react'
import CountryService from './services/Country'
import WeatherService from './services/Weather'
import CountryList from './components/CountryList'
import WeatherDetail from './components/WeatherDetail'

const App = () => {
  const [inputCountry, setInputCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [timer, setTimer] = useState(null)
  const [weather, setWeather] = useState({
       city : null, 
       temp : null,
       wind : null,
      icon : null
  })
  const handleChange = (e) => {
    setInputCountry(e.target.value)
    if (e.target.value === '') {
      setCountries([])
      updateWeather([])
    }
    else {
      //USE Timeout to minimize call to api 
      clearTimeout(timer)
      const newTimer = setTimeout(() => {
        let countryData = []
        CountryService.getAll()
          .then((countryList) => {
            if (countryList.length === 0) {
              setCountries([])
              updateWeather([])
            } else {
              countryData = countryList.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
              setCountries(countryData)
              updateWeather(countryData)
            }
          })
          .catch(err => {
            console.log('get all error', err)
          })
      }, 200);
      setTimer(newTimer)
    }
  }

  const updateWeather = (list) =>{
    if(list.length === 0 || list.length > 1){
      setWeather({
        city : null, 
        temp : null,
        wind : null,
        icon : null
      })
      return
    }
    const { name,capital} = list[0]
    WeatherService.getWeather(name.common).then(data => {
      const temp = data.main.temp
      const wind = data.wind.speed
      const icon = data.weather[0].icon
      setWeather({
        city : capital[0], 
        temp : temp,
        wind : wind,
        icon : icon
      })
    })
  }
  return (
    <div>
      <label htmlFor="searchbar">Find Countries: </label>
      <input type='text' id='searchbar' onChange={handleChange} value={inputCountry}></input>
      <CountryList list={countries} setcountry={setCountries} updateweather={updateWeather}  />
      <WeatherDetail weatherdetail={weather} />
    </div>
  )
}

export default App;
