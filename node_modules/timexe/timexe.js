/*============================================================================*\
timexe - Timed execution for node JS.

syntax: timexe(<time expression>, <call back>, <parameter to call back>);


Call with a time expression string and a callback function.
The time expression can produce a more complex reoccurring time pattern or a one-time shot, within years, seconds or even milliseconds.

His is not cron. Rather it is an attempt at updating the very successful cron syntax.
This version have a time resolution in milliseconds, but the syntax supports higher resolutions.

A basic time expression is a series of fields specifying the time(s):

<year> <month> <day> <hour> <minute> <second> <millisecond> <microsecond> ...
or a time stamp.

The time expression can contain wild-cards, ranges, sets, not flags and every flags. Plus some special flags for year days and week days.

Chronos are based on the setTimeout function. It is not very precise. At present it seems to have an accuracy within 25 ms, without significant process load.  However it seems to defer execution time, during process load. In some cases that I preferable, but it makes the timing less precise.
To increase precision, you would have to rewrite the function with some form of correction to real time.

To add a timed job every day at noon:

[code]
timexe(”* * * 12”,function(){console.log(“hello wolrd”)});
[/code]

Each field can be substituted with a wild card “*” , have flags, ranges or a set of values.

The epoch timestamp is seconds since 1970-01-01 UTC with fractions of second as decimal part:

	@<epoch>[.<faction of second>]

Field syntax: 	[!][-]<value>[-<value>]|[,<value>]
or           	 /<value>
or            	* (Any)

Meaning:
" " : field separator
*   : all values. Flags will be ignored.
!   : not
/   : every (can not be combined with ! and range)
-   : Negative values are counted back from the maximum value
a-b : range. both a and b included.
a,b : set of values

Day field can have the one of the following flags as well
y: day of year
w: day of week 1-7  (1 is Monday)

Unspecified minor fields are assumed to have the lowest possible value

Note!:
- Time expression are in local time where as time stamps are in UTC
- Month and weekday use another offset then the javascript Date function:
- Month 1 is January
- Week day 1-7 starting with Monday
- In the current implementation, using javascripts settimeout, the accuracy is
  likely within 25 ms.


Examples:

    Every hour:  * * * *

    every day at noon: * * * 12

    Every 3th Hour on work days:  * * w1-5 /3

    At a specific epoch time: @1422821601.123

    At a specific time: 2014 5 13 18 53 7 300 230

    2th to last day of the month at noon: * * -2 12

    3th last day of the year: * * y-3

    3 times an hour during work time: * * w1-5 9-17 0,20,40

    Every morning at 7:30 but not on a weekend: * * !6-7 7 30

    every 10 minutes in the day time:  * * * 8-18 /10


Functions:

timexe(<time expression>, <command>, <parameter to call back>);

Add a single shot or reoccurring job

Returns an object:

result: “ok” or null
error: 	<an failure explanation> or null
id:	<integer used to identify the timer>


timexe.remove(id);
Removes the job

Returns an object:

result: “ok” or null
error: 	<an failure explanation> or null
id:	<integer used to identify the timer>


\*============================================================================*/
if(typeof process !== 'undefined')
  process.versions.timexe='1.0.0';

/*============================================================================*\
                             Public functions
\*============================================================================*/
var timexe = function(timex,action,param){
  return timexe.add(timex,action,param);
};
// For node JS
if(typeof module !== 'undefined') module.exports = exports = timexe;

// Settings
timexe.file='';   // File to store permanent time expressions
timexe.timeResolution=2; // Min 1 ms. This is the minimum time between execution.
timexe.maxTimerDelay=86400000 // some javascripts engines cant handle more then 32 bit 0x7FFFFFF - about 28 days

/*============================================================================*\
                             Internal functions
\*============================================================================*/
// Globals
timexe.list=[];
last_id=0;

// Constants
var limit = [
   [1970, 3000]
  ,[1, 12]
  ,[1, 31]
  ,[0, 23]
  ,[0, 59]
  ,[0, 59]
  ,[0, 999]
  ,[0, 999]
  ,[0, 999]
  ,[0, 999]
  ,[1, 7]   // Week day
  ,[1, 366] // Day of year
  ,[1, 53] // Week number
];

var fieldName=['year', 'month', 'day', 'hour', 'min', 'sec', 'ms','weekday','yearday','week'];


// Job object
//    timex:  Time expression
//    action: function to execute

//    next:   Next execution time
//    timer:  handle to setTimeOut


/*============================================================================*\
  Timer

  Returns an associative array:
    result: "ok" or null
    error: error text
    id: new job ID

  Parameter is an associative array:
    timex: Time expression
    action: function to execute
    p: parameters parsed action function

\*============================================================================*/
timexe.add=function(timex,action,param){
  // validate parameters
  if(typeof timex !== 'string')
    return {"result":"failed","error":"time expression not a string","id":""};
  if(typeof action !== 'function')
    return {"result":"failed","error":"Action is not a function","id":""};

  var id = ++last_id;
  timexe.list[id]={
     timex: timex
    ,action: action
    ,param: param
    ,timeoutShortened: false // Define the timeout Shortened flag
  };

  // Start timed execution
  var error=timexe._start(id);
  if(error.length>0) return {"result":"failed","error":error,"id":""};

  return {"result":"ok","error":"","id":id};
}

timexe.remove=function(id){
  if(typeof timexe.list[id] !== "undefined"){
    clearTimeout(timexe.list[id].timer);
    delete timexe.list[id];
    return {"result":"ok","error":""};
  }
  return {"result":"failed","error":"Timer ID was unknown"};
}

timexe.get=function(id){
  if(typeof id ==='number') return timexe.list[id];
  return timexe.list;
}

// start on load

/*============================================================================*\
  Start timer for job
\*============================================================================*/
timexe._start=function(id){

  // Get now
  var now = (new Date).getTime()/1000;
  var starFromTime=now;
  var delay;

  // Set next execution time
  if(!timexe.list[id].timeoutShortened){
    // To avoid multiple hits and getting out of sync: set time to after last
    // execution time (do to timing errors)
    if(typeof timexe.list[id].next !== 'undefined')
      if(starFromTime <= timexe.list[id].next)
        starFromTime = timexe.list[id].next+timexe.timeResolution;

    // get next execution time
    var result=timexe.nextTime(timexe.list[id].timex,starFromTime);
    if(result.error.length>0){
      return result.error;
    }

    if(result.time < now){
      timexe.remove(id);
      return "time expression did not produce a valid future time";
    }

    timexe.list[id].next=result.time;
  }

  // Start timer for next execution
  delay=parseInt((timexe.list[id].next-now)*1000);
  timexe.list[id].timeoutShortened=false;

  // In some engines, the delay can not be above 32 bit integer
  if (delay>timexe.maxTimerDelay){
    delay=timexe.maxTimerDelay;
    // Let the _run function know
    timexe.list[id].timeoutShortened=true;
  }

  timexe.list[id].delay=delay;
  timexe.list[id].now=now;
  timexe.list[id].timer=setTimeout(timexe._run, delay, id);

  return '';
}

/*============================================================================*\
  Run timed action
  called by settimeout()
\*============================================================================*/
timexe._run=function(id){
  if(typeof id !== 'number'){
    console.error("Schedule timer fired with null id.");
    return;
  }
  if(typeof timexe.list[id] !== 'object'){
    console.error("Schedule timer fired with invalid id: " + id);
    return;
  }

  // Execute action function
  if(!timexe.list[id].timeoutShortened){
    timexe.list[id].action(timexe.list[id].param);
  }

  // Restart timer
  timexe._start(id);
}


/*============================================================================*\
  Find next time (time exp [[,<strict> [,<timestamp> default to current time]])

  Takes a time expression and calculate next valid time

  Parameters:
    Time expression: can either be a set of fields with flags or just an epoch timestamp.
    Strict interpretation flag: Boolean default to false.
    Timestamp: epoch timestamp to use instead of current time

  Return an associative array:
    time: Epoch timestamp in seconds since 1970-01-01 UTC with fractions of second as decimal part
    error: <any error message>

  time expression fields:
    <Year> <Month> <day> <Hour> <Minute> <Second> <Millisesond> ...
    Unspecified minor fields are assumed to have the lowest posible value

  Note!: Time expression are in local time where as time stamps are in UTC
  Note!: Month and weekday use another offset then the javascript Date function:
    Month 1 is January
    Week day 1-7 starting with Monday

  Field syntax: [!][-]<value>[-<value>]|[,<value>]
  or            /<value>
  or            * (Any)
  Day feild can also have the one of the following flags
    y: year day
    w: Week day 1-7 where 1 is monday

  The epoch timestamp is seconds since 1970-01-01 UTC with fractions of second as decimal part
  @<epoch>[.<milliseconds>]


  " " : field separator
  *   : all values. Flags will be ignored.
  !   : not
  /   : every (can not be combined with ! and range)
  -   : Negative values are counted back from the maximum value
  a-b : range. both a and b included.
  a,b : set of values

  Special flags for month field:
  w   : week of the year 1 - 53

  Special flags for day field:
  y   : day of year 1-366 (month field are ignored, but must be valid)
  w   : day of week 1-7

  Examples:

    Every hour:  * * * *

    every day at noon: * * * 12

    Every 3th Hour on work days:  * * w1-5 /3

    At a specific epoch time: @1422821601.123

    At a specific time: 2014 5 13 18 53 7 300 230

    2th to last day of the month at noon: * * -2 12

    3th last day of the year: * * y-3

    3 times an hour during work time: * * w1-5 9-17 0,20,40

    Every morning at 7:30 but not on a weekend: * * !6-7 7 30

    every 10 minutes in the day time:  * * * 8-18 /10

    every 3th thuesday at 18, execpt in the summer: * * w2 18 & * 21-28 & * !6-8


  This code is optimised for performance rather then readability.
  Please make good test cases that coveres all changes made here.
\*============================================================================*/
timexe.nextTime = function(tex,strict,startfromTime){

  var carry=false;
  var sign=false;
  var next=-1;
  var date;
  var valid,last,lastdom;
  var time;

  // Set next time to now
  if(typeof startfromTime === "number")
    var ct = new Date(startfromTime*1000);
  else{
    var ct = new Date();
  }

  // Add a short delay to avoid small timing errors to generate multiple hits
  // And to allow for execution time
  ct.setUTCMilliseconds(ct.getUTCMilliseconds() + timexe.timeResolution );

  var nt=[
     ct.getFullYear()
    ,ct.getMonth()+1
    ,ct.getDate()
    ,ct.getHours()
    ,ct.getMinutes()
    ,ct.getSeconds()
    ,ct.getMilliseconds()
    ,0,0,0,0,0
  ];
  var maxCarry=nt.length-2;

//console.log(ct.getTime(),(new Date(nt[0],nt[1]-1,nt[2],nt[3],nt[4],nt[5],nt[6])).getTime());

  // Phase 1: Split time expression into segments of numbers and flags/other
  //------------------------------------------------------------------------*/
  // Remove whitespaces
  tex=tex.replace(/\s+/g,' ').trim();

  // Split into elements og number and other
  var f=tex.match(/(\d+|[^\d])/g);

  // Phase 2: Reassamble fields into a record
  //------------------------------------------------------------------------*/
  var field=[]; field[0]={};field[0].val=[];field[0].range=[];field[0].flags=new String();;
  var fpc=0;  // Field position counter
  var tp=0;
  var l=0;    // measure length of string, to make better error messages
  var sign=false;
  var val;

  for(var i=0;i<f.length;i++){
    // Flags
    if(fpc==0 && "@".indexOf(f[i])>=0){
      field[0].flags=f[i];

    }else if("!/".indexOf(f[i])>=0){
      field[fpc].flags+=f[i];

    // Special day flags
    }else if(fpc==2 && "yw".indexOf(f[i])>=0){
      // Add flag
      field[fpc].flags+=f[i];
      // Set special index
      if(f[i]=='w') tp=10;
      else tp=11;

    // Value set
    }else if(f[i]==',' && field[fpc].val.length>0 && field[fpc].range.length==0){
      continue;

    // Allow decimal point in epoch time
    }else if(fpc==0 && field[0].flags=='@' && f[i]=='.'){
      continue;

    // Range
    }else if(f[i]=='-' && /\d$/.test(f[i-1]) && field[fpc].val.length==1){
      field[fpc].range[0]=field[fpc].val[0];
      field[fpc].val=[];

    // Signed value
    }else if(f[i]=='-' && /\d$/.test(f[i+1])){
      sign=true;

    // Wildcard
    }else if(f[i]=='*' && field[fpc].val.length==0){
      field[fpc].val[0]='*';
      field[fpc].flags='';  // Remove flags from wildcard
      field[fpc].range=[];  // Drop range

    // Values
    }else if(/\d$/.test(f[i]) ){
      if(field[fpc].range.length>0)
        field[fpc].range[1]=(sign?'-':'')+f[i];
      else
        field[fpc].val[field[fpc].val.length]=(sign?'-':'') + f[i];
      sign=false;

    // Syntax errors
    }else if(strict && f[i]!=' ')
      return {
        time: 0,
        error: `Can't intrepret '${f[i]}' at ${l} \n${tex}`+ "\n" + " ".repeat(l) + '^'
      } 

    // Move field pointer to next position
    if( i+1 <f.length
        && f[i+1]!=','
        && f[i+1]!='-'
        && f[i+1]!='.'
        && (field[fpc].val.length>0 || field[fpc].range.length>1)
      ) {
      fpc++;
      tp=fpc;
      field[fpc]={};
      field[fpc].val=[];
      field[fpc].range=[];
      field[fpc].flags=new String();
      range=false;
    }

    // sum length for displaying error mesage
    l+=f[i].length;
  }


  // Phase 3: validate and interpret fields
  //------------------------------------------------------------------------*/
  // Loop through fields and assign time
  // When time for a field exceeds limits; skip back one field and preset lower values to 0
  for(fpc=0; fpc<field.length; fpc++){
    tp=fpc;
    last=-1;

    // Day has special flags and limits
    // Set up values to use
    if(fpc==2){
      // Make date of year, month and day
      date=new Date(nt[0],nt[1]-1,nt[2]);

      if(field[fpc].flags.length>0){

        // day of week
        if(field[fpc].flags.indexOf('w')>=0){
          tp=10;
          last=7;
          lastdom=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
          // Get week day of current next time
          // convert week day 0-6: sunday - saturday to 1-7: monday - sunday
          nt[10]=(((date.getDay()+6)%7)+1);
          //nt[10]=((date.getDay()+7)%8+1);

        // Day of year
        }else if(field[fpc].flags.indexOf('y')>=0){
          tp=11;
          last=((new Date(date.getFullYear()+1, 1, 1) - new Date(date.getFullYear(), 1, 1))  / 86400000);
          // Get yearday of current next time
          nt[tp]=Math.ceil((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
          if(nt[11]==0) nt[1]=1;
        }
      }

      // day of month
      if(last<0){
        last=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
      }
    }

    // Wildcard: skip all checks and go to next field
    if(field[fpc].val[0]=='*'){
      // If last field; Preset unused fields to low contraint.
      if(fpc==field.length-1){
        for(i=fpc+1;i<nt.length-2;i++)
          if(nt[i]>limit[i][0]){
            nt[i]=limit[i][0];
            carry=true;
          }
        if(carry) nt[fpc]++;
        break;
      }else
       continue;
    }

    if(last<0) last=limit[tp][1];
    next=nt[tp];

    // last field;  Test if remaining part are above minimum
    if(!carry && fpc==field.length-1)
      for(i=fpc+1;i<maxCarry;i++)
        if(nt[i]>limit[i][0]){
          next++;
          break;
        }

    // Test for cascading carry
    if(next>last){
      if(fpc==0)
        return {"time":0,"error":"Out of range time expression: "+tex};
      carry=true

    }else{
      // Test that values are within limits
      // Recalculate negative numbers to be counted backwards
      do{
        // Loop through all values
        for(var key in field[fpc]){
          // Test only values of arrays
          if(Object.prototype.toString.call(field[fpc][key]) != '[object Array]') continue;
          if(field[fpc][key].length<1) continue;
          for(var i=0;i<field[fpc][key].length;i++){
            valid=false;
            // Not a number?
            if(isNaN(field[fpc][key][i])) break;
            // Cahch epoch
            if(fpc==0 && field[0].flags=='@' && !isNaN(field[0].val[0])){
              valid=true;
              break;
            }

            // Test i minus sign. (Might be -0)
            sign=(field[fpc][key][i]<0
                 || (typeof field[fpc][key][i]==='string' && field[fpc][key][i].indexOf('-')>=0));
            // Make integer
            field[fpc][key][i]=parseInt(field[fpc][key][i]);
            // Negative values are counted backwards from "last" value
            if(sign){
              // Year: Set to maximum
              if(fpc==0) field[fpc][key][i]=limit[tp][1];
              // count back from last
              else field[fpc][key][i]=last+(fpc>2?1:0)+field[fpc][key][i];
            }
            //test low limits
            if( field[fpc][key][i] < limit[tp][0] ){
              if(key!='val' && field[fpc].flags.indexOf('/')<0){
                if(strict) break;
                // Range: Set to minimum
                if(key=='range') field[fpc][key][i]=limit[tp][0];
                // Value set: delete invalid value
                else if(field[fpc][key].length>1) delete field[fpc][key][i];
                // value: Invalid result
                else break;
              }
            }
            // Test high limit
            if( field[fpc][key][i] > limit[tp][1] ){
              if(strict) break;
              // Range: Set to maximum
              if(key=='range') field[fpc][key][i]=limit[tp][1];
              // Value set: delete invalid value
              else if(field[fpc][key].length>1) delete field[fpc][key][i];
              // value: invalid result
              else break;
            }
            valid=true;
          }
          if(!valid) break;
        }
      }while(false);

      // Error
      if(!valid)
        return {"time":0,
          "error":'(2) Unable to interpret time expression field '+fieldName[fpc]+'. as: "'
          +field[fpc][key][i]+'" ('+key+')'
        }

      // Phase 4: Find next time
      //------------------------------------------------------------------------*/

      // Epoch time stamp
      if(fpc==0 && field[0].flags=='@' && !isNaN(field[0].val[0]))
        // Make a float
        return {"time":Number(field[0].val[0] + '.' + (isNaN(field[0].val[1])?"0":field[0].val[1]) ),
          "error":''};

	    // Range
      if(field[fpc].range.length==2){
        // Convert reverse range to a forward rande with the not flag set
        if(field[fpc].range[0] > field[fpc].range[1]){
          if(fpc==0){
            // reverse range
            val=field[fpc].range[1];
            field[fpc].range[1]=field[fpc].range[0];
            field[fpc].range[0]=val;
          }else{
            // Toggle ! flag
            if(field[fpc].flags.indexOf('!')>=0)
              field[fpc].flags=field[fpc].flags.replace('!','');
            else
              field[fpc].flags+='!';
            // reverse range
            var val=field[fpc].range[1];
            field[fpc].range[1]=field[fpc].range[0]-1;
            field[fpc].range[0]=val+1;
          }
        }

        // Check for hit
        if(next>=field[fpc].range[0] && next<=field[fpc].range[1]){
          // Flag !
          if(field[fpc].flags.indexOf('!')>=0){
            next=field[fpc].range[1]+1;
          }

        // Out of range; set next time (unless ! flag)
        }else{
			    // If ! flag: its a hit
          if(field[fpc].flags.indexOf('!')<0){
				    // over range
				    if(next>field[fpc].range[1]) carry=true;
            next=field[fpc].range[0];
          }
        }

      // Every value
      }else if(field[fpc].flags.indexOf('/')>=0 && field[fpc].val.length==1){
        // meningsless values treated as a hit
        if(field[fpc].val[0]>1){
          // Calculate next multiplum
          val=next%field[fpc].val[0];
          next+=(val?field[fpc].val[0]-val:0);
        }

      // Regular value and value set
      }else if(field[fpc].val.length>=1){
        // order values
        if(field[fpc].val.length>1) field[fpc].val.sort();
		    for(i=0; i<field[fpc].val.length; i++){
			    // Break on hit
			    if(field[fpc].val[i]==next && field[fpc].flags.indexOf('!')<0) break;
			    // Over
			    if(field[fpc].val[i]>next){
				    // ! flag; loop until hole in values
            if(field[fpc].flags.indexOf('!')>=0){
              if( i>0 && field[fpc].val[i]-1==field[fpc].val[i]) continue;
            }else{
              next=field[fpc].val[i];
            }
            break;
          }
		    }
		    // If no hit: set carry
		    if(i>=field[fpc].val.length){
			    // ! flag: increment last value
			    if(field[fpc].flags.indexOf('!')>=0){
				    next=field[fpc].val[field[fpc].val.length-1]+1;
            if(next>last) carry=true;
			    } else
				    carry=true;
		    }

      // Syntax errors
      }else if(strict)
        return {"time":0,
          "error":'(3) Unable to interpret time expression field '+fieldName[fpc]+' as:'+field[fpc]
      };

	    // if next has changed: clear smaller fields
      if(!carry && next != nt[tp]){
        // Convert week day to day of month
        if(tp==10){
          next=nt[2]+next-nt[10];
          tp=2;
          last=lastdom;
        }
      	// Check if next is over limits
        if(next<=last){
          for(var ii=fpc+1; ii<maxCarry;ii++)
  				  nt[ii]=limit[ii][0];
    		  nt[tp]=next;
        }else{
          carry=true;
        }
      }
    }

    // Handle carry condition
    if(carry){
      // if carry on same field twice: throw error
      if(fpc>=maxCarry)
        return {"time":0,"error":'Carry overflow'};

      var lastMaxCarry=maxCarry;
      maxCarry=fpc;

      // if Year day, skip month
      if(tp==11)
        fpc=0;

      // If not weekday and every flag are not set, jump to more significant field
      else if(tp!=10 && (field[fpc].flags.indexOf('/')<0 || next>last) && fpc!=0)
        fpc--;
      else
        // if just incrementing same field, it dosent count as a real carry
        maxCarry=fpc+1;

      // Preset rest of fields to minimum value
      for(var i=fpc+1; i<lastMaxCarry;i++)
        nt[i]=limit[i][0];

      // add carry
      nt[fpc]++;

      // Run loop again, but compensate for loop increment
      fpc--;
      carry=false;
    }
  }

  // Convert next date to an epoch timestamp
  // Date function parameters are: year, month, day, hours, minutes, seconds, milliseconds
  // NB: months start with 0 for january!
  if(!nt[11])
    time=(new Date(nt[0],nt[1]-1,nt[2],nt[3],nt[4],nt[5],nt[6])).getTime();

  // for year daye: use month 0 and set day to year day
  else
    time=(new Date(nt[0],0,nt[11],nt[3],nt[4],nt[5],nt[6])).getTime();

  // Return epoch time, with milliseconds as the decimal values
  return {"time":Math.floor(time/1000)+"."+("00"+time%1000).slice(-3),"error":''};
}
