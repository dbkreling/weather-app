const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            description: 'Address to fetch the weather for',
            string: true  // Reinforce we get data in the string format
        }
    })
    .help('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address);
