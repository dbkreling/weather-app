var moment = require('moment');

// var date = 254248210;
var date = 1515002400;
var sunrise = 1514968134;
var lowest = 1514962800;
var highest = 1514912400;

console.log('date: ' + moment.unix(date).format('MMMM Do YYYY HH:mm:ss'));
console.log('Sunrise:' + moment.unix(sunrise).format('ddd MMMM Do YYYY HH:mm x'));
console.log('Lowest:' + moment.unix(lowest).format('MMMM Do ddd YYYY HH:mm'));
console.log('Highest:' + moment.unix(highest).format('MMMM Do ddd YYYY HH:mm'));
console.log('Now:' + moment().format('MMMM Do ddd YYYY HH:mm'));
