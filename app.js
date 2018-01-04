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
        s: {
          alias: 'sky',
          description: 'Display the sky conditions for the specified location'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (!argv.address) {
  argv.address = defaultLocation;
}

var convertUnixTime = (unixTime) => {
    if (moment.unix(unixTime).isValid()) {
        return moment.unix(unixTime).format('HH:mm');
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
                console.log(`It is currently ${weatherResults.temperature}ºC` +
                    ` in ${results.cityName}, and it feels like ${weatherResults.apparentTemperature}ºC.`);
                console.log(`The sky status is: ${weatherResults.summary}.`);
                console.log(`Lowest Temperature will feel ${weatherResults.apparentTemperatureMin}ºC at ` +
                    convertUnixTime(`${weatherResults.apparentTemperatureMinTime}`));
                console.log(`Highest Temperature will feel ${weatherResults.apparentTemperatureMax}ºC at ` +
                    convertUnixTime(`${weatherResults.apparentTemperatureMaxTime}`));
                console.log('Forecast for the next 5 days:\n\n'+
                      ("         " + moment.unix(`${weatherResults.day0.time}`).format('dddd')).slice(-9) + `:\t Max: ${weatherResults.day0.maxTemp}º\tMin: ${weatherResults.day0.minTemp}º\t${weatherResults.summary}\n` +
                      ("         " + moment.unix(`${weatherResults.day1.time}`).format('dddd')).slice(-9) + `:\t Max: ${weatherResults.day1.maxTemp}º\tMin: ${weatherResults.day1.minTemp}º\t${weatherResults.summary}\n` +
                      ("         " + moment.unix(`${weatherResults.day2.time}`).format('dddd')).slice(-9) + `:\t Max: ${weatherResults.day2.maxTemp}º\tMin: ${weatherResults.day2.minTemp}º\t${weatherResults.summary}\n` +
                      ("         " + moment.unix(`${weatherResults.day3.time}`).format('dddd')).slice(-9) + `:\t Max: ${weatherResults.day3.maxTemp}º\tMin: ${weatherResults.day3.minTemp}º\t${weatherResults.summary}\n` +
                      ("         " + moment.unix(`${weatherResults.day4.time}`).format('dddd')).slice(-9) + `:\t Max: ${weatherResults.day4.maxTemp}º\tMin: ${weatherResults.day4.minTemp}º\t${weatherResults.summary}\n`);
            }
        });
    }
});
