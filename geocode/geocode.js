const request = require('request');
const keys = require('../keys');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?${keys.googleGeocode}&address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            calback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                cityName: body.results[0].address_components[2].long_name,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
