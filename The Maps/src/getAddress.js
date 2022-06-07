// 
import mapboxgl from 'mapbox-gl' // Don't forget the "quots"


const showAddress = (coordinates) => {   
    const map = new mapboxgl.Map({
        container: 'map', // container ID
    style: 'mapbox://styles/nashwanss/ckzs8ev97002w14lmbkpbbxyn', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});
}


const getAddress = async (placeName) => {
    
    const response = await fetch (`https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=pk.eyJ1IjoibmFzaHdhbnNzIiwiYSI6ImNrenF3ODR0bjB6cjEyd3BldmVlZGdibDkifQ.kUewIe8fnPHo3tjm3SfP1Q`)
    const  data = await response.json();
    console.log(data);
    showAddress(data.features[0].center);
    // addressDetails(data.features[0].place_name)
    let addressBox  = document.querySelector('#address-box');
    addressBox.innerHTML =  (`Welcome to : ${data.features[0].place_name}`)
}















export default getAddress