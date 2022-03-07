var timexe = require('timexe');
var res1=timexe('* * * * * /5', function(){
    console.log('hello The time is now '+(new Date()).toLocaleString())
});
