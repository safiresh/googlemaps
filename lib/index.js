/**
 * Created by safi on 18/11/15.
 */
var GMAPI = require('googlemaps');

function GoogleMapsAPI() {
    'use strict';
    if (arguments['0'] && arguments['0'].keys) {
        arguments['0'].key = arguments['0'].keys[0];
        this.keys = [];
        for (var i = 0; i < arguments['0'].keys.length; i++) {

            var obj = {
                id: "",
                err: false,
                limit: 2500
            };
            if (!arguments['0'].keys[i].key) {
                obj.id = arguments['0'].keys[i];
            } else {
                if (arguments['0'].keys[i].id)
                    obj.id = arguments['0'].keys[i].id ? arguments['0'].keys[i].id : "";
                if (arguments['0'].keys[i].key)
                    obj.id = arguments['0'].keys[i].key ? arguments['0'].keys[i].key : "";
                if (arguments['0'].keys[i].limit)
                    obj.limit = arguments['0'].keys[i].limit
            }
            this.keys.push(obj);
        }

    }

    this.indexKey = 0;
    this.loadDate = new Date();
    GMAPI.apply(this, arguments);

}

GoogleMapsAPI.prototype = GMAPI.prototype;

GoogleMapsAPI.prototype.getRandomKey = function () {
    if (!this.keys)
        return this.config.key;
    else {
        // we need get from keys based on multiple keys
        var key = this.keys[0], loop2 = 0;
        var isDone = false;
        while (!isDone) {
            var keyObj = this.keys[this.indexKey];
            if (!keyObj.err && keyObj.limit > 0) {
                key = this.keys[this.indexKey].id;
                this.keys[this.indexKey].limit--;
                isDone = true;
            }
            this.indexKey++;
            if (this.indexKey >= this.keys.length) {
                this.indexKey = 0;
            }
            if (loop2 > 2) {
                isDone = true;
                key = this.keys[0].id;
            }
        }
        return key;
    }
};


GoogleMapsAPI.prototype._placeSearch = GMAPI.prototype.placeSearch;
GoogleMapsAPI.prototype._placeDetails = GMAPI.prototype.placeDetails;
GoogleMapsAPI.prototype._geocode = GMAPI.prototype.geocode;
GoogleMapsAPI.prototype._distance = GMAPI.prototype.distance;
GoogleMapsAPI.prototype._directions = GMAPI.prototype.directions;
GoogleMapsAPI.prototype._elevationFromLocations = GMAPI.prototype.elevationFromLocations;
GoogleMapsAPI.prototype._staticMap = GMAPI.prototype.staticMap;
GoogleMapsAPI.prototype._streetView = GMAPI.prototype.streetView;

GMAPI.prototype.placeSearch = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._placeSearch(params, cb);
};

GMAPI.prototype.placeDetails = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._placeDetails(params, cb);
};
GMAPI.prototype.geocode = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._geocode(params, cb);
};
GMAPI.prototype.distance = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._distance(params, cb);
};
GMAPI.prototype.directions = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._directions(params, cb);
};
GMAPI.prototype.elevationFromLocations = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._elevationFromLocations(params, cb);
};
GMAPI.prototype.staticMap = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._staticMap(params, cb);
};

GMAPI.prototype.streetView = function (params, cb) {
    this.config.key = this.getRandomKey();
    this.index++;
    return this._streetView(params, cb);
};


module.exports = GoogleMapsAPI;