const request = require('request');
const keys = require('../keys');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${keys.darksky}/${lat},${lng}?units=ca`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                currentlyTime: body.currently.time,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                summary: body.currently.summary,
                dailySummary: body.daily.summary,
                apparentTemperatureMax: body.daily.data[0].apparentTemperatureMax,
                apparentTemperatureMin: body.daily.data[0].apparentTemperatureMin,
                apparentTemperatureMaxTime: body.daily.data[0].apparentTemperatureMaxTime,
                apparentTemperatureMinTime: body.daily.data[0].apparentTemperatureMinTime,
                day1: {
                    time: body.daily.data[1].time,
                    maxTemp: body.daily.data[1].apparentTemperatureMax,
                    minTemp: body.daily.data[1].apparentTemperatureMin
                },
                day2: {
                    time: body.daily.data[2].time,
                    maxTemp: body.daily.data[2].apparentTemperatureMax,
                    minTemp: body.daily.data[2].apparentTemperatureMin
                },
                day3: {
                    time: body.daily.data[3].time,
                    maxTemp: body.daily.data[3].apparentTemperatureMax,
                    minTemp: body.daily.data[3].apparentTemperatureMin
                },
                day4: {
                    time: body.daily.data[4].time,
                    maxTemp: body.daily.data[4].apparentTemperatureMax,
                    minTemp: body.daily.data[4].apparentTemperatureMin
                },
                day5: {
                    time: body.daily.data[5].time,
                    maxTemp: body.daily.data[5].apparentTemperatureMax,
                    minTemp: body.daily.data[5].apparentTemperatureMin
                },
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;
