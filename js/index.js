/*jshint browser: true, jquery: true*/
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
  var latCoord = position.coords.latitude;
  var longCoord = position.coords.longitude;


  // API call to Weather Underground
  $.ajax({
    url: "http://api.wunderground.com/api/079983eb38969753 /geolookup/conditions/q/" + latCoord + "," + longCoord + ".json",
    dataType: "jsonp",
    success: function (parsed_json) {
      var location = parsed_json.location.city;
      //console.log(location);
      temp_f = parsed_json.current_observation.temp_f;
      temp_c = parsed_json.current_observation.temp_c;

      var weather = parsed_json.current_observation.weather;
      var icon = parsed_json.current_observation.icon;

      $('#location-name').text(location);
      $('#location-temp').html(temp_f + ' &deg;F');
      $('i').remove();
      $('#location-icon').prepend("<img id='weather-icon' src='http://icons.wxug.com/i/c/i/" + icon + ".gif' />");
      $('#location-weather').text(weather);
      $('.toggle-text-left').css('display', 'flex');
      $('.toggle-text-right').css('display', 'flex');
      $('.toggle-switch').css('display', 'flex');

      // Different icon name possibilities
      var snowArray = ["chanceflurries", "chancesnow", "chancesleet", "flurries", "sleet", "snow"];
      var rainArray = ["rain", "chancerain", "tstorms", "chancestorms"];
      var sunnyArray = ["clear", "hazy", "mostlysunny", "sunny", "partlycloudy"];
      var cloudyArray = ["cloudy", "fog", "mostlycloudy"];

      // Find which array the icon belongs to and display that background image
      if ($.inArray(icon, snowArray) > -1) {
        $('body').css('background-image', 'url("http://cache.desktopnexus.com/thumbseg/205/205327-bigthumbnail.jpg")');
      } 
      else if ($.inArray(icon, rainArray) > -1) {
        $('body').css('background-image', 'url("http://cache.desktopnexus.com/thumbseg/92/92240-bigthumbnail.jpg")');
      } 
      else if ($.inArray(icon, sunnyArray) > -1) {
        $('body').css('background-image', 'url("http://images.fineartamerica.com/images-medium-large/sunny-spring-landscape-michal-bednarek.jpg")');
      } 
      else if ($.inArray(icon, cloudyArray) > -1) {
        $('body').css('background-image', 'url("https://c1.staticflickr.com/7/6023/5975465375_9c089b6085_b.jpg")');
      }      

      // Change from fahrenheit to celsius and vice versa
      $("#toggle").click(function () {
        if (this.checked) {
          $('#location-temp').html(temp_c + ' &deg;C');
        } else {
          $('#location-temp').html(temp_f + ' &deg;F');
        }
      });
    }
  });
}

// If getCurrentPosition method in getLocation() function throws error, handle it
function showError(error) {
  switch (error.code) {
  case error.PERMISSION_DENIED:
    locationName.innerHTML = "User denied the request for Geolocation.";
    break;
  case error.POSITION_UNAVAILABLE:
    locationName.innerHTML = "Location information is unavailable.";
    break;
  case error.TIMEOUT:
    locationName.innerHTML = "The request to get user location timed out.";
    break;
  case error.UNKNOWN_ERROR:
    locationName.innerHTML = "An unknown error occurred.";
    break;
  }
}