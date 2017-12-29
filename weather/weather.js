const request = require('request');
const keys = require('../keys');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${keys.darksky}/${lat},${lng}?units=ca`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                summary: body.currently.summary
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;
