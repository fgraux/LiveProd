# Timexe - A Cron-like Timer and scheduler witn milliseconds resolution
## Also works in a browser 
[![License](https://img.shields.io/npm/l/timexe.svg)](https://github.com/paragi/timexe/LICENSE)
[![Downloads per month](http://img.shields.io/npm/dm/timexe.svg)](https://www.npmjs.org/package/timexe)
[![downloads per month](http://img.shields.io/npm/v/timexe.svg)](https://www.npmjs.org/package/timexe)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/paragi/timexe/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/paragi/timexe/badge.svg)](https://snyk.io/test/github/paragi/timexe)

### Features
* Milliseconds resolution
* Improved cron-like syntax
* Recalculate long running timers, to improve accuracy
* No dependencies
* Works both for node JS and browser inclusion
* Time expressions include ranges, sets, timestamps, weekdays, yeardays and more
* Battle-tested. Very reliable.


### Precission
At present it seems to have an accuracy within 2 ms in node and up to 25 ms i most browsers.
It seems that execution is defered somewhat during process load.


### Example
To add a timed job every day at noon:

```javascript
timexe(”* * * 12”, function(){console.log(“hello - it is noon again”)});
```

The time expression syntax is like cron, but in reverse order: starting with year, month... (where as cron start with minutes, hours...) plus some enhancements.

## Time expression Syntax
---
The basic syntax is a series of fields specifying the time(s):

 `<year> <month> <day> <hour> <minute> <second> <millisecond> <microsecond> ...`

or a time stamp.

Each field contain wild-cards, ranges, sets, not flags and every flags. Plus some special flags for year days and week days.

The epoch timestamp is seconds since 1970-01-01 UTC with fractions of second as decimal part:

	@<epoch>[.<faction of second>]

##### Field syntax: 	`[!][-]<value>[-<value>]|[,<value>] | /<value> | *`
```
space : field separator
*     : all values. Flags will be ignored.
!     : not
/     : every (can not be combined with ! and range)
-     : Negative values are counted back from the maximum value
a-b   : range. both a and b included.
a,b   : set of values

Day field can have the one of the following flags as well
y: day of year
w: day of week 1-7  (1 is Monday)
```
Unspecified minor fields are assumed to have the lowest possible value

## Note:
- Time expression are in local time where as time stamps are in UTC
- Month and weekday use another offset then the javascript Date function:
- Month 1 is January
- Week day 1-7 starting with Monday


### Examples og timer expressions:
| Time  | Time expression |
| --- |:---|
| Every hour |   \* \* \* \* |
| Every day at noon | \* \* \* 12
| Every 3th Hour on work days | \* \* w1-5 /3
| Once at a specific epoch time |@1422821601.123
| Once at a specific time | 2014 5 13 18 53 7 300 230
| 2th to last day of the month at noon | \* \* -2 12
| 3th last day of the year | \* \* y-3
| 3 times an hour during work time | \* \* w1-5 9-17 0,20,40
| Every morning at 7:30 but not on weekends | \* \* !6-7 7 30
| Every 10 minutes in the day time |  \* \* \* 8-18 /10


## API
---
##### timexe(timeExpression, callBack [,parameterToCallBack])

Returns a result object:
```
{
  result: “ok” or null
  error:  A failure explanation or null
  id:	  integer used to identify the timer
}
```


##### timexe.remove(id)
where id is the value returned from timexe

Returns a result object:
```
{
  result: “ok” or null
  error:  A failure explanation or null
}
```


##### timexe.get([id])
where the optional id is the value returned from timexe

Returnes either a timexe timer object if id is given, or an array of all active timer objects.


### Settings
##### timexe.timeResolution (integer)
This is the minimum time resolution for an expression. Minimum value is 1 ms. default is 2 ms.
This should be more the the execution time and delays do to load, of the intepreter.

##### timexe.maxTimerDelay (integer)
Maximum run time of a setTimeout call. Some javascripts engines cant handle more then 32 bit = 0x7FFFFFF. thats about 28 days. default is 86400000 = 1 day.
When this time have elapsed, the time expression are reevaluated.


## With node JS
---
#### Install
```bash
$ npm install timexe
```
#### Use
```js
var timexe = require('timexe');

// Add
var res1=timexe(”* * * 12”, function(){console.log(“hello wolrd”)});

// Remove
var res2=timexe.remove(res1.id);
```


## With HTML & javascript
---
#### Install
Copy files to folder.

#### Use
```html
<script type="text/JavaScript" src="timexe.js"></script>
<script>
// Add
var res1=timexe(”* * * 12”, function(){alert(“hello wolrd”)});

// Remove
var res2=timexe.remove(res1.id);
</script>
```

## Change log
1.0.3 Bugfix: mismatched ID 

1.0.2 Temp bugfix of mismatched ID.

1.0.1 Documentation 

1.0.0  Fixed test cases:

   "Cascading carry" failed

   "Only Wildcards = every hour" failed

   Documentation 

0.9.19 Bug fix. failed when "processs" undefined 

0.9.18 Documentation update.

0.9.14 A quick code review. No bugs repported for 2 years.

0.9.13 Minor changes to timex.js

0.9.12 Minor changes to comments and reamne.md

0.9.11 Minor changes to comments and reamne.md

0.9.10 Adapted example to runkit

0.9.9 Minor bugfix. timexe.list made into a regular array.

#### Help
Please don't hesitate to submit an issue on github! It's the only way to make it better.

But please be prepared to present a test case.

Contributions of almost any kind are welcome.
