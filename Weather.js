const rooturl = "http://api.openweathermap.org/data/2.5/weather?appid="

//Add your personal API keys after the appid

export const fetchWeather = (lat, lon) => {
    const url = rooturl + '&lat=' + lat + '&lon=' + lon+'&units=metric';
    console.log(url);

    return fetch(url).then(res => res.json())
        .then(json =>({
            temp:json.main.temp,
            weather:json.weather[0].main
        }))
}