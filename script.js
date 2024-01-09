const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const apikey = 'e6b7dc7ab79ae021264e7c59910c356b';
    const city = document.querySelector('.search-box input').value;

    if(city ===''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e6b7dc7ab79ae021264e7c59910c356b`)
    .then(response => response.json())
    .then(json =>{
        if(json.cod ==='404'){
            container.style.height ='500px';
            weatherBox.style.display ='none';
            weatherDetails.style,display ='none';
            error.style.display = 'block';
            error.classList.add('fadeIn')
            return;
        }
        error.style.display = 'none';
        error.classList.remove('fadeIn')

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src='clear.jpg';
                break;

            case 'Clouds':
                image.src='cloudy.png';
                break;

            case 'Rain':
                image.src='riny.jpg';
                break;

            case 'Snow':
                image.src='snow.png';
                break;
            case 'Mist':
                image.src='misty.jpg';
                break;
            default:
                image.src='';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML =`${json.weather[0].description}`;
        humidity.innerHTML =`${json.main.humidity}%`;
        wind.innerHTML =`${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display ='';
        weatherDetails.style.display ='';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');

        container.style.height='590px';
    });
});