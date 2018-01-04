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
                summary: body.currently.summary,
                dailySummary: body.daily.summary,
                apparentTemperatureHigh: body.daily.data[0].apparentTemperatureHigh,
                apparentTemperatureHighTime: body.daily.data[0].apparentTemperatureHighTime,
                apparentTemperatureLow: body.daily.data[0].apparentTemperatureLow,
                apparentTemperatureLowTime: body.daily.data[0].apparentTemperatureLowTime
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;
