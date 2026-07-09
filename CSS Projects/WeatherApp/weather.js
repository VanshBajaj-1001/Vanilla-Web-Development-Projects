function getWeatherURL(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");

function searchWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        errorMessage.textContent = "Please Enter a City Name.";
        return;
    }
    getWeather(city)
}
async function getWeather(city) {
    errorMessage.textContent = "";
    try {
        temperature.textContent = "Loading...";
        const response = await fetch(getWeatherURL(city));
        if (!response.ok) {
            throw new Error("City Not Found");
        }
        const data = await response.json();  //converts the response from api whichis in json to java script object
        const weatherMain = data.weather[0].main;
        if (weatherMain === "clear") {
            document.body.style.background =
                "linear-gradient(135deg,#f6d365,#fda085)";
        }
        else if (weatherMain === "Clouds") {
            document.body.style.background =
                "linear-gradient(135deg,#bdc3c7,#2c3e50)";
        }
        else if (weatherMain === "Rain") {
            document.body.style.background =
                "linear-gradient(135deg,#4facfe,#00f2fe)";
        }
        else {
            document.body.style.background =
                "linear-gradient(135deg,#667eea,#764ba2)";
        }
        cityName.textContent = data.name;
        temperature.textContent = Math.round(data.main.temp) + "°C";
        condition.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        wind.textContent = Math.round(data.wind.speed * 3.6);
        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        cityInput.value = "";
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
searchBtn.addEventListener("click", searchWeather)


cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});
