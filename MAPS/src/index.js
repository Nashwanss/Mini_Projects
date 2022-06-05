import mapboxgl from 'mapbox-gl' // Don't forget the "quots"
import 'mapbox-gl/dist/mapbox-gl.css'
import getAddress from './getAddress' // Don't forget the level ./ also


mapboxgl.accessToken = 'pk.eyJ1IjoibmFzaHdhbnNzIiwiYSI6ImNrenF3ODR0bjB6cjEyd3BldmVlZGdibDkifQ.kUewIe8fnPHo3tjm3SfP1Q';





const showEuroMap = () => {   
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/nashwanss/ckzs8ev97002w14lmbkpbbxyn', // style URL
    center: [15.35, 50.50], // starting position [lng, lat]
    zoom: 3 // starting zoom
});
}
showEuroMap();

const button = document.querySelector('button');

button.addEventListener('click' , (event) => {
const mapDiv = document.querySelector('#map');
mapDiv.innerHTML = ""

let input = document.querySelector('input');
let placeName = input.value
    console.log(`Welcome to ${placeName}`);
    getAddress(placeName);
})



