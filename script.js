//API KEY
let api;
const apiKey = "507445716c184c5438563e1f2c464b44";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Table Item Placing
let tableItem = ['Kolkata', 'Pune', 'Delhi', 'London', 'Bangalore'];
let table = document.querySelector('#tableItem');
let tableOut = '';
let tableCity;

tableItem.map((item) => {
    apiCallTable(item);
})

async function apiCallTable(city) {
    try {
        api = await fetch(apiUrl + city + `&appid=${apiKey}`);
        return api;
    } catch (error) {
        console.error(error);
    }
    finally {
        if (api) {
            api = await api.json();
            let sunRiseTime = api.sys.sunrise;
            let sunSetTime = api.sys.sunset;
            let sunRiseValue = convertTimestamp(sunRiseTime);
            let sunSetValue = convertTimestamp(sunSetTime);
            tableOut += `
                <tr>
                    <td>${api.name}</td>
                    <td>${api.weather[0].description}</td>
                    <td>${api.main.temp_max}°C</td>
                    <td>${api.main.temp_min}°C</td>
                    <td>${sunRiseValue}</td>
                    <td>${sunSetValue}</td>
                    <td>${api.main.humidity}%</td>
                </tr>
            `
            table.innerHTML = tableOut;
        }
    }
}

//Cloud Image
let cloudImage = document.querySelector('#cloudImg');
let Icon;
// //Temperature Board
//Access Elements
let card1 = document.querySelector(".card1");
let card2 = document.querySelector(".card2");
let card3 = document.querySelector(".card3");

let curTemp = document.querySelector('#curTemp');
let maxTemp = document.querySelector('#maxTemp');
let minTemp = document.querySelector('#minTemp');

let humidity = document.querySelector('#humidity');
let sunRise = document.querySelector('#sunRise');
let sunSet = document.querySelector('#sunSet');

let windDeg = document.querySelector('#windDeg');
let fells = document.querySelector('#fells');
let windSpeed = document.querySelector('#windSpeed');

//City Input
let citySearch = document.querySelector('#cityBtn');
let cityHead = document.querySelector('#cityHead');
citySearch.addEventListener("click", () => {
    let city = (document.querySelector('#inputCity').value);
    apiCall(city);
    cityHead.innerText = `Weather of ${city}`;
})

//Fetch Weather API Search Bar
async function apiCall(city) {
    try {
        api = await fetch(apiUrl + city + `&appid=${apiKey}`);
        return api;
    } catch (error) {
        console.error(error);
    }
    finally {
        if (api) {
            api = await api.json();
            console.log(api);

            //Cloud Image
            {
                Icon = api.weather[0].main;
                if (Icon == "Clouds") {
                    cloudImage.src = "images/clouds.png";
                } else if (Icon == "Clear") {
                    cloudImage.src = "images/clear.png";
                } else if (Icon == "Rain") {
                    cloudImage.src = "images/rain.png";
                } else if (Icon == "Drizzle") {
                    cloudImage.src = "images/drizzle.png";
                } else if (Icon == "Mist" || Icon == "Haze") {
                    cloudImage.src = "images/mist.png";
                }
            }

            //Temperature Block
            {
                curTemp.innerText = `${api.main.temp}°C`;
                maxTemp.innerText = `${api.main.temp_max}°C`;
                minTemp.innerText = `${api.main.temp_min}°C`;

            }

            //HUMIDITY Block
            {
                let sunRiseTime = api.sys.sunrise;
                let sunSetTime = api.sys.sunset;
                let sunRiseValue = convertTimestamp(sunRiseTime);
                let sunSetValue = convertTimestamp(sunSetTime);

                humidity.innerText = `${api.main.humidity}%`;
                sunRise.innerText = `${sunRiseValue}`;
                sunSet.innerText = `${sunSetValue}`;
            }

            //WIND SPEED Block
            {
                windDeg.innerText = `${api.wind.deg}`;
                fells.innerText = `${api.main.feels_like}°C`;
                windSpeed.innerText = `${api.wind.speed}km/hr`;
            }

        }
    }
}
apiCall('Kolkata');

//Convert Sunrise & Sunset Time
function convertTimestamp(timestamp) {
    // Convert timestamp from seconds to milliseconds
    const date = new Date(timestamp * 1000);
    
    // Add the specified number of hours
    date.setUTCHours(date.getUTCHours() + 6);
    
    // Extract updated hours and minutes
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    // Return time in HH:MM format
    return `${hours}:${minutes}`;
}



