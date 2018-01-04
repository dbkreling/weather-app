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
                console.log(`Highest Temperature will feel ${weatherResults.apparentTemperatureHigh}ºC at ` +
                    convertUnixTime(`${weatherResults.apparentTemperatureHighTime}`));
                console.log(`Lowest Temperature will feel ${weatherResults.apparentTemperatureLow}ºC at ` +
                    convertUnixTime(`${weatherResults.apparentTemperatureLowTime}`));
            }
        });
    }
});
