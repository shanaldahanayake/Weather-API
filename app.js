const city = document.querySelector("#city");
const search = document.querySelector("#submit");

const apiKey = "91f501fe6824414c84e85533240509";

const getCityCoordinate = () => {
    const cityName = city.value.trim();
    if (!cityName) {
        alert("Enter a City");
    }
    
    const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

    fetch(urlCurrent).then(res => res.json()).then(data => {
    
        if (data.location.name==null) {
            alert("Not a Valid City");
            return;
        }

        document.querySelector("#entered-city").innerHTML="City : "+data.location.name;
        document.querySelector("#temp").innerHTML="Temparature : "+data.current.temp_c+"°C";
        document.querySelector("#wind").innerHTML="Wind : "+data.current.wind_mph+"mph";
        document.querySelector("#humadity").innerHTML="Humadity : "+data.current.humidity+"%";
        document.querySelector("#image").src=data.current.condition.icon;
        document.querySelector("#status").innerHTML=data.current.condition.text;
    }).catch(error => {
        console.error("Error fetching the weather data:", error);
    });
}
search.addEventListener('click', getCityCoordinate)

