//$(document).ready(function() {
//  
//});

jQuery(document).ready(function ($) {
  getLocation();
});

// Get user location
var locationName = document.getElementById("location-name");
var temp_f = 0;
var temp_c = 0;

function getLocation() {
  // Call showPosition function and pass it position
  // On error, call showError function
  navigator.geolocation.getCurrentPosition(showPosition, showError);
}

// Get lat and long coords from browser and then call weather API
function showPosition(position) {
  var latCoord= position.coords.latitude;
  //console.log(latCoord);
  var longCoord = position.coords.longitude;
  //console.log(longCoord);

  // API call to Weather Underground
  $.ajax({
    url: "http://api.wunderground.com/api/079983eb38969753 /geolookup/conditions/q/" + latCoord + "," + longCoord + ".json",
    dataType: "jsonp",
    success: function (parsed_json) {
      var location = parsed_json['location']['city'];
      //console.log(location);
      temp_f = parsed_json['current_observation']['temp_f'];
      temp_c = parsed_json['current_observation']['temp_c'];
      //console.log(temp_f);
      var weather = parsed_json['current_observation']['weather'];
      var icon = parsed_json['current_observation']['icon'];
      
      $('#location-name').text(location);
      // Need to place conditional here for temp_c
      // $('#location-temp').text(temp_c);
      $('#location-temp').html(temp_f+' &deg; F');
      $('i').remove();
      $('#location-icon').prepend("<img id='weather-icon' src='http://icons.wxug.com/i/c/i/partlycloudy.gif' />")
      $('#location-weather').text(weather);
      $('#toggle-switch').css('display','inline-block');
    }
  });
}

// If getCurrentPosition method in getLocation() function throws error,
// handle it
function showError(error) {
  switch (error.code) {
  case error.PERMISSION_DENIED:
    locationName.innerHTML = "User denied the request for Geolocation."
    break;
  case error.POSITION_UNAVAILABLE:
    locationName.innerHTML = "Location information is unavailable."
    break;
  case error.TIMEOUT:
    locationName.innerHTML = "The request to get user location timed out."
    break;
  case error.UNKNOWN_ERROR:
    locationName.innerHTML = "An unknown error occurred."
    break;
  }
}

$("#cmn-toggle-4").click(function() {
  console.log('clicked');
  if (this.checked){
    $('#location-temp').html(temp_c+' &deg; C');
  }
  else {
    $('#location-temp').html(temp_f+' &deg; F');
  }
});