const Api_Key = `YOUR_KEY`
localStorage.removeItem("lastCity")
let cityName;


// -------------------------------------------------------------- \\

function getCity() {

    event.preventDefault()
    cityName = document.getElementById("inputCity")
    callApi(cityName.value)

}

// -------------------------------------------------------------- \\


let callApi = async(city_Name) => {
    let getData;

    main_div.classList.add("h-40")
    main_div.classList.remove("invisible")
    main_div.innerHTML = `<span class="loader"></span>`

    let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_Name}&appid=${Api_Key}&units=metric`)

    .then(async(response) => {

            let localSCity = localStorage.getItem("lastCity")

            if (response.status == "404") {

                if (!localSCity) {
                    mess("Please enter correct city name")
                    main_div.classList.add("invisible")
                    main_div.classList.add("h-40")
                    main_div.innerHTML = ``

                } else {
                    // cityName.value = localSCity
                    localStorage.setItem("lastCity", localSCity)
                    callApi(localSCity)
                    mess("Please enter correct city name")
                }

            } else if (response.status == "400") {

                if (!localSCity) {
                    mess("Please enter a city name")
                    main_div.classList.add("invisible")
                    main_div.classList.add("h-40")
                    main_div.innerHTML = ``

                } else {
                    // cityName.value = localSCity
                    localStorage.setItem("lastCity", localSCity)
                    callApi(localSCity)
                    mess("Please enter a city name")
                }

            } else {

                getData = await response.json()
                localStorage.setItem("lastCity", city_Name)
                return getWeatherData(getData)
            }
        })
        .catch((error) => {
            mess("Opps! Something wrong try again later")
            localStorage.removeItem("lastCity")
            main_div.classList.add("invisible")
            main_div.classList.add("h-40")
            main_div.innerHTML = ``
            cityName.value = ""
        })
}




// -------------------------------------------------------------- \\


let getWeatherData = (weatherData) => {

    let sunriseHours = new Date(weatherData.sys.sunrise * 1000).getHours();
    let sunriseMinutes = new Date(weatherData.sys.sunrise * 1000).getMinutes();

    if (sunriseMinutes < 10) {
        sunriseMinutes = "0" + sunriseMinutes;
    }
    let sunriseampm = "AM";

    if (sunriseHours > 12) {
        sunriseHours -= 12;
        sunriseampm = "PM";
    }

    let sunsetHours = new Date(weatherData.sys.sunset * 1000).getHours();
    let sunsetMinutes = new Date(weatherData.sys.sunset * 1000).getMinutes();

    if (sunsetMinutes < 10) {
        sunsetMinutes = "0" + sunsetMinutes;
    }
    let sunseteampm = "AM";

    if (sunsetHours > 12) {
        sunsetHours -= 12;
        sunseteampm = "PM";
    }

    let main_div = document.getElementById("main_div")

    main_div.classList.remove("h-40")

    main_div.innerHTML = `
            <div class="w-full lg:w-1/2 sm:w-1/4  px-3 pr-4 flex flex-row sm:justify-end items-center">
            
            <div class="text-white sm:text-end mb-5 sm:mb-0">
            <p class="text-white text-3xl font-semibold ">${weatherData.name}, ${weatherData.sys.country}</p>
            <div class="text-slate-400 flex items-center sm:justify-end">
                <img class="w-7 mr-2" src="sunrise.png" alt="">
                <span>${sunriseHours}:${sunriseMinutes} ${sunriseampm}</span>
            </div>
            <div class="text-slate-400 flex items-center sm:justify-end">
                <img class="w-7 mr-2" src="sunset-.png" alt="">
                <span>${sunsetHours}:${sunsetMinutes} ${sunseteampm}</span>
            </div>
            </div>
            
            </div>
            
            <div class="w-full lg:w-1/2 sm:w-3/4  flex flex-col sm:flex-row justify-around sm:items-center">
            
            <div class="pr-4  flex flex-row justify-center items-center sm:border-r-2 sm:border-slate-400 w-full sm:w-1/2">
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="">
            <p class="text-white text-5xl font-semibold ">${Math.trunc(weatherData.main.temp)}<sup>o</sup>C</p>
            </div>
            
            <div class="text-white px-4 w-full sm:w-1/2">
            <p class="text-2xl font-semibold">${weatherData.weather[0].main}</p>
            <p class="flex justify-between">Humidity: <span>${weatherData.main.humidity}%</span></p>
            <p class="flex justify-between">Real Feel: <span>${Math.trunc(weatherData.main.feels_like)}<sup>o</sup>C</span></p>
            <p class="flex justify-between">Wind: <span>${Math.trunc(weatherData.wind.speed * 3.6)}Km/h</span></p>
            </div>

            </div>
        `;
    // localStorage.setItem("lastCity", cityName.value)
    cityName.value = ""


}

// -------------------------------------------------------------- \\

let mess = (message) => {
    Toastify({
        text: `${message}`,
        duration: 4000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "rgb(51 65 85)",
        },
        offset: {
            x: 10,
            y: 10
        },
    }).showToast();
}