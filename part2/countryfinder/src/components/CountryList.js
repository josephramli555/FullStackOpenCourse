const CountryList = ({ list, setcountry, updateweather }) => {
    if (list.length === 0) {
        return null
    } else if (list.length === 1) {
        const { name, capital, area, languages, flags } = list[0]
        const langs = []
        for (let key in languages) {
            langs.push(languages[key])
        }
        return (
            <>
                <h1>{name.common}</h1>
                <div>capital {capital[0]}</div>
                <div>area {area}</div>
                <h1>Languages</h1>
                <ul>
                    {langs.map((lang, idx) => <li key={idx}>{lang}</li>)}
                </ul>
                <img src={flags.png} alt='not exist' />
            </>
        )
    } else if (list.length > 10) {
        return <div>Too Many Matches Specify another filter</div>
    } else {
        return (
            list.map((country) => <div key={country.name.common}>{country.name.common}
                <button
                    onClick=
                    {() => {
                        setcountry([country])
                        updateweather([country])
                    }}>show</button></div>)
        )
    }
}

export default CountryList