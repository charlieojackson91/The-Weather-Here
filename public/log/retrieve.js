const myMap = L.map('mapid').setView([0, 0], 2);
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL);

tiles.addTo(myMap);


const getData = async () => {
    const data = await fetch('/api');
    const res  = await data.json();
    
    console.log(res);
    res.forEach(item => {

        // add marker to map
        const marker = L.marker([item.latitude, item.longitude]).addTo(myMap);

        // text for the marker
        const text = `The weather in ${item.city} on ${new Date(item.timestamp).toDateString()} is ${item.weatherText}. The tempurature is ${item.temperature}&deg. In ${item.city}, Charlie thinks they eat ${item.mood}.`

        // bind text to marker
        marker.bindPopup(text);
    })
} 

getData();