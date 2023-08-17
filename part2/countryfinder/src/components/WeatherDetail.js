const WeatherDetail = ({ weatherdetail }) => {
    const { city, temp, icon, wind } = weatherdetail
    if (!city) {
        return null
    } else {
        let iconLink = `https://openweathermap.org/img/wn/${icon}@2x.png`
        return (
            <>
                <h1>Weather in {city}</h1>
                <p>temperature {temp} kelvin</p>
                <img src={iconLink} alt='icon not found' />
                <p>Wind {wind} m/s</p>
            </>
        )
    }
}

export default WeatherDetail