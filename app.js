const Api_Key = `28fc3004f7a3d2bcd089c4786c428d36`
localStorage.removeItem("lastCity")
let cityName;

function getCity() {

    event.preventDefault()
    cityName = document.getElementById("inputCity")

    callApi(cityName.value)

}


let callApi = async(city_Name) => {
    let getData;
    try {
        main_div.classList.add("h-40")
        main_div.classList.remove("invisible")
        main_div.innerHTML = `<span class="loader"></span>`

        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_Name}&appid=${Api_Key}&units=metric`)

        getData = await api.json()

        return getWeatherData(getData)
    } catch (error) {

        let localSCity = localStorage.getItem("lastCity")

        if (getData.cod == "404") {

            if (!localSCity) {
                mess("Please enter correct city name")
                main_div.classList.add("invisible")
                main_div.classList.add("h-40")
                main_div.innerHTML = ``

            } else {
                cityName.value = localSCity
                callApi(localSCity)
                mess("Please enter correct city name")
            }

        } else if (getData.cod == "400") {
            
            if(!localSCity){
                mess("Please enter a city name")
                main_div.classList.add("invisible")
                main_div.classList.add("h-40")
                main_div.innerHTML = ``
            } 

            else{
                cityName.value = localSCity
                callApi(localSCity)
                mess("Please enter a city name")
            }

        } else {
            mess("Opps! Something wrong try again later")
            main_div.classList.add("invisible")
            main_div.classList.add("h-40")
            main_div.innerHTML = ``
            console.log(error)

        }

    }

    // TypeError: Failed to fetch


}


let getWeatherData = (weatherData) => {




    let main_div = document.getElementById("main_div")

    main_div.classList.remove("h-40")

    main_div.innerHTML = `
            <div class="w-full lg:w-1/2 sm:w-1/4  px-3 pr-4 flex flex-row sm:justify-end items-center">
            
            <div class="text-white sm:text-end mb-5 sm:mb-0">
            <p class="text-white text-3xl font-semibold ">${weatherData.name}, ${weatherData.sys.country}</p>
            <span class="text-slate-400 my-2">Wednesday 8, 2023</span><br>
            <span class="text-slate-400  my-2">6:13 PM</span>
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
    localStorage.setItem("lastCity", cityName.value)
    cityName.value = ""


}

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

// Toastify({
//     text: "This is a toast",
//     duration: 4000,
//     // destination: "https://github.com/apvarun/toastify-js",
//     // newWindow: true,
//     close: true,
//     gravity: "bottom", // `top` or `bottom`
//     position: "right", // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover
//     style: {
//       background: "rgb(51 65 85)",
//     //   background: "0 3px 6px -1px rgba(0,0,0,.12), 0 10px 36px -4px rgba(77,96,232,.3)"
//     },
//     offset: {
//         x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
//         y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
//       },
//     // onClick: function(){} // Callback after click
//   }).showToast();