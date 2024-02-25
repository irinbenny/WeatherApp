const wrapper = document.querySelector(".wrapper"),
wrapper1=document.querySelector(".wrapper1"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
iconsContainer = document.querySelector(".icons"),
dayInfoEl = document.querySelector(".day_info"),
listContentEl = document.querySelector(".list_content ul"),
days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
cities=["London","New York","Tokyo","India"]
const submitBtn = document.querySelector(".input-part button:nth-of-type(1)");
const getLocationBtn = document.querySelector(".input-part button:nth-of-type(2)");
const secondPart = document.getElementById("secondPart");
const inputField = document.querySelector(".input-part input");
const errorContainer = document.querySelector(".error-container");


submitBtn.addEventListener("click",async(e) => {
    e.preventDefault();
    const cityName = inputField.value.trim();
    if (cityName) {
        document.querySelector('.container1').style.display = 'none';
        secondPart.style.display = 'block';
        try {
            const apiKey = 'cee2c6bad2266fe0c6f3345671a981ba';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                updateWeatherUI(data);
            } else {
                console.error('Failed to fetch weather data:', data.message);
                displayErrorPopup('Enter Correct Name');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayErrorPopup('An error occurred while fetching weather data. Please try again later.');
        }
    } else {
        displayErrorMessage('Please enter a city name');
    }
});

getLocationBtn.addEventListener("click", async(e) => {
    e.preventDefault();
    document.querySelector('.container1').style.display = 'none';
    secondPart.style.display = 'block';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( async(position) => {
            const { latitude, longitude } = position.coords;
                await displayWeatherByCoordinates(latitude, longitude);
        }, () => {
            displayErrorMessage('Unable to retrieve your location');
        }
    );
} else {
    displayErrorMessage('Geolocation is not supported by your browser');
}
});


// Get the current hour
const currentHour = new Date().getHours();

// Get the greeting element
const greetingElement = document.querySelector('.hello');

// Update the greeting based on the current hour
if (currentHour >= 5 && currentHour < 12) {
    greetingElement.textContent = 'Good Morning, Irin!';
} else if (currentHour >= 12 && currentHour < 18) {
    greetingElement.textContent = 'Good Afternoon, Irin!';
} else {
    greetingElement.textContent = 'Good Night, Irin!';
}


function displayErrorPopup(message) {
    const errorPopup = document.createElement('div');
    errorPopup.classList.add('error-popup');
    errorPopup.innerHTML = `
        <div class="error-popup-content">
            <span class="close-popup">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(errorPopup);
    const closeButton = errorPopup.querySelector('.close-popup');
    closeButton.addEventListener('click', () => {
        errorPopup.remove();
    });
}


function displayErrorMessage(message) {
    errorContainer.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorContainer.appendChild(errorMessage);
}

async function fetchWeatherForCities() {
    const listContentEl = document.querySelector(".list_content ul");
    try {
        for (const city of cities) {
            const weatherData = await getWeatherData(city);
            if (weatherData) {
                const { icon, temperature } = weatherData;
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <span class="days">${city}</span>
                    <span class="day_temp">${temperature}°C</span>
                `;
                listContentEl.appendChild(listItem);
            } else {
                console.error(`Weather data not available for ${city}`);
            }
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

fetchWeatherForCities();

async function getWeatherData(cityName) {
    try {
        const apiKey = 'cee2c6bad2266fe0c6f3345671a981ba';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            const icon = data.weather[0].icon;
            const temperature = data.main.temp;
            return { icon, temperature };
        } else {
            throw new Error(`Failed to fetch weather data for ${cityName}`);
        }
    } catch (error) {
        throw error;
    }
}

function updateWeatherUI(weatherData) {
}

async function displayWeather(cityName) {
    try {
        const apiKey = 'cee2c6bad2266fe0c6f3345671a981ba';
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const response =await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            updateWeatherUI(data);
        } else {
            console.error('Failed to fetch weather data:', data.message);
            displayErrorMessage('Failed to fetch weather data. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayErrorMessage('An error occurred while fetching weather data. Please try again later.');
    }
    }

    async function displayWeatherByCoordinates(latitude, longitude) {
        try {
            const apiKey = 'cee2c6bad2266fe0c6f3345671a981ba';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                updateWeatherUI(data);
            } else {
                displayErrorMessage('Failed to fetch weather data. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayErrorMessage('An error occurred while fetching weather data. Please try again later.');
        }
    }


    function updateWeatherUI(weatherData) {
    const cityName = weatherData.name;
    const temperature = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const title=weatherData.name;
    const temps=weatherData.main.temp;
    const humid=weatherData.main.humidity;
    const wind=weatherData.wind.speed;

    const cityElement = document.querySelector('.city-name');
    const tempElement = document.querySelector('.temperature');
    const descElement = document.querySelector('.weather-description');
    const titleElement = document.querySelector(".value");
    const tempsElement = document.querySelector(".temp");
    const humidElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".speed");

    if (cityElement && tempElement && descElement && titleElement && tempsElement && humidElement && windElement) {
        cityElement.textContent = cityName;
        tempElement.textContent = temperature + ' °C';
        descElement.textContent = weatherDescription;
        titleElement.textContent= title;
        tempsElement.textContent=temps;
        humidElement.textContent= humid;
        windElement.textContent= wind;
    } else {
        displayErrorMessage('Error: Failed to update weather information.');
    }
    }

    
function displayErrorMessage(message) {
        errorContainer.innerHTML = '';
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorContainer.appendChild(errorMessage);
}


inputField.addEventListener('input', () => {
    infoTxt.textContent = '';
    if (!inputField.value.trim()) {
        infoTxt.textContent = 'Please enter a city name';
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
});


const day = new Date();
const dayName = days[day.getDay()];
const dateEl = document.querySelector(".default_date");
let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();

dateEl.textContent = dayName + " " + date + " " + month + ", " + year;


function updateTime() {
    const time = new Date();
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();

    const formattedHour = hour < 10 ? "0" + hour : hour;
    const formattedMin = min < 10 ? "0" + min : min;
    const formattedSec = sec < 10 ? "0" + sec : sec;

    const clock = document.querySelector('.clock');
    clock.innerHTML = `${formattedHour}:${formattedMin} ${hour >= 12 ? 'PM' : 'AM'}`;

    setTimeout(updateTime, 1000);
}

updateTime();

const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
const container2 = document.getElementById('secondPart'); 

toggle.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    container2.classList.toggle('active');
    container2.style.backgroundImage = container2.classList.contains('active') ? "linear-gradient(rgba(24, 45, 64, 0.819), rgba(24, 36, 47, 0.363)),url('https://i.pinimg.com/564x/3e/9b/73/3e9b73fda1320e73256e6307475b7d3c.jpg')" : "url('https://i.pinimg.com/564x/52/22/91/5222919902af3b5ae34cf400887a6905.jpg')";
};


