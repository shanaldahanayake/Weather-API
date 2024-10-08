const city = document.querySelector("#city");
const search = document.querySelector("#submit");

const apiKey = "91f501fe6824414c84e85533240509";
const days = 5;

const getCityCoordinate = () => {
    const cityName = city.value.trim();
    if (!cityName) {
        alert("Enter a City");
    }

    const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

    fetch(urlCurrent).then(res => res.json()).then(data => {

        if (data.location.name == null) {
            alert("Not a Valid City");
            return;
        }

        document.querySelector("#entered-city").innerHTML = "City : " + data.location.name;
        document.querySelector("#temp").innerHTML = "Temparature : " + data.current.temp_c + "°C";
        document.querySelector("#wind").innerHTML = "Wind : " + data.current.wind_mph + "mph";
        document.querySelector("#humadity").innerHTML = "Humadity : " + data.current.humidity + "%";
        document.querySelector("#image").src = data.current.condition.icon;
        document.querySelector("#status").innerHTML = data.current.condition.text;
    }).catch(error => {
        console.error("Error fetching the weather data:", error);
    });
    foreCast(cityName);
   
}

function foreCast(cityName) {

    const urlCurrent = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=${days}&aqi=no&alerts=no`;

        let row=document.getElementById('forcastRow');
        row.innerHTML="";
        fetch(urlCurrent)
        .then(res => res.json())
        .then(data => {
            
                data.forecast.forecastday.forEach(day=>{
                   
                    let div1=document.createElement('div');
                    div1.classList.add("col-3");
                    div1.classList.add("mt-3");
                    let div2=document.createElement('div');
                    div2.innerHTML=`<div class="card" style="width: 18rem;">
                                        <img class="card-img-top img-fluid mx-auto" style="max-width: 100px;" src=${day.day.condition.icon} alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">${day.date}</h5>
                                            <p class="card-text">${day.day.condition.text}</p>
                                            <h4 id="temp">Max Temrature: ${day.day.maxtemp_c} C</h4>
                                            <h4 id="wind">Max Wind:${day.day.maxwind_mph} mph</h4>
                                        </div>
                                        </div>`
                    
                    div1.appendChild(div2);
                    row.append(div1);                    

                })

            }
        )
    
}

search.addEventListener('click', getCityCoordinate)


