console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000); // wait 2s

setTimeout(() => {
    console.log('second setTimeout');
}, 0);

console.log('Finishing up');
