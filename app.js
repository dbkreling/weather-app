// const yargs = require('yargs');
// const geocode = require('./geocode/geocode.js');
//
// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             description: 'Address to fetch the weather for',
//             string: true  // Reinforce we get data in the string format
//         }
//     })
//     .help('help', 'h')
//     .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });
const request = require('request');

request({
    url: `https://api.darksky.net/forecast/914e2c5300e562b7cc3c33b135beb578/-22.9098833,-47.0625812`,
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
        console.log(response.statusCode);
    } else {
        console.log('Unable to fetch weather');
    }
});
