/*============================================================================*\
  Check dependencies
\*============================================================================*/
// For node JS
if(typeof process !== 'undefined'){
  try {
    var timexe=require('timexe');
  }
  catch(e){
    var timexe=require('./timexe');
  }

// For HTML
}else{
  if(typeof timexe === 'undefined'){
    console.error("Please include the timexe.js script");
    console.error('<script type="text/JavaScript" src="timexe.js"></script>');
  }
}

/*============================================================================*\
  Activate action <ms> into the future
\*============================================================================*/
function timerIn(ms,action,p){
  var ta=new Date();
  ta.setMilliseconds(ta.getMilliseconds()+ms);
  ta.getTime();
  var str= Math.floor(ta.getTime()/1000) + "." + ("00" + Math.round(ta.getTime()%1000)).slice(-3);
  var res=timexe("@" + str,action,p);
}

/*============================================================================*\
  Display short term timer pattern
\*============================================================================*/
function test1(){
  var i=1;
  var ii=1;

  function action(p){
    // HTML output
    if(typeof process === 'undefined'){
      var bg=document.getElementById('t'+i+ii).style.background;
      // Delete
      document.getElementById('t'+i+ii).innerHTML='';
      document.getElementById('t'+i+ii).style.background = "#333377";
      i++;
      if(i>3){ i=1;ii++};
      if(ii>3){ ii=1};

      // Write 
      document.getElementById('t'+i+ii).innerHTML=p;
      document.getElementById('t'+i+ii).style.color="#333377";
      document.getElementById('t'+i+ii).style.background="#f0d988";

    // Node JS
    }else{
      process.stdout.write(' '+p);
    }
  }

  var res=timexe("* * * * * * /50",action,":c)");

  // deactivate after 5 sec.
  var fid=res.id;
  timerIn(5155,timexe.remove,fid);
}

/*============================================================================*\
  Test timer expression syntax

  Test cases
  Array format: time expression, epoch time to use as now, 
    Expected result - timezone oftes
\*============================================================================*/
var testCase=[
   ["2015 2 1 21 13 21 123",1400000000,1422821601.123,"Simple",false]
  ,["2013 2 1 21 13 21 123",1400000000,0,"Passed date",false]
  ,["* !/2 -4 12-16",1400000000,1403776800 ,"Mutually exclusive flags",false]
  ,["* * * * * 0",1420066799,1420066800,"Cascading carry",false]
  ,["* * * * ",1400000000,1400000400,"Only Wildcards = every hour,",false]
  ,["* * * * 12",1400000000,1400008320,"Wildcards with one fixed value",false]
  ,["**1 12",1400000000,1401624000,"Wildcards with two fixed value",false]

  // basic methods
  ,["2014 -1 -2 -3 -4 -5 -600",1400000000,1417211815.4,"Negative values",false]
  ,["* * y-3 ",1400000010,1419724800	,"3th Last day of the year",false]
  ,["* * y-0 ",1400000010,1419984000	,"Last day of the year",false]
  ,["* * w-3 ",1400000010,1400112000		,"3th Last day of the week",false]
  ,["* * w-0 ",1400000010,1400371200	,"Last day of the week",false]
  ,["!2014 !1 !1 !0 !0 !0 !0",1400000000,1422838861.001,"Not",false]
  ,["/4 /3 /2 /1 /10 /20 /100",1464999001,1465006220,"Every",false]
  ,["2015-2114 6-9 12-15 12-23 20-30 10-20 100- 600",1400000000,1434111610.100,"Ranges",false]
  ,["* !4-9 !1-15 12-23 20-30 10-20 100-600",1400000000,1413462010.100,"Ranges",false]
  ,["* * * * * /5",1432752245,1432752250,"Every 5 seconds",false]
  // range
  ,["* !10-6 *",1400000000,1404172800,"Not inverse range",false]
  ,["* * * * * 10-6 *",1400000827,1400000830,"Range over 0",false]
  ,["*-5--4*" ,1400000000,1404172800,"Range with negative start value",false]
  ,["*1-12*" ,1400000000,1400025600,"Range covering all values=*",false]
  ,["*-3--4*" ,1400000000,1400025600,"Strange wildcard Range coverinf all=*",false]
  ,["* 1-1 *" ,1400000000,1420070400,"Range of one value",false]
  ,["!2027-2015" ,1400000000,1830297600,"Not Reverse Range",false]
  ,["!2027-2014" ,1400000000,1830297600,"Not Reverse Range",false]
  ,["2015-6 -8" ,1400000000,1427846400,"Malformed range with negative end value",false]
  ,["* 6--3",1400000000,1401580800,"Range with negative value",false]
  ,["* 1-12",1400000000,1401580800,"Cover whole range",false]

  // Special day flags
  ,["* * y/3 12",1420066899,1420286400,"Every 3th day",false]
  ,["* * w/3 12",1420066799,1420286400,"Every wednesday and saturday",false]
  ,["* * w6 12",1420066899,1420286400,"Saturdays at noon",false]
  ,["* * w1,5 12",1420066899,1420200000,"mon, wedns and fri-day at noot",false]
  ,["* * w!1-5 12",1420066899,1420286400,"Not week day at noot",false]
  ,["* * y100,200 12",1400000000,1405771200,"Yead day set",false]
  ,["* * y!-1--350 12",1400000000,1400068800,"Year day strage range + carry",false]
  ,["* * y!-1--350 12",1421097899,1421409600,"Year day strage range + carry",false]
  ,["**/y-3",1400000000,1419724800,"Large every yearday",false]
  ,["* * y-2" ,1400000000,1419811200,"Negative yearday",false]
  ,["* * y-100,300" ,1400000000,1411344000,"Set of yeardays",false]
  ,["* 3-5 y343 * * ",1400000000,1418083200,"Ignore month in year day",false]

  // Exceeding contraints
  ,["1969 0 0 0 0 0 0 0",1400000000,0,"Under",false]
  ,["* 0 0 0 0 0 0 0",1400000000,0,"Under",false]
  ,["3000 13 32 24 60 60 1000",1400000000,0,"Over",false]
  ,["* 13 32 24 60 60 1000",1400000000,0,"Over",false]

  // Values causing Errors
  ,["-2",1400000000,32503680000,"Negative year",false]
  ,["/0",1400000000,1420070400,"Every 0 = *",false]
  ,["/)+| $ *1234hsd%1234",1400000000,0,"Malformed nonsens",false]
  ,[" * * 1,5, 10 , !-3",1400000000,1401616800,"Malformed set",false]

  // Complex 
  ,["!* 6-8 !w6,7,2,1 !18-8",1400000000,1401699600,"miscellaneous mixture",false] 
  ,["* * 1,5,7-8 ",1400000000,1401638400,"set negative day that looks like a range",false]

  // Epoch
  ,["@1234567890.123",1400000000,1234567890.123,"Epoch with mS",false]
  ,["@1234567890",1400000000,1234567890,"Epoch without mS",false]

  // reentry test
  ,["* 5 ",1400000010,1430438400	,"Unused field preset to low limit (reentry test)",false]

  // Debuging cases
  ,["* * * * * /1 ",1400000000,1400000001	,"Every 1 sec = *",false]
  ,["* * * * * /5",1433103355,1433103360,"Every 5 seconds",false]
  ,["* !1-12",1400000000,0,"All months exclusive",false]
  ,["* * w1,7 1 0",1447575482,1447632000,"Pascal's Late sunday error",false]
 
];

function test2(){
  var now=new Date();
  // Ajust for local time zone. All but epoc time stamps is local time.
  var of=now.getTimezoneOffset()*60; // Minutes > seconds
  var html;
  var jt;
  // Set other then system timezone
  // process.env.TZ='America/New_York'
  
  // For browser  
  if(typeof process === 'undefined'){
    html="<table><tr>";
    html+="<td>Now: " + now.getTime() / 1000 +"</td>";
    html+="<td>Time zone: UTC "+ (of>0?"+":'')+(of!=0?of:'')+"</td>";
    html+="</tr></table>";

    // Run test cases
    html+="<table>";
    for(var i=0; i<testCase.length; i++){
      var result=timexe.nextTime(testCase[i][0],testCase[i][4],testCase[i][1]);
      jt=( new Date(result.time*1000));

      html+="<tr><td>" + i +"</td>";
      html+="<td>" + testCase[i][0]+"</td>";
  //    html+="<td>"+( new Date(result.time*1000).toLocaleFormat("%F (%a w%U) %T."))
      html+="<td>"+jt.toLocaleString();
      html+="."+("00" + Math.round(result.time%1*1000)).slice(-3) +"</td>";
      if(result.time==testCase[i][2] 
        || result.time==jt.getTimezoneOffset()*60+testCase[i][2])
        html+="<td>Ok</td>";
      else
        html+="<td>Failed:("+result.time+")"+result.error+"</td>";
   //   html+="<td>" + result.time +"=="+ testCase[i][2]   +"</td></tr>";
        

      html+="<td>" + testCase[i][3]+"</td></tr>";
    }

    document.getElementById("syntax").innerHTML+=html+"</table>";

   // For Node JS
   }else{
    for(var i=0; i<testCase.length; i++){
      var result=timexe.nextTime(testCase[i][0],testCase[i][4],testCase[i][1]+of);
      jt=( new Date(result.time*1000));
      console.log(
        i
       ,testCase[i][0]
       ,(new Date(result.time*1000)).toLocaleString() + '.' + ("00" + Math.round(result.time%1*1000)).slice(-3)
       ,(result.time==testCase[i][2] 
        || result.time==jt.getTimezoneOffset()*60+testCase[i][2])
        ?'Ok':"Failed:("+result.time+")"+result.error+")"
       ,testCase[i][3]
      );
    }
   }
}

/*============================================================================*\
  Test timer
\*============================================================================*/
function test3(){
  // Test shortened timeout
  var tmp=timexe.maxTimerDelay;
  timexe.maxTimerDelay=1000;
  var now=(new Date()).getTime()/1000;
  timexe("@"+(now+5.2),defTest,now+5.2);

  function defTest(p){
    var now=(new Date()).getTime();
    var diff=now-p*1000;

    // For browser  
    if(typeof process === 'undefined'){
      document.getElementById('test-3-data').innerHTML='deviation: '+diff+'ms';
      if(diff<100)
        document.getElementById('test-3-res').innerHTML='Ok';
      else
        document.getElementById('test-3-res').innerHTML='deviation too big';
      timexe.maxTimerDelay=tmp;

    // For Node JS
    }else{
      console.log(
        "\nTest of deferred timer."
       ,'deviation: '+diff+'ms'
       ,(diff<100?'Ok':"deviation too big")
      );
    }
  }
}

/*============================================================================*\
  List active timers
\*============================================================================*/
function list(){
  var list=timexe.get();
  var html="<table>";
  for(var i in list){
    html+="<tr><td> "+i+" </td><td><table>";

    for(var ii in list[i]){
      html+="<tr><td> "+ii+" </td>"
      if(typeof list[i][ii] === 'function') 
        html+="<td> [function] <td>";
      else
        html+="<td> "+list[i][ii]+" <td>";
      html+="</tr>";
    }
    html+="</table></td></tr>"
  }
  html+="</table>";
  document.getElementById('timer list').innerHTML+=html;
}

// For browser  
if(typeof process === 'undefined'){
  test1();
  test2();
  test3();
  list();

// For Node JS
}else{
  console.log("Testing time expression syntax:");
  test1();
  console.log("Testing short term timer pattern:");
  test2();
  console.log("Testing timer:");
  test3();
}
