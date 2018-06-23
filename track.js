
function locate(settings) {
  console.log('locate()');
  return new Promise((resolve, reject) => {
    try {
      clientPosition = navigator.geolocation.getCurrentPosition((pos) => {
          var crd = pos.coords;

          console.log('Your current position is:');
          console.log('Latitude :' + crd.latitude);
          console.log('Longitude:' + crd.longitude);
          console.log('More or less ' + crd.accuracy + ' meters.');

          resolve(crd);
        },
        e => { reject(e); },
        settings
      );
    }
    catch (e) {
      reject(e);
    }
  });
}


function track(options) {
  console.log('track()');

  function success(pos) {
    console.log('success(pos)');
    var crd = pos.coords;

    map.setCenter(crd.latitute, crd.longitude);

    marker.setPosition({ lat: crd.latitude, lng: crd.longitude });
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }
  
  options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  };

  navigator.geolocation.watchPosition(success, error, options);
}