/**
 * Created by safi on 18/11/15.
 */
var moment = require('moment');
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
        this.keysBks = JSON.parse(JSON.stringify(this.keys));

    }

    this.indexKey = 0;
    this.loadDate = new Date();
    GMAPI.apply(this, arguments);

}

GoogleMapsAPI.prototype = GMAPI.prototype;
GoogleMapsAPI.prototype.resetLimitCount = function () {
    if (moment().diff(this.loadDate, 'hour') > 24) {
        this.loadDate = new Date();
        this.keys = JSON.parse(JSON.stringify(this.keysBks));
    }
};
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
        this.resetLimitCount();
        return key;
    }
};

var validaeResult = function (err, result, cb) {
    if (!err && result.status != "OK")
        return cb(result);
    return cb(err, result);
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
    if (cb) {
        return this._placeSearch(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._placeSearch(params);
};

GMAPI.prototype.placeDetails = function (params, cb) {
    this.config.key = this.getRandomKey();
    if (cb) {
        return this._placeDetails(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._placeDetails(params);
};
GMAPI.prototype.geocode = function (params, cb) {
    this.config.key = this.getRandomKey();
    if (cb) {
        return this._geocode(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._geocode(params);
};
GMAPI.prototype.distance = function (params, cb) {
    this.config.key = this.getRandomKey();
    if (cb) {
        return this._distance(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._distance(params);
};
GMAPI.prototype.directions = function (params, cb) {

    this.config.key = this.getRandomKey();
    if (cb) {
        return this._directions(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._directions(params);

};
GMAPI.prototype.elevationFromLocations = function (params, cb) {
    this.config.key = this.getRandomKey();
    if (cb) {
        return this._elevationFromLocations(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._elevationFromLocations(params);
};
GMAPI.prototype.staticMap = function (params, cb) {
    this.config.key = this.getRandomKey();
    if (cb) {
        return this._staticMap(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._staticMap(params);
};

GMAPI.prototype.streetView = function (params, cb) {
    this.config.key = this.getRandomKey();
    if (cb) {
        return this._streetView(params, function (err, result) {
            validaeResult(err, result, cb);
        });
    } else
        return this._streetView(params);
};


module.exports = GoogleMapsAPI;