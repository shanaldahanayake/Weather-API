const city = document.querySelector("#city");
const search = document.querySelector("#submit");

const apiKey = "91f501fe6824414c84e85533240509";

const getWeatherDetails=(cityName)=>{
    
    const urlForecast=`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5&aqi=no&alerts=no`;

    fetch(urlForecast).then(res=>res.json()).then(data=>{
        console.log(data);
    }).catch(() => {
        alert("An Error Occured in Forecast Data");
    });
}

const getCityCoordinate = () => {
    const cityName = city.value.trim();
    if (!cityName) return;
    console.log(cityName)

    const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

    fetch(urlCurrent).then(res => res.json()).then(data => {
    
        document.querySelector("#entered-city").innerHTML="City : "+data.location.name;
        document.querySelector("#temp").innerHTML="Temparature : "+data.current.temp_c+"°C";
        document.querySelector("#wind").innerHTML="Wind : "+data.current.wind_mph+"mph";
        document.querySelector("#humadity").innerHTML="Humadity : "+data.current.humidity+"%";
        document.querySelector("#image").src=data.current.condition.icon;
        document.querySelector("#status").innerHTML=data.current.condition.text;
    });
}
search.addEventListener('click', getCityCoordinate)

