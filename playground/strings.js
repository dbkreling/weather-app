const _ = require('lodash');

var day1 = 'one';
var day2 = 'two';
var day3 = 'three';
var day4 = 'four';

var arr = _.range(1, 5);

for (i in arr) {
    var d = `day${arr[i]}`;
    var x = 33;
    console.log(`${(d)}`);
    console.log(typeof(day1), typeof(d));
}


// const classes = `header ${ isLargeScreen() ? '' : `icon-${(item.isCollapsed ? 'expander' : 'collapser')}` }`; //note the parens
