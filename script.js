function getweather(city) {
    const apikey = "63d43ae22c3f180c800d194681abe3e2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayweather(data);
        })
        .catch(error => {
            console.error("Error fetching weather:", error.message);
        });
}

function displayweather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = `Weather in ${data.name}`;

    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".icon").alt = description;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");
}


function search() {
    const city = document.querySelector(".search-box input").value.trim();
    if (city) {
        getweather(city);
    }
}


document.querySelector(".search-button").addEventListener("click", search);
document.querySelector(".search-box input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        search();
    }
});



window.addEventListener("load", () => {
    getWeather("New York");
});

