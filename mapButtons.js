
/////
// This example creates a custom overlay called newOverlay, containing
// a U.S. Geological Survey (USGS) image of the relevant area on the map.

// Set the custom overlay object's prototype to a new instance
// of OverlayView. In effect, this will subclass the overlay class therefore
// it's simpler to load the API synchronously, using
// google.maps.event.addDomListener().
// Note that we set the prototype to an instance, rather than the
// parent class itself, because we do not wish to modify the parent class.

// Initialize the map and the custom overlay.

function addButtons() {
  console.log('addButtons()');

  var overlay;
  newOverlay.prototype = new google.maps.OverlayView();

  newOverlay.prototype.show = function() {
    if (this.div_) {
      this.div_.style.visibility = 'visible';
    }
  };

  newOverlay.prototype.toggle = function() {
    if (this.div_) {
      if (this.div_.style.visibility === 'hidden') {
        this.show();
      }
      else {
        //this.hide();
      }
    }
  };

  /** @constructor */
  function newOverlay(bounds, image, map) {
    console.log('newOverlay()');
    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }


  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  newOverlay.prototype.onAdd = function() {
    console.log('onAdd');
    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayMouseTarget" pane.
    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(div);
  };

  newOverlay.prototype.draw = function() {
    // console.log('draw');
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  };

  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(32.27991, 253.2),
    new google.maps.LatLng(32.780, 253.71));

  // The photograph is courtesy of the U.S. Geological Survey.
  var srcImage = 'https://movingnm.com/geolocator/mapBtn.svg';

  // The custom newOverlay object contains the USGS image,
  // the bounds of the image, and a reference to the map.
  overlay = new newOverlay(bounds, srcImage, map);

  setTimeout(() => {
    overlay.toggle();
  }, 2000);
}