const COORDINATES = {}

function getGeoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((coord) => {
            COORDINATES.latitude = coord.coords.latitude;
            COORDINATES.longitude = coord.coords.longitude;
        });
    }else{
        alert("Geolocation is not supported by this browser.");
    }
}

async function getLocationDetails(latitude, longitude) {
    const apiUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;

}

  
async function showLocation(){
    const currentLocation = await getLocationDetails(COORDINATES.latitude, COORDINATES.longitude);
    const address = currentLocation.address;

    document.getElementById('location').innerText = `Meu amor está no endereço: ${address.road}, ${address.town}-${address.state}, ${address.country}`; 
    if(document.getElementById('location').innerText !== 'undefined'){
        showVideo();
    }
}

function showVideo(){
    document.getElementById('video-container').style.display = 'block';
    document.getElementById('video').setAttribute('autoplay', 'true');
    // video.style.display = 'block';
}

window.onload = getGeoLocation;