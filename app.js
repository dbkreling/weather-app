const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            description: 'Address to fetch the weather for',
            string: true  // Reinforce we get data in the string format
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(results.address);
                console.log(`It is currently ${weatherResults.temperature}` +
                    ` in ${results.cityName}, but it feels like ${weatherResults.apparentTemperature}.`);
            }
        });
    }
});
