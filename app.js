const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const defaultLocation = 'New York';

const argv = yargs
    .options({
        a: {
            // demand: true,
            alias: 'address',
            description: 'Address to fetch the weather for (default: New York City)',
            string: true  // Reinforce we get data in the string format
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (!argv.address) {
  argv.address = defaultLocation;
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
                console.log(`It is currently ${weatherResults.temperature}ºF` +
                    ` in ${results.cityName}, but it feels like ${weatherResults.apparentTemperature}ºF.`);
            }
        });
    }
});
