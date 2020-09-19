let latitude;
let longitude;
let city;       
let weatherText;
let temperature;

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position =>{

        latitude   = position.coords.latitude;
        longitude  = position.coords.longitude;
        const mood = document.querySelector('#mood').value;

        document.querySelector('#latitude').textContent = latitude;
        document.querySelector('#longitude').textContent = longitude;

        const response = await fetch(`/weather/${latitude},${longitude}`);
        const data     = await response.json();
        console.log(data);

        city        = data.city;
        weatherText = data.WeatherText;
        temperature = data.Temperature.Metric.Value;
        
        document.querySelector('#location').textContent = city;
        document.querySelector('#weatherSummary').textContent = weatherText;
        document.querySelector('#temperature').textContent = temperature;

    });
} else {
    console.log('geolocation not available')
}


const postLocation = async () => {
    const mood = document.querySelector('#mood').value;
    const data = {latitude, longitude, mood, city, weatherText, temperature};
    
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body   : JSON.stringify(data)
    };

    // make post request to server - server responds with data
    const response     = await fetch('/api', options)
    const responseJSON = await response.json();
    console.log(responseJSON);
};

const btn = document.querySelector('button');
btn.onclick = postLocation;



    