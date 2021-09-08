function initMap() {
    const map = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 14,
            center: { lat: 40.392499, lng: -3.698214 }
        }
    )
    getPlace(map) 
}

function getPlace(map) {
    axios
        .get('/api/places')
        .then(response => printPlace(response.data, map))
        .catch(err => console.log(err))
}


function printPlace(place, map) {
    place.forEach(elm => {
        let position = {
            lat: elm.location.coordinates[0],
            lng: elm.location.coordinates[1]
        }
        new google.maps.Marker({ map, position, title: elm.name })
    })
}