const yargs = require('yargs');
var moment = require('moment');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            alias: 'address',
            description: 'Address to fetch the weather for',
            default: 'New York NY',
            string: true  // Reinforce we get data in the string format
        },
        w: {
            alias: 'week',
            type: 'boolean',
            description: 'Display the forecast for the next 5 days'
        }
    })
    .help()
        .alias('help', 'h')
        .argv;

if (!argv.address) {
    argv.address = defaultLocation;
}

var convertToHours = (unixTime) => {
    if (moment.unix(unixTime).isValid()) {
        return moment.unix(unixTime).format('HH:mm');
    }
}

var convertToWeekday = (unixTime) => {
    if (moment.unix(unixTime).isValid()) {
        return ("         " + moment.unix(unixTime).format('dddd')).slice(-9);
    }
}

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(results.address);
                console.log(moment.unix(`${weatherResults.currentlyTime}`).format('dddd, MMMM Do, YYYY'));
                console.log(`\nIt is currently ${weatherResults.temperature}ºC` +
                    ` in ${results.cityName}, and it feels like ${weatherResults.apparentTemperature}ºC.`);
                console.log(`The sky status is: ${weatherResults.summary}.`);
                console.log(`Lowest Temperature today will feel ${weatherResults.apparentTemperatureMin}ºC at ` +
                    convertToHours(`${weatherResults.apparentTemperatureMinTime}`));
                console.log(`Highest Temperature today will feel ${weatherResults.apparentTemperatureMax}ºC at ` +
                                convertToHours(`${weatherResults.apparentTemperatureMaxTime}`));
                if (argv.week) {
                    console.log('\nThe forecast for the next 5 days is:\n\n'+
                    convertToWeekday(`${weatherResults.day1.time}`) + `:\t Max: ${Number(weatherResults.day1.maxTemp).toFixed(2)}º\tMin: ${Number(weatherResults.day1.minTemp).toFixed(2)}º\t${weatherResults.summary}\n` +
                    convertToWeekday(`${weatherResults.day2.time}`) + `:\t Max: ${Number(weatherResults.day2.maxTemp).toFixed(2)}º\tMin: ${Number(weatherResults.day2.minTemp).toFixed(2)}º\t${weatherResults.summary}\n` +
                    convertToWeekday(`${weatherResults.day3.time}`) + `:\t Max: ${Number(weatherResults.day3.maxTemp).toFixed(2)}º\tMin: ${Number(weatherResults.day3.minTemp).toFixed(2)}º\t${weatherResults.summary}\n` +
                    convertToWeekday(`${weatherResults.day4.time}`) + `:\t Max: ${Number(weatherResults.day4.maxTemp).toFixed(2)}º\tMin: ${Number(weatherResults.day4.minTemp).toFixed(2)}º\t${weatherResults.summary}\n` +
                    convertToWeekday(`${weatherResults.day5.time}`) + `:\t Max: ${Number(weatherResults.day5.maxTemp).toFixed(2)}º\tMin: ${Number(weatherResults.day5.minTemp).toFixed(2)}º\t${weatherResults.summary}\n`);
                }
            }
        });
    }
});
