/**
 * Created by safi on 18/11/15.
 */
var GMAPI = require('../');


var config = {
    keys: [{key: "1",limit:1}, {key: "2",limit:1}, {key: "3",limit:100}]

};
var gmAPI = new GMAPI(config);
var params = {
    location: '51.507868,-0.087689',
    size: '1200x1600',
    heading: 108.4,
    pitch: 7,
    fov: 40
};

var result = gmAPI.streetView(params);
console.log(result);

var result = gmAPI.streetView(params);
console.log(result);

var result = gmAPI.streetView(params);
console.log(result);

var result = gmAPI.streetView(params);
console.log(result);

var result = gmAPI.streetView(params);
console.log(result);

var result = gmAPI.streetView(params);
console.log(result);

var result = gmAPI.streetView(params);
console.log(result);