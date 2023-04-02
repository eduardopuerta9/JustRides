const myLatLng = { lat: 38.346, lng: -0.4907 }
var mapOptions = {
  center: myLatLng,
  zoom: 7,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions)
var directionsService = new google.maps.DirectionsService()

var directionsDisplay = new google.maps.DirectionsRenderer()

directionsDisplay.setMap(map)

function calcRoute() {
  var request = {
    origin: document.getElementById('startLocation').value,
    destination: document.getElementById('endLocation').value,
    travelMode: google.maps.TravelMode.BYCYCLING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  }
  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionStatus.OK) {
      const output = document.querySelector('#output')
      output.innerHTML =
        "<div className='alert-info'> From: " +
        document.getElementById('startLocation').value +
        '.<br />To: ' +
        document.getElementById('endLocation').value +
        '. <br /> Driving distance:' +
        result.routes[0].legs[0].distance.text +
        '.<br />Duration: ' +
        result.routes[0].legs[0].duration.text +
        '. </div>'

      directionsDisplay.setDirections(result)
    } else {
      directionsDisplay.setDirections({ routes: [] })

      map.setCenter(myLatLng)
      output.innerHTML =
        "<div className='alert-danger'>Could Not Retrieve Biking Distance. </div>"
    }
  })
}

var options = {
  types: ['(cities)']
}

var input1 = document.getElementById('startLocation')
var autocomplete1 = new google.maps.places.Autocomplete(input1, options)

var input2 = document.getElementById('endLocation')
var autocomplete2 = new google.maps.places.Autocomplete(input2, options)
