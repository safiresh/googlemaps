[![Build Status](https://travis-ci.org/moshen/node-googlemaps.svg)](https://travis-ci.org/moshen/node-googlemaps)

# Google Maps API for Node.js with Multi Server Key

This library implements the following Google Maps APIs with mul, and can be also used by Google Maps for Work users.

* [Maps API Web Services](https://developers.google.com/maps/documentation/webservices/)
* [Google Places API](https://developers.google.com/places/)
* [Google Maps Image API](https://developers.google.com/maps/documentation/imageapis/)

This library is **NOT COMPATIBLE** with tags < `1.0.0`

If you want to migrate from a version older than `1.0.0` check the [WIKI](https://github.com/moshen/node-googlemaps/wiki/Migrate-from-v0.1.20-to-v1.0.x) for instructions.

### Installation

```
npm install hm-googlemaps


```

### What does it cover
[Maps API Web Services](https://developers.google.com/maps/documentation/webservices/):

* [Directions](https://developers.google.com/maps/documentation/directions/)
* [Distance matrix](https://developers.google.com/maps/documentation/distancematrix/)
* [Elevation](https://developers.google.com/maps/documentation/elevation/) - TO BE IMPROVED
* [Geocoding and reverse geocoding](https://developers.google.com/maps/documentation/geocoding)
* [Time zone](https://developers.google.com/maps/documentation/timezone) - NOT IMPLEMENTED YET

[Google Places API](https://developers.google.com/places/) - NOT COMPLETED

* [Place search](https://developers.google.com/places/documentation/search)
* [Place details](https://developers.google.com/places/documentation/details)

[Google Maps Image API](https://developers.google.com/maps/documentation/imageapis/)

* [Static maps](https://developers.google.com/maps/documentation/staticmaps/)
* [Street view](https://developers.google.com/maps/documentation/streetview/) - TO BE IMPROVED


### Usage

```javascript
var publicConfig = {
  keys:[{key:"google-server-key",limit:10000},{key:"google-server-key2",limit:2500}]
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);

// or in case you are using Google Maps for Work
var enterpriseConfig = {
  google_client_id:   '<YOUR-CLIENT-ID>', // to use Google Maps for Work
  google_private_key: '<YOUR-PRIVATE-KEY>', // to use Google Maps for Work
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(enterpriseConfig);

// geocode API
var geocodeParams = {
  "address":    "121, Curtain Road, EC2A 3AD, London UK",
  "components": "components=country:GB",
  "bounds":     "55,-1|54,1",
  "language":   "en",
  "region":     "uk"
};

gmAPI.geocode(geocodeParams, function(err, result){
  console.log(result);
});

// reverse geocode API
var reverseGeocodeParams = {
  "latlng":        "51.1245,-0.0523",
  "result_type":   "postal_code",
  "language":      "en",
  "location_type": "APPROXIMATE"
};

gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
  console.log(result);
});
``` 

Check out the [unit tests](./tree/new-major-version/test/unit/) for more APIs examples.

### Static Maps

```javascript
var gmAPI = new GoogleMapsAPI();
var params = {
  center: '444 W Main St Lock Haven PA',
  zoom: 15,
  size: '500x400',
  maptype: 'roadmap',
  markers: [
    {
      location: '300 W Main St Lock Haven, PA',
      label   : 'A',
      color   : 'green',
      shadow  : true
    },
    {
      location: '444 W Main St Lock Haven, PA',
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600'
    }
  ],
  style: [
    {
      feature: 'road',
      element: 'all',
      rules: {
        hue: '0x00ff00'
      }
    }
  ],
  path: [
    {
      color: '0x0000ff',
      weight: '5',
      points: [
        '41.139817,-77.454439',
        '41.138621,-77.451596'
      ]
    }
  ]
};
gmAPI.staticMap(params); // return static map URL
gmAPI.staticMap(params, function(err, binaryImage) {
  // fetch asynchronously the binary image
});
```
This example prints the URL for the Static Map image: "https://maps.googleapis.com/maps/api/staticmap?center=444%20W%20Main%20St%20Lock%20Haven%20PA&zoom=15&size=500x400&maptype=roadmap&markers=color%3Agreen%7Clabel%3AA%7Cshadow%3Atrue%7C300%20W%20Main%20St%20Lock%20Haven%2C%20PA&markers=icon%3Ahttp%3A%2F%2Fchart.apis.google.com%2Fchart%3Fchst%3Dd_map_pin_icon%26chld%3Dcafe%257C996600%7C444%20W%20Main%20St%20Lock%20Haven%2C%20PA&path=weight%3A5%7Ccolor%3A0x0000ff%7Cenc%3A%7BbbzFfyvwMnFwP&style=feature%3Aroad%7Celement%3Aall%7Chue%3A0x00ff00"

By giving gm.staticMap an optional callback, you can retreive the static map PNG data:


You will get a map like:

![Some Map](https://maps.googleapis.com/maps/api/staticmap?center=444%20W%20Main%20St%20Lock%20Haven%20PA&zoom=15&size=500x400&maptype=roadmap&markers=color%3Agreen%7Clabel%3AA%7Cshadow%3Atrue%7C300%20W%20Main%20St%20Lock%20Haven%2C%20PA&markers=icon%3Ahttp%3A%2F%2Fchart.apis.google.com%2Fchart%3Fchst%3Dd_map_pin_icon%26chld%3Dcafe%257C996600%7C444%20W%20Main%20St%20Lock%20Haven%2C%20PA&path=weight%3A5%7Ccolor%3A0x0000ff%7Cenc%3A%7BbbzFfyvwMnFwP&style=feature%3Aroad%7Celement%3Aall%7Chue%3A0x00ff00)

### Street view

```javascript
var gmAPI = new GoogleMapsAPI();
var params = {
  location: '51.507868,-0.087689',
  size: '1200x1600',
  heading: 108.4,
  pitch: 7,
  fov: 40
};
var result = gmAPI.streetView(params);
```

![London - Tower Bridge from London Bridge](https://maps.googleapis.com/maps/api/streetview?location=51.507868,-0.087689&size=1200x1600&heading=108.4&fov=40&pitch=7)

### Further examples

Please refer to the code, [tests](http://github.com/safiresh/googlemaps) and the [Google Maps API docs](http://code.google.com/apis/maps/documentation/webservices/index.html) for further usage information.


### Contributions
Criticism/Suggestions/Patches/PullRequests are welcome.


### Original contributors list

[![safiresh](https://avatars2.githubusercontent.com/u/2355624?v=3&s=460)](https://github.com/safiresh)


### v1.0.0 maintener 
[![safiresh](https://avatars2.githubusercontent.com/u/2355624?v=3&s=460)](https://github.com/safiresh)

Contributions and new issues are welcome!
