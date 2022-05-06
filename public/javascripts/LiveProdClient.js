// SOCKETIO CONNECT
var socket = io.connect(window.location.origin+":7777", {
    query: {
        room: 'web'
    }
});

var cgsrv,cgamcp,cgosc,cgscan;
var vtr1,vtr2,bug1,bug2,dve1,dve2,dve3,dve4,score;
var lvtr1,lvtr2,lbug1,lbug2,ldve1,ldve2,ldve3,ldve4,lscore;
var temp1,temp2,temp3,temp4,temp5,json1,json2,json3,json4,json5;
var obs,obsrv,obsport,obspass;
var aux,auxsrv,auxport,auxpass;
var CH1frameR,CH2frameR,CH1sec,CH2sec;
var CH1remain,CH2remain,CH1current,CH2current,CH1index,CH2index,CH1index2,CH2index2,CH1ignit,CH2ignit;
var intervalID = 0;
var socketisOpen = false;
var device1,action1,class1,display1,file1,thumb1,loop1;
var device2,action2,class2,display2,file2,thumb2,loop2;
var loop;
var device3,action3,class3,display3,file3,thumb3;
var device4,action4,class4,display4,file4,thumb4;
var device5,action5,class5,display5,file5,thumb5;
var device6,action6,class6,display6,file6,thumb6;
var device7,action7,class7,display7,file7,thumb7;
var device8,action8,class8,display8,file8,thumb8;
var device9,aux1_active,obsaux_1;
var device10,aux2_active,obsaux_2;
var device11,pgm_active,program;
var device12,pvw_activepreview;
var device13,Hplist1,Iplist1;
var device14,Hplist2,Iplist2;
var xkey1,xkey2,xkey3,xkey4,xkey5,xkey6,xkey7,xkey8,xkey9,xkey10,xkey11,xkey12,xkey13,xkey14,xkey15,xkey16,xkey17,xkey18,xkey19,xkey20,xkey21,xkey22,xkey23,xkey24,xkey25,xkey26,xkey27,xkey28,xkey29,xkey30,xkey31,xkey32,xkey33,xkey34,xkey35,xkey36,xkey37,xkey38,xkey39,xkey40,xkey41,xkey42,xkey43,xkey44,xkey45,xkey46,xkey47,xkey48,xkey49,xkey50,xkey51,xkey52,xkey53,xkey54,xkey55,xkey56,xkey57,xkey58,xkey59,xkey60,xkey61,xkey62,xkey63,xkey64,xkey65,xkey66,xkey67,xkey68,xkey69,xkey70,xkey71,xkey72,xkey73,xkey74,xkey75,xkey76,xkey77,xkey78,xkey79,xkey80;
var Gamer1,Score1,Gamer2,Score2,Gamer3,Score3,Gamer4,Score4,Gamer5,Score5,Gamer6,Score6,Gamer7,Score7,Gamer8,Score8,Gamer9,Score9,Gamer10,Score10,Gamer11,Score11,Gamer12,Score12,Gamer13,Score13,Gamer14,Score14,Gamer15,Score15,Gamer16,Score16;
var color1,color2;

	
// SIO || CONNECT
socket.on('connect',function() {
  console.log('Connected to NodeJS Server');
});

// SIO || DISCONNECT
socket.on('disconnect',function() {
  console.log('Disconnected to NodeJS Server');
});
// SIO || MEDIAS LIST RECEIVED
socket.on('ccgcls',function(mediasList,a,b) {
	CH1frameR = a;
	CH2frameR = b;
	if (CH1frameR == 23,98 || CH1frameR == 24 || CH1frameR == 59,94 || CH1frameR == 60 ){ CH1sec = 0.083 }
	if (CH1frameR == 25 || CH1frameR == 50 ){ CH1sec = 0.08 }
	if (CH1frameR == 29,97 || CH1frameR == 30 ){ CH1sec = 0.1 }
	if (CH2frameR == 23,98 || CH2frameR == 24 || CH2frameR == 59,94 || CH2frameR == 60 ){ CH2sec = 0.083 }
	if (CH2frameR == 25 || CH2frameR == 50 ){ CH2sec = 0.08 }
	if (CH2frameR == 29,97 || CH2frameR == 30 ){ CH2sec = 0.1 }
	$('#vtr1_box').attr('frameR',a);
	$('#vtr2_box').attr('frameR',b);
	var tableau = mediasList.split(";");
	var tab = new Array();
	for (var i = 0; i < tableau.length; i++) {
    tab[i] = tableau[i].split(",");
}	for (var i = 0; i < tab.length; i++) {
    tab[i].splice(2,2);
	}
	let videos = tab.filter(function(obj){
		for(key in obj){
			if(obj[key].includes('MOVIE')){
		return obj;
      }
     }
    }); 
	let images = tab.filter(function(obj){
		for(key in obj){
			if(obj[key].includes('STILL')){
		return obj;
      }
     }
	});	
generateTable(videos,'#VideoList','VidTab');
generateTable(images,'#ImgList','ImgTab');
});

// SIO || TEMPLATE LIST RECEIVED
socket.on('ccgtls',function(tempList) {
	var template = tempList.split(/\r\n|\r|\n/);
	generateTable(template,'#tempList','tempTab');
});

// SIO || CASPARCG CONFIG RECEIVED
socket.on('ccgconf',function(z) {
	var truc = JSON.parse(z);
	cgsrv = truc[0].var;
	cgamcp = truc[1].var;
	cgosc = truc[2].var;
	cgscan = truc[3].var;
	vtr1 = truc[4].var;
	vtr2 = truc[5].var;
	bug1 = truc[6].var;
	bug2 = truc[7].var;
	dve1 = truc[8].var;
	dve2 = truc[9].var;
	dve3 = truc[10].var;
	dve4 = truc[11].var;
	score = truc[12].var;
	lvtr1 = truc[13].var;
	lvtr2 = truc[14].var;
	lbug1 = truc[15].var;
	lbug2 = truc[16].var;
	ldve1 = truc[17].var;
	ldve2 = truc[18].var;
	ldve3 = truc[19].var;
	ldve4 = truc[20].var;
	lscore = truc[21].var;
	obssrv = truc[22].var;
	obsport = truc[23].var;
	obspass = truc[24].var;
	auxsrv = truc[25].var;
	auxport = truc[26].var;	
	auxpass = truc[27].var;	
	$('#server').attr('value',cgsrv);
	$('#amcport').attr('value',cgamcp);
	$('#oscport').attr('value',cgosc);
	$('#scanport').attr('value',cgscan);
	$('#vtr1 option').eq(vtr1 -1).prop('selected', true);
	$('#vtr2 option').eq(vtr2 -1).prop('selected', true);
	$('#bug1 option').eq(bug1 -1).prop('selected', true);
	$('#bug2 option').eq(bug2 -1).prop('selected', true);
	$('#dve1 option').eq(dve1 -1).prop('selected', true);
	$('#dve2 option').eq(dve2 -1).prop('selected', true);
	$('#dve3 option').eq(dve3 -1).prop('selected', true);
	$('#dve4 option').eq(dve4 -1).prop('selected', true);
	$('#score option').eq(score -1).prop('selected', true);
	$('#lvtr1 option').eq(lvtr1 -1).prop('selected', true);
	$('#lvtr2 option').eq(lvtr2 -1).prop('selected', true); 
	$('#lbug1 option').eq(lbug1 -10).prop('selected', true);
	$('#lbug2 option').eq(lbug2 -10).prop('selected', true);
	$('#ldve1 option').eq(ldve1 -10).prop('selected', true);
	$('#ldve2 option').eq(ldve2 -10).prop('selected', true);
	$('#ldve3 option').eq(ldve3 -10).prop('selected', true);
	$('#ldve4 option').eq(ldve4 -10).prop('selected', true);
	$('#lscore option').eq(lscore -10).prop('selected', true);
	$('#vtr1_box .prev').attr('channel',vtr1);
	$('#vtr1_box .dev1').attr('channel',vtr1);
	$('#vtr1_box .dv1').attr('channel',vtr1);
	$('#vtr1_box .next').attr('channel',vtr1);
	$('#vtr2_box .prev').attr('channel',vtr2);
	$('#vtr2_box .dev2').attr('channel',vtr2);
	$('#vtr2_box .dv2').attr('channel',vtr2);
	$('#vtr2_box .next').attr('channel',vtr2);
	$('#bug1_box #bugAction').attr('channel',bug1);
	$('#bug2_box #bugAction').attr('channel',bug2);
	$('#dve1_box #tempAction').attr({'channel': dve1});
	$('#dve2_box #tempAction').attr({'channel': dve2});
	$('#dve3_box #tempAction').attr({'channel': dve3});
	$('#dve4_box #tempAction').attr({'channel': dve4});
	$('#score_box #scoreAction').attr({'channel': score});
	$('#obsserver').attr('value',obssrv);
	$('#obsport').attr('value',obsport);
	$('#obspass').attr('value',obspass);
	$('#auxserver').attr('value',auxsrv);
	$('#auxport').attr('value',auxport);
	$('#auxpass').attr('value',auxpass);
	$('#vtr1_box .prev').attr('layer',lvtr1);
	$('#vtr1_box .dev1').attr('layer',lvtr1);
	$('#vtr1_box .dv1').attr('layer',lvtr1);
	$('#vtr1_box .next').attr('layer',lvtr1);
	$('#vtr2_box .prev').attr('layer',lvtr2);
	$('#vtr2_box .dev2').attr('layer',lvtr2);
	$('#vtr2_box .dv2').attr('layer',lvtr2);
	$('#vtr2_box .next').attr('layer',lvtr2);
	$('#bug1_box #bugAction').attr('layer',lbug1);
	$('#bug2_box #bugAction').attr('layer',lbug2);
	$('#dve1_box #tempAction').attr({'layer': ldve1});
	$('#dve2_box #tempAction').attr({'layer': ldve2});
	$('#dve3_box #tempAction').attr({'layer': ldve3});
	$('#dve4_box #tempAction').attr({'layer': ldve4});
	$('#score_box #scoreAction').attr({'layer': lscore});
});

//SIO || OBS CONFIG RECEIVED
socket.on('obsconf',function(a,b,c) {
	obssrv = a;
	$('#obsserver').attr('value',obssrv);
	obsport = b;
	$('#obsport').attr('value',obsport);
	obspass = c;
	$('#obspass').attr('value',obspass);
});

// SIO || AUX CONFIG RECEIVED
socket.on('auxconf',function(a,b,c) {
	auxsrv = a;
	$('#auxserver').attr('value',auxsrv);
	auxport = b;
	$('#auxport').attr('value',auxport);
	auxpass = c;
	$('#auxpass').attr('value',auxpass);
});

// SIO || CCG TEMPLATES CONFIG RECEIVED
socket.on('tempconf',function(z) {
	var tab1 = JSON.parse(z);
	temp1 = tab1[0].tempname;
	temp2 = tab1[1].tempname;
	temp3 = tab1[2].tempname;
	temp4 = tab1[3].tempname;
	temp5 = tab1[4].tempname;
	json1 = tab1[0].json;
	json2 = tab1[1].json;
	json3 = tab1[2].json;
	json4 = tab1[3].json;
	json5 = tab1[4].json;
	$('#CH3temp').html(temp1);
	$('#CH3').html(temp1);
	$('#CH4temp').html(temp2);
	$('#CH4').html(temp2);
	$('#CH5temp').html(temp3);
	$('#CH5').html(temp3);
	$('#CH6temp').html(temp4);
	$('#CH6').html(temp4);
	$('#CH7temp').html(temp5);
	$('#CH7').html(temp5);
	$('#temp1 input').attr('onclick','doCheck("1","'+temp1+'")');
	$('#dve1_box #tempAction').attr({'json': json1});
	$('#dve1_box .play').attr({'tmpl': temp1});
	$('#temp2 input').attr('onclick','doCheck("2","'+temp2+'")');
	$('#dve2_box #tempAction').attr({'json': json2});
	$('#dve2_box .play').attr({'tmpl': temp2});
	$('#temp3 input').attr('onclick','doCheck("3","'+temp3+'")');
	$('#dve3_box #tempAction').attr({'json': json3});
	$('#dve3_box .play').attr({'tmpl': temp3});
	$('#temp4 input').attr('onclick','doCheck("4","'+temp4+'")');
	$('#dve4_box #tempAction').attr({'json': json4});
	$('#dve4_box .play').attr({'tmpl': temp4});
	$('#temp5 input').attr('onclick','doCheck("5","'+temp5+'")');
	$('#score_box #tempAction').attr({'json': json5});
	$('#score_box .play').attr({'tmpl': temp5});
	if (json1=='1'){ $('#temp1 input').prop("checked", true)} else { $('#temp1 input').prop("checked", false)} 
	if (json2=='1'){ $('#temp2 input').prop("checked", true)} else { $('#temp2 input').prop("checked", false)} 
	if (json3=='1'){ $('#temp3 input').prop("checked", true)} else { $('#temp3 input').prop("checked", false)} 
	if (json4=='1'){ $('#temp4 input').prop("checked", true)} else { $('#temp4 input').prop("checked", false)} 
	if (json5=='1'){ $('#temp5 input').prop("checked", true)} else { $('#temp5 input').prop("checked", false)} 
});

// SIO || SCORE DATA RECEIVED
socket.on('scoredata',function(z) {
	var Scdata = JSON.parse(z);console.log(Scdata);
	Gamer1 = Scdata[0].Gamer;
	Score1 = Scdata[0].Score;
	Gamer2 = Scdata[1].Gamer;
	Score2 = Scdata[1].Score;
	Gamer3 = Scdata[2].Gamer;
	Score3 = Scdata[2].Score;
	Gamer4 = Scdata[3].Gamer;
	Score4 = Scdata[3].Score;
	Gamer5 = Scdata[4].Gamer;
	Score5 = Scdata[4].Score;
	Gamer6 = Scdata[5].Gamer;
	Score6 = Scdata[5].Score;
	Gamer7 = Scdata[6].Gamer;
	Score7 = Scdata[6].Score;
	Gamer8 = Scdata[7].Gamer;
	Score8 = Scdata[7].Score;
	Gamer9 = Scdata[8].Gamer;
	Score9 = Scdata[8].Score;
	Gamer10 = Scdata[9].Gamer;
	Score10 = Scdata[9].Score;
	Gamer11 = Scdata[10].Gamer;
	Score11 = Scdata[10].Score;
	Gamer12 = Scdata[11].Gamer;
	Score12 = Scdata[11].Score;
	Gamer13 = Scdata[12].Gamer;
	Score13 = Scdata[12].Score;
	Gamer14 = Scdata[13].Gamer;
	Score14 = Scdata[13].Score;
	Gamer15 = Scdata[14].Gamer;
	Score15 = Scdata[14].Score;
	Gamer16 = Scdata[15].Gamer;
	Score16 = Scdata[15].Score;	
	color1 = Scdata[16].color;
	color2 = Scdata[17].color;
		for (var i = 0; i < 16; i++) {
			j = i + 1;
			$('#gamer'+j).attr('value',Scdata[i].Gamer);			
			$('#score'+j).attr('value',Scdata[i].Score);			
		};
	$('#color1').attr('value',color1);			
	$('#color2').attr('value',color2);			
});

// SIO || STATUS RECEIVED
socket.on('solostatus',function(z) {
	var Truc = JSON.parse(z);
	a =  Truc[0].device; 
	vcr1 = $('#vtr1_box');
	vcr2 = $('#vtr2_box');	
		if (a === device1){	action1 = Truc[0].action;	//VTR1 STATE
								class1 = Truc[0].hclass;
								display1 = Truc[0].display;
								file1 = Truc[0].file;
								thumb1 = Truc[0].thumb;
								loop1 = Truc[0].loop;
								$('#vtr1_box .thumb').attr('src',thumb1);
								$('#vtr1_box .clip').html(file1);
									if (loop1 == 'loop'){
										$('#vtr1_box .loop').addClass('looping');
										$('#vtr1_box .loop').attr('action','loop');
									} else {
										$('#vtr1_box .loop').removeClass('looping');
										$('#vtr1_box .loop').attr('action','');
										}
								$('.dev1').attr('action',action1);
								$('.dev1').attr('class',class1);
								$('button.dev1').html(display1);
							}
		if (a === device2){	action2 = Truc[0].action;	//VTR2 STATE
								class2 = Truc[0].hclass;
								display2 = Truc[0].display;
								file2 = Truc[0].file;
								thumb2 = Truc[0].thumb;
								loop2 = Truc[0].loop;
								$('#vtr2_box .thumb').attr('src',thumb2);
								$('#vtr2_box .clip').html(file2);
									if (loop2 == 'loop'){
										$('#vtr2_box .loop').addClass('looping');
										$('#vtr2_box .loop').attr('action','loop');
									} else {
										$('#vtr2_box .loop').removeClass('looping');
										$('#vtr2_box .loop').attr('action','');
										}
								$('.dev2').attr('action',action2);
								$('.dev2').attr('class',class2);
								$('button.dev2').html(display2);
							}
		if (a === device3){	action3 = Truc[0].action;	//DVE1 STATE
								class3 = Truc[0].hclass;
								display3 = Truc[0].display;
								file3 = Truc[0].file;
								thumb3 = Truc[0].thumb;	
								$('#Temp1Name').html(file3);
								$('#Temp1Title').html(thumb3);
								$('#dve1_box').find('button').attr("Name", file3);
								$('#dve1_box').find('button').attr("Title",thumb3);
								$('#dve1_box .play').attr({'action': action3,'class': class3});
									if (class3.includes("red") == true ){$('#dve1_box_key').addClass('red')} else {$('#dve1_box_key').removeClass('red')};
								$('#dve1_box .play').html(display3);
							}
		if (a === device4){	action4 = Truc[0].action;	//DVE2 STATE
								class4 = Truc[0].hclass;
								display4 = Truc[0].display;
								file4 = Truc[0].file;
								thumb4 = Truc[0].thumb;	
								$('#Temp2Name').html(file4);
								$('#Temp2Title').html(thumb4);
								$('#dve2_box').find('button').attr("Name", file4);
								$('#dve2_box').find('button').attr("Title",thumb4);
								$('#dve2_box .play').attr({'action': action4,'class': class4});
									if (class4.includes("red") == true ){$('#dve2_box_key').addClass('red')} else {$('#dve2_box_key').removeClass('red')};
								$('#dve2_box .play').html(display4);
							}
		if (a === device5){	action5 = Truc[0].action;	//DVE3 STATE
								class5 = Truc[0].hclass;
								display5 = Truc[0].display;
								file5 = Truc[0].file;
								thumb5 = Truc[0].thumb;	
								$('#Temp3Name').html(file5);
								$('#Temp3Title').html(thumb5);
								$('#dve3_box').find('button').attr("Name", file5);
								$('#dve3_box').find('button').attr("Title",thumb5);
								$('#dve3_box .play').attr({'action': action5,'class': class5});
									if (class5.includes("red") == true ){$('#dve3_box_key').addClass('red')} else {$('#dve3_box_key').removeClass('red')};
								$('#dve3_box .play').html(display5);
							}
		if (a === device6){	action6 = Truc[0].action;	//DVE4 STATE
								class6 = Truc[0].hclass;
								display6 = Truc[0].display;
								file6 = Truc[0].file;
								thumb6 = Truc[0].thumb;	
								$('#Temp4Name').html(file6);
								$('#Temp4Title').html(thumb6);
								$('#dve4_box').find('button').attr("Name", file6);
								$('#dve4_box').find('button').attr("Title",thumb6);
								$('#dve4_box .play').attr({'action': action6,'class': class6});
									if (class6.includes("red") == true ){$('#dve4_box_key').addClass('red')} else {$('#dve4_box_key').removeClass('red')};
								$('#dve4_box .play').html(display6);
							}
		if (a === device7){	action7 = Truc[0].action;	//BUG1 STATE
								class7 = Truc[0].hclass;
								display7 = Truc[0].display;
								file7 = Truc[0].file;
								thumb7 = Truc[0].thumb;	
								$('#bug1_box .thumb').attr('src',thumb7);
								$('#bug1_box #bugAction').attr({'action': action7,'class': class7});
									if (class7.includes("red") == true ){$('#bug1_box_key').addClass('red')} else {$('#bug1_box_key').removeClass('red')};
								$('#bug1_box #bugAction').attr('logo',file7);
								$('#bug1_box #bugAction').html(display7);
								$('#bug1_box .thumb').attr('src',thumb7);
								$('#bug1_box .clip').html(file7);
							}
		if (a === device8){	action8 = Truc[0].action;	//BUG2 STATE
								class8 = Truc[0].hclass;
								display8 = Truc[0].display;
								file8 = Truc[0].file;
								thumb8 = Truc[0].thumb;	
								$('#bug2_box .thumb').attr('src',thumb8);
								$('#bug2_box #bugAction').attr({'action': action8,'class': class8});
									if (class8.includes("red") == true ){$('#bug2_box_key').addClass('red')} else {$('#bug2_box_key').removeClass('red')};
								$('#bug2_box #bugAction').attr('logo',file8);
								$('#bug2_box #bugAction').html(display8);
								$('#bug2_box .thumb').attr('src',thumb8);
								$('#bug2_box .clip').html(file8);
							}
		if (a === device9){	aux1_active = Truc[0].action;	//AUX1 STATE
								obsaux_1 = Truc[0].hclass;	
								$('#XkeysSetAux1').find('.Xkeysbut').removeClass('red');
								$('#XkeysSetAux1').find('[scid="'+aux1_active+'"]').addClass('red');
							}
		if (a === device10){	aux2_active = Truc[0].action;	//AUX2 STATE
								obsaux_2 = Truc[0].hclass;
								$('#XkeysSetAux2').find('.Xkeysbut').removeClass('red');
								$('#XkeysSetAux2').find('[scid="'+aux2_active+'"]').addClass('red');
							}
		if (a === device11){	pgm_active = Truc[0].action;	//PGM STATE
								program = Truc[0].hclass;
								$('#XkeysSetPGM').find('.Xkeysbut').removeClass('red');
								$('#XkeysSetPGM').find('[scid="'+pgm_active+'"]').addClass('red');
							}
		if (a === device12){	pvw_active = Truc[0].action;	//PVW STATE
								preview = Truc[0].hclass;
								$('#XkeysSetPVW').find('.Xkeysbut').removeClass('red');
								$('#XkeysSetPVW').find('[scid="'+pvw_active+'"]').addClass('red');
							}
		if (a === device13){	Hplist1 = Truc[0].action;	//PLAYLIST 1 STATE
								CH1index = Number(Truc[0].file);
								CH1index2 = Number(Truc[0].thumb);
			if (Hplist1 == '') {
						vcr1.attr('mode','playlist');
						vcr1.find('.playList').removeClass('hide');
						vcr1.find('.prev').removeClass('hide');
						vcr1.find('.next').removeClass('hide');
						vcr1.find('.empty').removeClass('hide');
						vcr1.find('.red').removeClass('red');
						vcr1.find('.green').removeClass('green');
						vcr1.find('.playList .plist tr').eq(CH1index).addClass('red');
						vcr1.find('.playList .plist tr').eq(CH1index2).addClass('green');		

			}
				else {	vcr1.attr('mode','');
						vcr1.find('.playList').addClass('hide');
						vcr1.find('.prev').addClass('hide');
						vcr1.find('.next').addClass('hide');
						vcr1.find('.empty').addClass('hide');
					}
							}
		if (a === device14){	Hplist2 = Truc[0].action;	//PLAYLIST 2 STATE
								CH2index = Number(Truc[0].file);
								CH2index2 = Number(Truc[0].thumb);
			if (Hplist2 == '') {
						vcr2.attr('mode','playlist');
						vcr2.find('.playList').removeClass('hide');
						vcr2.find('.prev').removeClass('hide');
						vcr2.find('.next').removeClass('hide');
						vcr2.find('.empty').removeClass('hide');
						vcr2.find('.red').removeClass('red');
						vcr2.find('.green').removeClass('green');
						vcr2.find('.playList .plist tr').eq(CH2index).addClass('red');
						vcr2.find('.playList .plist tr').eq(CH2index2).addClass('green');
					}
				else {	vcr2.attr('mode','');
						vcr2.find('.playList').addClass('hide');
						vcr2.find('.prev').addClass('hide');
						vcr2.find('.next').addClass('hide');
						vcr2.find('.empty').addClass('hide');
					}}
		if (a === device15){	action15 = Truc[0].action;	//SCORE STATE
								class15 = Truc[0].hclass;
								display15 = Truc[0].display;
								file15 = Truc[0].file;
								thumb15 = Truc[0].thumb;
								$('#scoreAction.play').attr({'action': action15,'class': class15});
									// if (class15.includes("red") == true ){$('#score_box_key').addClass('red')} else {$('#score_box_key').removeClass('red')};
								$('#scoreAction.play').html(display15);
								// alert($('#score_box').find('.play').html()); 
							}																					
	});


// SIO || STATUS RECEIVED
socket.on('status',function(z) {
	var Truc = JSON.parse(z);
	device1 = Truc[0].device;
	device2 = Truc[1].device;
	device3 = Truc[2].device;
	device4 = Truc[3].device;
	device5 = Truc[4].device;
	device6 = Truc[5].device;
	device7 = Truc[12].device;
	device8 = Truc[13].device;
	device9 = Truc[6].device;
	device10 = Truc[7].device;
	device11 = Truc[8].device;
	device12 = Truc[9].device;
	device13 = Truc[10].device;
	device14 = Truc[11].device;
	device15 = Truc[14].device;
	action1 = Truc[0].action;
	action2 = Truc[1].action;
	action3 = Truc[2].action;
	action4 = Truc[3].action;
	action5 = Truc[4].action;
	action6 = Truc[5].action;
	action7 = Truc[12].action;
	action8 = Truc[13].action;
	action15 = Truc[14].action;
	class1 = Truc[0].hclass;
	class2 = Truc[1].hclass;
	class3 = Truc[2].hclass;
	class4 = Truc[3].hclass;
	class5 = Truc[4].hclass;
	class6 = Truc[5].hclass;
	class7 = Truc[12].hclass;
	class8 = Truc[13].hclass;
	class15 = Truc[14].hclass;
	display1 = Truc[0].display;
	display2 = Truc[1].display;
	display3 = Truc[2].display;
	display4 = Truc[3].display;
	display5 = Truc[4].display;
	display6 = Truc[5].display;
	display7 = Truc[12].display;
	display8 = Truc[13].display;
	display15 = Truc[14].display;
	file1 = Truc[0].file;
	file2 = Truc[1].file;
	file3 = Truc[2].file;
	file4 = Truc[3].file;
	file5 = Truc[4].file;
	file6 = Truc[5].file;
	file7 = Truc[12].file;
	file8 = Truc[13].file;
	file15 = Truc[14].file;
	thumb1 = Truc[0].thumb;
	thumb2 = Truc[1].thumb;
	thumb3 = Truc[2].thumb;
	thumb4 = Truc[3].thumb;
	thumb5 = Truc[4].thumb;
	thumb6 = Truc[5].thumb;
	thumb7 = Truc[12].thumb;
	thumb8 = Truc[13].thumb;
	thumb15 = Truc[14].thumb;
	loop1 = Truc[0].loop;
	loop2 = Truc[1].loop;
	aux1_active = Truc[6].action;
	aux2_active = Truc[7].action;
	pgm_active = Truc[8].action;
	pvw_active = Truc[9].action;	
	Hplist1 = Truc[10].action;	
	Hplist2 = Truc[11].action;			
	CH1index = Number(Truc[10].file);
	CH1index2 = Number(Truc[10].thumb);
	CH2index = Number(Truc[11].file);
	CH2index2 = Number(Truc[11].thumb);
	vcr1 = $('#vtr1_box');
	vcr2 = $('#vtr2_box');	
	if (Hplist1 == '') {
				vcr1.attr('mode','playlist');
				vcr1.find('.playList').removeClass('hide');
				vcr1.find('.prev').removeClass('hide');
				vcr1.find('.next').removeClass('hide');
				vcr1.find('.empty').removeClass('hide');
				vcr1.find('.red').removeClass('red');
				vcr1.find('.green').removeClass('green');
				vcr1.find('.playList .plist tr').eq(CH1index).addClass('red');
				vcr1.find('.playList .plist tr').eq(CH1index2).addClass('green');		
			}
		else {	vcr1.attr('mode','');
				vcr1.find('.playList').addClass('hide');
				vcr1.find('.prev').addClass('hide');
				vcr1.find('.next').addClass('hide');
				vcr1.find('.empty').addClass('hide');
			}
	if (Hplist2 == '') {
				vcr2.attr('mode','playlist');
				vcr2.find('.playList').removeClass('hide');
				vcr2.find('.prev').removeClass('hide');
				vcr2.find('.next').removeClass('hide');
				vcr2.find('.empty').removeClass('hide');
				vcr2.find('.red').removeClass('red');
				vcr2.find('.green').removeClass('green');
				vcr2.find('.playList .plist tr').eq(CH2index).addClass('red');
				vcr2.find('.playList .plist tr').eq(CH2index2).addClass('green');	
			}
		else {	vcr2.attr('mode','');
				vcr2.find('.playList').addClass('hide');
				vcr2.find('.prev').addClass('hide');
				vcr2.find('.next').addClass('hide');
				vcr2.find('.empty').addClass('hide');
			}
			
	$('#vtr1_box .thumb').attr('src',thumb1);
	$('#vtr1_box .clip').html(file1);
		if (loop1 == 'loop'){
			$('#vtr1_box .loop').addClass('looping');
			$('#vtr1_box .loop').attr('action','loop');
		} else {
			$('#vtr1_box .loop').removeClass('looping');
			$('#vtr1_box .loop').attr('action','');
			}
	$('.dev1').attr('action',action1);
	$('.dev1').attr('class',class1);
	$('button.dev1').html(display1);
	
	$('#vtr2_box .thumb').attr('src',thumb2);
	$('#vtr2_box .clip').html(file2);
		if (loop2 == 'loop'){
			$('#vtr2_box .loop').addClass('looping');
			$('#vtr2_box .loop').attr('action','loop');
		} else {
			$('#vtr2_box .loop').removeClass('looping');
			$('#vtr2_box .loop').attr('action','');
			}
	$('.dev2').attr('action',action2);
	$('.dev2').attr('class',class2);
	$('button.dev2').html(display2);
	
	$('#bug1_box').find('#bugAction').attr('action',action7,'class',class7);
	if (class7.includes("red") == true ){$('#bug1_box_key').addClass('red')} else {$('#bug1_box_key').removeClass('red')};
	$('#bug1_box').find('#bugAction').attr('logo',file7);
	$('#bug1_box').find('#bugAction').attr('class',class7);
	$('#bug1_box').find('#bugAction').html(display7);
	$('#bug1_box').find('.thumb').attr('src',thumb7);
	$('#bug1_box').find('.clip').html(file7);
	
	$('#bug2_box').find('#bugAction').attr('action',action8,'class',class8);
	if (class8.includes("red") == true ){$('#bug2_box_key').addClass('red')} else {$('#bug2_box_key').removeClass('red')};
	$('#bug2_box').find('#bugAction').attr('logo',file8);
	$('#bug2_box').find('#bugAction').attr('class',class8);
	$('#bug2_box').find('#bugAction').html(display8);
	$('#bug2_box').find('.thumb').attr('src',thumb8);
	$('#bug2_box').find('.clip').html(file8);
	
	$('#Temp1Name').html(file3);
	$('#Temp1Title').html(thumb3);
	$('#dve1_box').find('button').attr("Name", file3);
	$('#dve1_box').find('button').attr("Title",thumb3);
	$('#dve1_box .play').attr({'action': action3,'class': class3});
	if (class3.includes("red") == true ){$('#dve1_box_key').addClass('red')} else {$('#dve1_box_key').removeClass('red')};
	$('#dve1_box .play').html(display3);
	
	$('#Temp2Name').html(file4);
	$('#Temp2Title').html(thumb4);
	$('#dve2_box').find('button').attr("Name", file4);
	$('#dve2_box').find('button').attr("Title",thumb4);
	$('#dve2_box').find('.play').attr({'action': action4,'class': class4});
	if (class4.includes("red") == true ){$('#dve2_box_key').addClass('red')} else {$('#dve2_box_key').removeClass('red')};
	$('#dve2_box').find('.play').html(display4);
	
	$('#Temp3Name').html(file5);
	$('#Temp3Title').html(thumb5);
	$('#dve3_box').find('button').attr("Name", file5);
	$('#dve3_box').find('button').attr("Title",thumb5);
	$('#dve3_box').find('.play').attr({'action': action5,'class': class5});
	if (class5.includes("red") == true ){$('#dve3_box_key').addClass('red')} else {$('#dve3_box_key').removeClass('red')};
	$('#dve3_box').find('.play').html(display5);
	
	$('#Temp4Name').html(file6);
	$('#Temp4Title').html(thumb6);
	$('#dve4_box').find('button').attr("Name", file6);
	$('#dve4_box').find('button').attr("Title",thumb6);
	$('#dve4_box .play').attr({'action': action6,'class': class6});
	if (class6.includes("red") == true ){$('#dve4_box_key').addClass('red')} else {$('#dve4_box_key').removeClass('red')};
	$('#dve4_box').find('.play').html(display6);
		
	$('#score_box').find('.play').attr({'action': action15,'class': class15});
	if (class15.includes("red") == true ){$('#score_box_key').addClass('red')} else {$('#score_box_key').removeClass('red')};
	$('#score_box').find('.play').html(display15);

	$('#XkeysSetAux1').find('.Xkeysbut').removeClass('red');
	$('#XkeysSetAux1').find('[scid="'+aux1_active+'"]').addClass('red');
	
	$('#XkeysSetAux2').find('.Xkeysbut').removeClass('red');
	$('#XkeysSetAux2').find('[scid="'+aux2_active+'"]').addClass('red');
	
	$('#XkeysSetPGM').find('.Xkeysbut').removeClass('red');
	$('#XkeysSetPGM').find('[scid="'+pgm_active+'"]').addClass('red');
	
	$('#XkeysSetPVW').find('.Xkeysbut').removeClass('red');
	$('#XkeysSetPVW').find('[scid="'+pvw_active+'"]').addClass('red');
});

// SIO || XKEYS CONFIG LIST RECEIVED
socket.on('xkeys',function(xkeys) {
	var xkeysL = JSON.parse(xkeys);
	generateXKEYSTable(xkeysL);
});

// SIO || SAVED TITLES LIST RECEIVED
socket.on('titles',function(titles) {
	var titlesL = JSON.parse(titles);
	generateJSONTable(titlesL,'#TitleList tbody','Title');
});

// SIO || SAVED PLAYLIST LIST RECEIVED
socket.on('playlist',function(a,b) {
	var PlistL = JSON.parse(b);
	if (a == 'plist1') {generateJSONTable(PlistL,'#vtr1_box .playList tbody','TimeCode');}
	if (a == 'plist2') {generateJSONTable(PlistL,'#vtr2_box .playList tbody','TimeCode');}
});


// SIO || OBS SCENES LIST RECEIVED
socket.on('obslist',function(obsList) {
	var obsL = obsList.split(";");
	generateTable(obsL,'#OBSList','obsTab');
});

// SIO || BOXES (VTR & DVE) CLICK RECEIVED 
socket.on('sClick',function(a) {
	var targ = $('#'+a).find('.play');
	targ.click();
});

// SIO || AUX BUTTONS CLICK RECEIVED
socket.on('tClick',function(a) {
	var targ = $('#'+a);
	targ.click();
});

// SIO || TIMING CH1 RECEIVED
socket.on('timing',function(timingReceived) {
    $('#vtr1_box .current h1').html(timingReceived.currentTimeConverted);
  // CLEAR WHEN NO VIDEO IS PRESENT ON CHANNEL
  if(timingReceived.videoPresent == false){
	$('#vtr1_box .current h1').html('00:00:00:00');
	$('#vtr1_box .duration h1').html('00:00:00:00');
	$('#vtr1_box .remaining h1').html('00:00:00:00');
	$('#vtr1_box .progressb').attr('aria-valuenow', '0');
	$('#vtr1_box .progressb').css("width", '0%');  }
  else{
    // UPDATE TEXT
    $('#vtr1_box .current h1').html(timingReceived.currentTimeConverted);
    $('#vtr1_box .duration h1').html(timingReceived.currentDurationConverted);
    $('#vtr1_box .remaining h1').html(timingReceived.currentCountDownConverted);
    // UPDATE PROGRESSBAR
    $('#vtr1_box .progressb').attr('aria-valuenow', timingReceived.currentProgressPercent);
    $('#vtr1_box .progressb').css("width", timingReceived.currentProgressPercent + '%');
	CH1remain = timingReceived.currentCountDown;
	CH1current = timingReceived.currentTime;
		if ( CH1ignit == 1 ){ 
			setTimeout(function(){
				CH1ignit = 0
			}, 100) }
		else {
			if (CH1remain == 0 && $('#vtr1_box').attr('mode') == 'playlist' ){
				$('#vtr1_box .plist').find('.red').removeClass('red');
				$('#vtr1_box .plist').find('.green').removeClass('green');
				e = $('#vtr1_box .plist').find('tr').length; 
					CH1index = CH1index2;
					if (CH1index < e-1){ 
						CH1index2 =  CH1index+1;		// index of n+1 item
					} else {
						CH1index2 =  0;		// index of 1st item
					}
				$('#vtr1_box .plist').find('tr').eq(CH1index).addClass('red');
				$('#vtr1_box .plist').find('tr').eq(CH1index2).addClass('green');
				var video = $('#vtr1_box .plist').find('tr').eq(CH1index).find('td').eq(0).html();
				$('#vtr1_box').find('button').attr("video", video);	
				var thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
				$('#vtr1_box').find('.thumb').attr("src", thumb);
				$('#vtr1_box').find('.clip').html(video);
				}
			if (CH1current == CH1sec && $('#vtr1_box').attr('mode') == 'playlist'){
				var next = $('#vtr1_box .plist').find('tr').eq(CH1index2).find('td').eq(0).html();
				socket.emit('UI|action', {channel: vtr1, layer: lvtr1, action: 'loadbg', file: next });    //Cueing n+1 item	
				CH1ignit = 0
			}
		}
  }
});  

// SIO || TIMING CH2 RECEIVED
socket.on('timing2',function(timing2Received) {   
	$('#vtr2_box .current h1').html(timing2Received.current2TimeConverted);
  // CLEAR WHEN NO VIDEO IS PRESENT ON CHANNEL
  if(timing2Received.video2Present == false){
	$('#vtr2_box .current h1').html('00:00:00:00');
	$('#vtr2_box .duration h1').html('00:00:00:00');
	$('#vtr2_box .remaining h1').html('00:00:00:00');
	$('#vtr2_box .progressb').attr('aria-valuenow', '0');
	$('#vtr2_box .progressb').css("width", '0%');  }  
  else{
    // UPDATE TEXT
    $('#vtr2_box .current h1').html(timing2Received.current2TimeConverted);
    $('#vtr2_box .duration h1').html(timing2Received.current2DurationConverted);
    $('#vtr2_box .remaining h1').html(timing2Received.current2CountDownConverted);

    // UPDATE PROGRESSBAR
    $('#vtr2_box .progressb').attr('aria-valuenow', timing2Received.current2ProgressPercent);
    $('#vtr2_box .progressb').css("width", timing2Received.current2ProgressPercent + '%');
	CH2remain = timing2Received.current2CountDown;
	CH2current = timing2Received.current2Time;
		if ( CH2ignit == 1 ){ 
			setTimeout(function(){
				CH2ignit = 0
			}, 100) }
		else {
			if (CH2remain == 0 && $('#vtr2_box').attr('mode') == 'playlist' ){
				$('#vtr2_box .plist').find('.red').removeClass('red');
				$('#vtr2_box .plist').find('.green').removeClass('green');
				e = $('#vtr2_box .plist').find('tr').length; 
					CH2index = CH2index2;
					if (CH2index < e-1){ 
						CH2index2 =  CH2index+1;		// index of n+1 item
					} else {
						CH2index2 =  0;		// index of 1st item
					}
				$('#vtr2_box .plist').find('tr').eq(CH2index).addClass('red');
				$('#vtr2_box .plist').find('tr').eq(CH2index2).addClass('green');
				var video = $('#vtr2_box .plist').find('tr').eq(CH2index).find('td').eq(0).html();
				$('#vtr2_box').find('button').attr("video", video);	
				var thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
				$('#vtr2_box').find('.thumb').attr("src", thumb);
				$('#vtr2_box').find('.clip').html(video);
				}
			if (CH2current == CH2sec && $('#vtr2_box').attr('mode') == 'playlist'){
				var next = $('#vtr2_box .plist').find('tr').eq(CH2index2).find('td').eq(0).html();
				socket.emit('UI|action', {channel: vtr2, layer: lvtr2, action: 'loadbg', file: next });    //Cueing n+1 item	
				CH2ignit = 0
			}
		}
  }
});  
	
function generateJSONTable(data,dest,col){
	$(dest).empty();
	if (col == 'TimeCode'){
			$.each(data, function(index, item) {
				var $tr = $('<tr draggable="true">').append(
				$('<td>').text(item.name),
				$('<td>').text(item.timecode),
				$('<td class="hide">').text(item.duration),
				$('<td onclick="dePLine(this)"><i class="fas fa-trash"></i>')).appendTo(dest); });}
				else {
	$.each(data, function(index, item) {//index is the index & item is the field
        if (col == 'Address'){
			var $tr = $('<tr class="event" name="'+item.name+'" addr="'+item.urlAddress+'" draggable="true">').append(
            $('<td>').text(item.name),
            $('<td>').text(item.urlAddress)).appendTo(dest); } 
		else if (col == 'Title'){
			var $tr = $('<tr ondblclick="doThat(&#039;'+item.Name+'&#039;,&#039;'+item.Title+'&#039;)" class="event" name="'+item.Name+'"  title="'+item.Title+'" draggable="true">').append(
            $('<td>').text(item.Name),
            $('<td>').text(item.Title),
            $('<td class="icons" onclick="upLine(this)"><i class="fas fa-pen"></i>'),
            $('<td class="icons" onclick="deLine(this)"><i class="fas fa-trash"></i>')).appendTo(dest); } 	
    });
	}}
	
function generateXKEYSTable(data){
	//LINE1 KEYBOARD LINE CONFIG
	$('#XkeysLine1 tr').html('<td class="head"><h2>LINE 1</h2></td>');
	var Line1data = [];
	for (i = 0; i < 73; i=i+8){ Line1data.push(data[i]);}
		$.each(Line1data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine1 tr');
		});
	$('#xkeys64').addClass('dveclass');
	$('#xkeys72').addClass('dveclass');
	
	//LINE2 KEYBOARD LINE CONFIG
	$('#XkeysLine2 tr').html('<td class="head"><h2>LINE 2</h2></td>');
	var Line2data = [];
	for (i = 1; i < 74; i=i+8){ Line2data.push(data[i]);}
		$.each(Line2data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine2 tr');
		});
	$('#xkeys65').addClass('dveclass');
	$('#xkeys73').addClass('dveclass');
	
	//LINE3 KEYBOARD LINE CONFIG
	$('#XkeysLine3 tr').html('<td class="head"><h2>LINE 3</h2></td>');
	var Line3data = [];
	for (i = 2; i < 75; i=i+8){ Line3data.push(data[i]);}
		$.each(Line3data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine3 tr');
		});
	$('#xkeys66').addClass('dveclass');
	$('#xkeys74').addClass('dveclass');
	
	//LINE4 KEYBOARD LINE CONFIG
	$('#XkeysLine4 tr').html('<td class="head"><h2>LINE 4</h2></td>');
	var Line4data = [];
	for (i = 3; i < 60; i=i+8){ Line4data.push(data[i]);}
		$.each(Line4data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine4 tr');
		});
	$('#XkeysLine4 tr').append('<td class="nondrop"><div class="XkeysAction dveclass" id="bug1_box_key" name="bug1"><h2 class="sTemp Xbut">68</h2><div>BUG 1</div></div></td><td class="nondrop"><div class="XkeysAction dveclass" id="bug2_box_key" name="bug2"><h2 class="sTemp Xbut">76</h2><div>BUG 2</div></div></td>');
	
	//AUX1 KEYBOARD LINE CONFIG
	$('#XkeysSetAux1 tr').html('<td class="head"><h2>AUX 1</h2></td>');
	var Aux1data = [];
	for (i = 4; i < 61; i=i+8){ Aux1data.push(data[i]);}
		$.each(Aux1data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetAux1 tr');
		});
	$('#XkeysSetAux1 tr').append('<td class="nondrop"><div class="XkeysAction dveclass" id="dve1_box_key" name="dve1"><h2 class="sTemp Xbut">69</h2><div>DVE 1</div></div></td><td class="nondrop"><div class="XkeysAction dveclass" id="dve2_box_key" name="dve2"><h2 class="sTemp Xbut">77</h2><div>DVE 2</div></div></td>');
	
	//AUX2 KEYBOARD LINE CONFIG
	$('#XkeysSetAux2 tr').html('<td class="head"><h2>AUX 2</h2></td>');
	var Aux2data = [];
	for (i = 5; i < 62; i=i+8){ Aux2data.push(data[i]);}
		$.each(Aux2data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux2" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetAux2 tr');
		});
	$('#XkeysSetAux2 tr').append('<td class="nondrop"><div class="XkeysAction dveclass" id="dve3_box_key" name="dve3"><h2 class="sTemp Xbut">70</h2><div>DVE 3</div></div></td><td class="nondrop"><div class="XkeysAction dveclass" id="dve4_box_key" name="dve4"><h2 class="sTemp Xbut">78</h2><div>DVE 4</div></div></td>');
	
	//PGM KEYBOARD LINE CONFIG
	$('#XkeysSetPGM tr').html('<td class="head"><h2>PGM</h2></td>');
	var PGMdata = [];
	for (i = 6; i < 63; i=i+8){ PGMdata.push(data[i]);}
		$.each(PGMdata, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut pgm" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetPGM tr');
		});
	$('#XkeysSetPGM tr').append('<td class="nondrop"><div class="XkeysAction AutoButton"><h2 class="sTemp Xbut">71 - 79</h2><div>AUTO</div></div></td>');
	
	//PVW KEYBOARD LINE CONFIG
	$('#XkeysSetPVW tr').html('<td class="head"><h2>PVW</h2></td>');
	var PVWdata = [];
	for (i = 7; i < 64; i=i+8){ PVWdata.push(data[i]);}
		$.each(PVWdata, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut pvw" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetPVW tr');
		});
	$('#XkeysSetPVW tr').append('<td class="nondrop"><div class="XkeysAction CutButton"><h2 class="sTemp Xbut">72 - 80</h2><div>CUT</div></div></td>');
	
}
	
function timeCode(a) {
	var dur = a
	, TC
	, hours = parseInt(dur/3600)
	, minutes = parseInt(60*((dur/3600)- hours))
	, seconds = parseInt(60*((60*((dur/3600)- hours))- minutes))
	, frames = parseInt(25*((60*((60*((dur/3600)- hours))- minutes))- seconds))
	frames = (frames < 10) ? "0" + frames : frames;
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return TC = hours + ":" + minutes + ":" + seconds + ":" + frames;
}

function generateTable(data,dest,type) {
    var html = '<table id='+type+' width="100%"><tr><th>Name</th>';
	if (type == 'VidTab') {
		html += '<th>Duration</th></tr>\r\n';}
	if (type == 'ndiTab') {
		html += '<th>Address</th></tr>\r\n';}
	if (type == 'ImgTab') {
		html += '</tr>\r\n';}
	if (type == 'tempTab') {
		html += '</tr>\r\n';}
    if (typeof (data[0]) === 'undefined') {
        return null;
    }
    if (data[0].constructor === String) {
		for (var item in data) {
            if (type == 'obsTab') {html += '<tr><td class="event" id="'+data[item]+'" draggable="true">' + data[item] + '</td></tr>\r\n';}
			else {html += '<tr ondblclick="doThis(&#039;'+type+'&#039;,&#039;'+data[item]+'&#039;);"><td class="event" id="'+data[item]+'" draggable="true">' + data[item] + '</td></tr>\r\n';}
			}
		}
	    if (data[0].constructor === Array) {
        for (var row in data) {
            html += '<tr ondblclick="doThis(&#039;'+type+'&#039;,&#039;'+data[row][0]+'&#039;);"><td class="event" id="'+data[row][0]+'" draggable="true">' + data[row][0] + '</td>\r\n';
			if (type == 'VidTab') {
				var MediaFrs = data[row][3].replace('\r\n','');
				var durSec = Number(data[row][2]) * eval(MediaFrs);
				var TC = timeCode(durSec);
				html += '<td class="hide" id="dur_'+data[row][0]+'">' + durSec + '</td><td>' +TC+'</td>\r\n';
				}
				html += '</tr>\r\n';
        }
    }  
	html += '</table>\r\n';
	    $(dest).html(html); 
}

// Titles Drag & drop
$(document).ready(function () {
	$('#TitleList').on("dragstart", '.event', function (event) {
        var Tt = event.originalEvent.dataTransfer;
		var tName = $(this).attr('name');
		var tTitle = $(this).attr('title');
		var tIndex = $(this).index();
		var oldPpos = event.clientY;
		Tt.setData('Name', tName);
		Tt.setData('Title', tTitle);
		Tt.setData('Index', tIndex);
		Tt.setData('oldPpos', oldPpos);
		});
	
    $('#dve1_box').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
 		$('#Temp1Name').empty();
 		$('#Temp1Title').empty();
           var Ndata = event.originalEvent.dataTransfer.getData('Name');
           var Tdata = event.originalEvent.dataTransfer.getData('Title');
			$('#dve1_box').find('button').attr("Name", Ndata);
			$('#dve1_box').find('button').attr("Title",Tdata);
			$('#Temp1Name').html(Ndata);
			$('#Temp1Title').html(Tdata);
			var butDVE1 = $('#dve1_box').find('.play');
			content = butDVE1.html();
			content = content.replace(/'/g, "\\'");		
			state = butDVE1.attr('action');
			divclass = butDVE1.attr('class');
			socket.emit('UI|action', {action: 'saveState', device: 'dve1_box', display: content, file: Ndata, state: state, thumb: Tdata, divclass: divclass});
			/**if ($('#3').prop("checked") == true) {
				var data = '{\"f0\":\"'+Ndata+'\",\"f1\":\"'+Tdata+'\"}';
			} else {
				var data = '<templateData><componentData id=\"f0\"><data id=\"text\" value=\"'+Ndata+'\"/></componentData><componentData id=\"f1\"><data id=\"text\" value=\"'+Tdata+'\"/></componentData></templateData>' };
			var template = document.getElementById('CH3').innerHTML;
		socket.emit('UI|action', {action: 'cg1' , template: template , data: data});
		$("button[action='cg1']").attr('action','nocg1');
		var htmlS = '<i class="fas fa-eject"></i> Off Air';
		$("button[action='cg1']").text( htmlS );     // Si on souhaite que le drag & drop lance directement le temp ou on attend un on air (pour la fct update) **/
		};
    });
	
	$('#dve2_box').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
 		$('#Temp2Name').empty();
 		$('#Temp2Title').empty();
           var Ndata = event.originalEvent.dataTransfer.getData('Name');
           var Tdata = event.originalEvent.dataTransfer.getData('Title');
			$('#dve2_box').find('button').attr("Name", Ndata);
			$('#dve2_box').find('button').attr("Title",Tdata);
			$('#Temp2Name').html(Ndata);
			$('#Temp2Title').html(Tdata);
			var butDVE2 = $('#dve2_box').find('.play');
			content = butDVE2.html();
			content = content.replace(/'/g, "\\'");		
			state = butDVE2.attr('action');
			divclass = butDVE2.attr('class');
			socket.emit('UI|action', {action: 'saveState', device: 'dve2_box', display: content, file: Ndata, state: state, thumb: Tdata, divclass: divclass});
		/**	if ($('#4').prop("checked") == true) {
				var data = '{\"f0\":\"'+Ndata+'\",\"f1\":\"'+Tdata+'\"}';
			} else {
				var data = '<templateData><componentData id=\"f0\"><data id=\"text\" value=\"'+Ndata+'\"/></componentData><componentData id=\"f1\"><data id=\"text\" value=\"'+Tdata+'\"/></componentData></templateData>' };
			var template = document.getElementById('CH4').innerHTML;
		socket.emit('UI|action', {action: 'cg2' , template: template , data: data});
		var butCG2 = $("button[action='cg2']")
		butCG2.attr('action','nocg2');
		var htmlS = '<i class="fas fa-eject"></i> Off Air';
		butCG2.html( htmlS );     // Si on souhaite que le drag & drop lance directement le temp ou on attend un on air (pour la fct update) **/
		};
    });
	
	$('#dve3_box').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
 		$('#Temp3Name').empty();
 		$('#Temp3Title').empty();
           var Ndata = event.originalEvent.dataTransfer.getData('Name');
           var Tdata = event.originalEvent.dataTransfer.getData('Title');
			$('#dve3_box').find('button').attr("Name", Ndata);
			$('#dve3_box').find('button').attr("Title",Tdata);
			$('#Temp3Name').html(Ndata);
			$('#Temp3Title').html(Tdata);
			var butDVE3 = $('#dve3_box').find('.play');
			content = butDVE3.html();
			content = content.replace(/'/g, "\\'");		
			state = butDVE3.attr('action');
			divclass = butDVE3.attr('class');
			socket.emit('UI|action', {action: 'saveState', device: 'dve3_box', display: content, file: Ndata, state: state, thumb: Tdata, divclass: divclass});
		};
    });
	
	$('#dve4_box').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
 		$('#Temp4Name').empty();
 		$('#Temp4Title').empty();
           var Ndata = event.originalEvent.dataTransfer.getData('Name');
           var Tdata = event.originalEvent.dataTransfer.getData('Title');
			$('#dve4_box').find('button').attr("Name", Ndata);
			$('#dve4_box').find('button').attr("Title",Tdata);
			$('#Temp4Name').html(Ndata);
			$('#Temp4Title').html(Tdata);
			var butDVE4 = $('#dve4_box').find('.play');
			content = butDVE4.html();
			content = content.replace(/'/g, "\\'");		
			state = butDVE4.attr('action');
			divclass = butDVE4.attr('class');
			socket.emit('UI|action', {action: 'saveState', device: 'dve4_box', display: content, file: Ndata, state: state, thumb: Tdata, divclass: divclass});
		};
    });
			
	$('#TitleList tbody').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			var Ndata = event.originalEvent.dataTransfer.getData('Name');
			var Tdata = event.originalEvent.dataTransfer.getData('Title');
			var tIndex = event.originalEvent.dataTransfer.getData('Index');
			var oldPpos = event.originalEvent.dataTransfer.getData('oldPpos');
			var Newpos = event.clientY;
			var newIndex = parseInt(tIndex) + Math.round((Newpos - oldPpos)/16.39);
		   $('#TitleList tbody').find('tr').eq(tIndex).remove();
				var titleTab = [];
				var object;
					for (var i = 1; i < newIndex+1; i++) {
						object = {};
						object["Name"] = $("#TitleList").find('tr').eq(i).find('td').eq(0).html();
						object["Title"] = $("#TitleList").find('tr').eq(i).find('td').eq(1).html();
						titleTab.push(object);
					} 
				object = {};
				object["Name"] = Ndata;
				object["Title"] = Tdata;
				titleTab.push(object);
					for (var i = newIndex+1; i < $('#TitleList tr').length; i++) {
						object = {};
						object["Name"] = $("#TitleList").find('tr').eq(i).find('td').eq(0).html();
						object["Title"] = $("#TitleList").find('tr').eq(i).find('td').eq(1).html();
						titleTab.push(object);
					} 				
				socket.emit('UI|action', {action: 'saveTitle', title: titleTab}); console.log(titleTab);
		};
    });
		
	});
		
// Medias Drag & drop
$(document).ready(function () {
	$('#VideoList').on("dragstart", '.event', function (event) {
		var durdiv = '#dur_'+$(this).html();
		var dur = $(durdiv).html();
        var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).html());
		dt.setData('dur', dur);
		dt.setData('type', "video");   
		});
	
	$('.thumb').on('dragstart', function(event) { event.preventDefault(); });
   
	$('#vtr1_box .card-body').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#vtr1_box .clip').empty();
			var video = event.originalEvent.dataTransfer.getData('Text');
			var butVTR1 = $('#vtr1_box').find('.play');
			var channel = butVTR1.attr('channel');
			var layer = butVTR1.attr('layer');
			$('#vtr1_box .clip').html(video);
			$('#vtr1_box').find('button').attr("video", video);	
			socket.emit('UI|action', {action: 'load' , channel: channel, layer: layer, file: video , options: loop1});  	
					charger(video,'#vtr1_box .thumb');
					butVTR1.attr('action','resume');
					butVTR1.html('<i class="fas fa-play"></i> Ready');
					butVTR1.addClass('cligno');
					content = butVTR1.html();
					content = content.replace(/'/g, "\\'");			
					state = butVTR1.attr('action');
					divclass = butVTR1.attr('class');
					thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
					socket.emit('UI|action', {action: 'saveState', device: 'vtr1_box', display: content, file: video, state: state, thumb: thumb, divclass: divclass, loop: loop1});};
    });
	
	$('#vtr2_box .card-body').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#vtr2_box .clip').empty();
			var video = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			var butVTR2 = $('#vtr2_box').find('.play');
			var channel = butVTR2.attr('channel');
			var layer = butVTR2.attr('layer');
			$('#vtr2_box .clip').html(video);
			$('#vtr2_box').find('button').attr("video", video);
			socket.emit('UI|action', {action: 'load' , channel: channel, layer: layer, file: video , options: loop2});  	
					charger(video,'#vtr2_box .thumb');
					butVTR2.attr('action','resume');
					butVTR2.html('<i class="fas fa-play"></i> Ready'); 
					content = butVTR2.html();
					content = content.replace(/'/g, "\\'");
					butVTR2.addClass('cligno');		
					state = butVTR2.attr('action');
					divclass = butVTR2.attr('class');
					thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
					socket.emit('UI|action', {action: 'saveState', device: 'vtr2_box', display: content, file: video, state: state, thumb: thumb, divclass: divclass, loop: loop2});};
    });
	
		$('#vtr1_box .playList').on("dragenter dragover drop", function (event) {
			event.preventDefault();
				if (event.type === 'drop') {
					var video = event.originalEvent.dataTransfer.getData('Text');
					var dur = event.originalEvent.dataTransfer.getData('dur');			
					var TC = timeCode(dur);
					var html = '<tr><td>'+video+'</td><td>'+TC+'</td><td class="hide">'+dur+'</td></tr>';
					$('#vtr1_box .playList tbody').append(html);
					///// SAVE PLIST1 to DB
						var plistTab = [];
							for (var i = 1; i <= $('#vtr1_box .playList tbody tr').length; i++) {
								var object = {};
								object["name"] = $("#vtr1_box .playList").find('tr').eq(i).find('td').eq(0).html();
								object["timecode"] = $("#vtr1_box .playList").find('tr').eq(i).find('td').eq(1).html();
								object["duration"] = $("#vtr1_box .playList").find('tr').eq(i).find('td').eq(2).html();
								plistTab.push(object);
							}
						socket.emit('UI|action', {action: 'savePlist', plist: 'plist1', plistTab: plistTab});
				}
		});	
		
		$('#vtr2_box .playList').on("dragenter dragover drop", function (event) {
			event.preventDefault();
        if (event.type === 'drop') {
			var video = event.originalEvent.dataTransfer.getData('Text');
            var dur = event.originalEvent.dataTransfer.getData('dur');			
			var TC = timeCode(dur);
			var html = '<tr><td>'+video+'</td><td>'+TC+'</td><td class="hide">'+dur+'</td></tr>';
			$('#vtr2_box .playList tbody').append(html);
			///// SAVE PLIST2 to DB
						var plistTab = [];
							for (var i = 1; i <= $('#vtr2_box .playList tbody tr').length; i++) {
								var object = {};
								object["name"] = $("#vtr2_box .playList").find('tr').eq(i).find('td').eq(0).html();
								object["timecode"] = $("#vtr2_box .playList").find('tr').eq(i).find('td').eq(1).html();
								object["duration"] = $("#vtr2_box .playList").find('tr').eq(i).find('td').eq(2).html();
								plistTab.push(object);
							}
						socket.emit('UI|action', {action: 'savePlist', plist: 'plist2', plistTab: plistTab});
				}
		});	
});
		
// BUG Drag & drop
$(document).ready(function () {
	$('#ImgList').on("dragstart", '.event', function (event) {
        var dt = event.originalEvent.dataTransfer;
        dt.setData('Text', $(this).html());
		dt.setData('type', "img");
    });
	
	//$('.thumb').on('dragstart', function(event) { event.preventDefault(); });
   
	$('#bug1_box .card-bug').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#bug1_box .clip').empty();
			var logo = event.originalEvent.dataTransfer.getData('Text');
			var thumb = '/'+logo+'.png';
			var butBUG1 = $('#bug1_box').find('.play');
			var channel = butBUG1.attr('channel');
			var layer = butBUG1.attr('layer');
			$('#bug1_box .clip').html(logo);
			socket.emit('UI|action', {action: 'load' , channel: channel, layer: layer, file: logo , options: ''});  	
			butBUG1.attr("logo", logo);	
			butBUG1.attr('action','nobug');
			butBUG1.html('<i class="fas fa-eject"></i> Off Air'); 
			content = butBUG1.html();
			content = content.replace(/'/g, "\\'");			
			butBUG1.addClass('red');
			state = butBUG1.attr('action');
			divclass = butBUG1.attr('class');
			socket.emit('UI|action', {action: 'saveState', device: 'bug1_box', display: content, file: logo, state: state, thumb: thumb, divclass: divclass, loop: ''});
        };});
		 
	$('#bug2_box .card-bug').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#bug2_box .clip').empty();
			var logo = event.originalEvent.dataTransfer.getData('Text');
			var thumb = '/'+logo+'.png';
			var butBUG2 = $('#bug2_box').find('.play');
			var channel = butBUG2.attr('channel');
			var layer = butBUG2.attr('layer');
			$('#bug2_box .clip').html(logo);
			socket.emit('UI|action', {action: 'load' , channel: channel, layer: layer, file: logo , options: ''});  	
			butBUG2.attr("logo", logo);	
			butBUG2.attr('action','nobug');
			butBUG2.html('<i class="fas fa-eject"></i> Off Air'); 
			content = butBUG2.html();
			content = content.replace(/'/g, "\\'");			
			butBUG2.addClass('red');
			state = butBUG2.attr('action');
			divclass = butBUG2.attr('class');
			socket.emit('UI|action', {action: 'saveState', device: 'bug2_box', display: content, file: logo, state: state, thumb: thumb, divclass: divclass, loop: ''});
        };});
});

//SORT PLAYLIST 1
	$("#vtr1_box .playList tbody").sortable({
		axis: 'y',
		update: function (event, ui) {
			if( $(this).hasClass('ui-sortable') ) { 
				var plistTab = [];
					for (var i = 1; i <= $('#vtr1_box .playList tbody tr').length; i++) {
						var object = {};
						object["name"] = $("#vtr1_box .playList").find('tr').eq(i).find('td').eq(0).html();
						object["timecode"] = $("#vtr1_box .playList").find('tr').eq(i).find('td').eq(1).html();
						object["duration"] = $("#vtr1_box .playList").find('tr').eq(i).find('td').eq(2).html();
						plistTab.push(object);
					}
				socket.emit('UI|action', {action: 'savePlist', plist: 'plist1', plistTab: plistTab});
			}}    
	});

//SORT PLAYLIST 1
	$("#vtr2_box .playList tbody").sortable({
		axis: 'y',
		update: function (event, ui) {
			if( $(this).hasClass('ui-sortable') ) { 
				var plistTab = [];
					for (var i = 1; i <= $('#vtr2_box .playList tbody tr').length; i++) {
						var object = {};
						object["name"] = $("#vtr2_box .playList").find('tr').eq(i).find('td').eq(0).html();
						object["timecode"] = $("#vtr2_box .playList").find('tr').eq(i).find('td').eq(1).html();
						object["duration"] = $("#vtr2_box .playList").find('tr').eq(i).find('td').eq(2).html();
						plistTab.push(object);
					}
				socket.emit('UI|action', {action: 'savePlist', plist: 'plist2', plistTab: plistTab});
			}}    
	});

// Templates Drag & drop
$(document).ready(function () {
	$('#tempList').on("dragstart", '.event', function (event) {
        var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).html());
		});
	
    $('#temp1').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#CH3temp').empty();
			$('#CH3').empty();
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$('#CH3temp').html(tempName);	
			$('#CH3').html(tempName);	
			$('#dve1_box').find('.play').attr('tmpl',tempName);
			if ($('#1').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};
			$('#temp1 input').attr('onclick','doCheck("1","'+tempName+'")');	// Save to MongoDB	
			socket.emit('UI|action', {action: 'saveTemplate', channel: '1', tempname: tempName, json: check});
		};	});

	    $('#temp2').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#CH4temp').empty();
			$('#CH4').empty();
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$('#CH4temp').html(tempName);								
			$('#CH4').html(tempName);								
			$('#dve2_box').find('.play').attr('tmpl',tempName);	
			if ($('#2').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};
			$('#temp2 input').attr('onclick','doCheck("2","'+tempName+'")');	// Save to MongoDB
			socket.emit('UI|action', {action: 'saveTemplate', channel: '2', tempname: tempName, json: check});
		};	});
		
	    $('#temp3').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#CH5temp').empty();
			$('#CH5').empty();
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$('#CH5temp').html(tempName);								
			$('#CH5').html(tempName);								
			$('#dve3_box').find('.play').attr('tmpl',tempName);
			if ($('#3').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};		
			$('#temp3 input').attr('onclick','doCheck("3","'+tempName+'")');	// Save to MongoDB
			socket.emit('UI|action', {action: 'saveTemplate', channel: '3', tempname: tempName, json: check});
		};	});
		
	    $('#temp4').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#CH6temp').empty();
			$('#CH6').empty();
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$('#CH6temp').html(tempName);								
			$('#CH6').html(tempName);								
			$('#dve4_box').find('.play').attr('tmpl',tempName);	
			if ($('#4').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};		
			$('#temp4 input').attr('onclick','doCheck("4","'+tempName+'")');	// Save to MongoDB
			socket.emit('UI|action', {action: 'saveTemplate', channel: '4', tempname: tempName, json: check});
		};	});
				
	    $('#temp5').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#CH7temp').empty();
			$('#CH7').empty();
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$('#CH7temp').html(tempName);								
			$('#CH7').html(tempName);								
			$('#score_box').find('.play').attr('tmpl',tempName);	
			if ($('#5').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};		
			$('#temp5 input').attr('onclick','doCheck("5","'+tempName+'")');	// Save to MongoDB
			socket.emit('UI|action', {action: 'saveTemplate', channel: '5', tempname: tempName, json: check});
		};	});
});
	


// OBS Scenes Drag & drop to Xkeys buttons
$(document).ready(function () {
	$('#OBSList').on("dragstart", '.event', function (event) {
        var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).html());
		});
    $('#XkeysSetAux1').on("dragenter dragover drop",'td', function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$(this).attr('scene',sceneName);
			var xkID = $(this).attr('xkeysid');
			var target = $(this).find('.Xkeysbut div');
			$(this).find('.Xkeysbut').attr('scname',sceneName);
			var xkeycode = $(this).find('.Xkeysbut').attr('scid');
			target.html(sceneName);
			socket.emit('UI|action', {action: 'configUP' , arg1: xkeycode, arg2: sceneName});     
};	});		
    $('#XkeysSetAux2').on("dragenter dragover drop",'td', function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$(this).attr('scene',sceneName);
			var xkID = $(this).attr('xkeysid');
			var target = $(this).find('.Xkeysbut div');
			$(this).find('.Xkeysbut').attr('ScName',sceneName);
			var xkeycode = $(this).find('.Xkeysbut').attr('scid');
			target.html(sceneName);
			socket.emit('UI|action', {action: 'configUP' , arg1: xkeycode, arg2: sceneName});     
};	});	
    $('#XkeysSetPGM').on("dragenter dragover drop",'td', function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$(this).attr('scene',sceneName);
			var xkID = $(this).attr('xkeysid');
			var target = $(this).find('.Xkeysbut div');
			$(this).find('.Xkeysbut').attr('ScName',sceneName);
			var xkeycode = $(this).find('.Xkeysbut').attr('scid');
			target.html(sceneName);
			socket.emit('UI|action', {action: 'configUP' , arg1: xkeycode, arg2: sceneName});   
};	});
    $('#XkeysSetPVW').on("dragenter dragover drop",'td', function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).html());
			$(this).attr('scene',sceneName);
			var xkID = $(this).attr('xkeysid');
			var target = $(this).find('.Xkeysbut div');
			$(this).find('.Xkeysbut').attr('ScName',sceneName);
			var xkeycode = $(this).find('.Xkeysbut').attr('scid');
			target.html(sceneName);
			socket.emit('UI|action', {action: 'configUP' , arg1: xkeycode, arg2: sceneName});   
};	});

	  
});
	
// UI Json option for CCG template selection
function doCheck(e,f) {
		if ($('#'+e).prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};
			$('#dve'+e+'_box').find('button').attr('json',check);
			// Save to MongoDB	
			socket.emit('UI|action', {action: 'saveTemplate', channel: e, tempname: f, json: check});
		}																

//charger thumbnail
function charger(a,b) {
	$(b).attr("src",'http://'+cgsrv+':'+cgscan+'/db/_media/'+a+'/thumb.png');
	}

// UI Action double Click
function doThis(e,f) {
	if (e == 'VidTab') {
		var butVTR1 = $('#vtr1_box').find('.play');
		var channel = butVTR1.attr('channel');
		var layer = butVTR1.attr('layer');
		butVTR1.attr('action','resume');
		butVTR1.html('<i class="fas fa-play"></i> Ready'); 
		butVTR1.addClass('cligno');
		var player =  butVTR1.closest('.card');
		socket.emit('UI|action', {action: 'load' , channel: channel, layer: layer, file: f , options: loop1});  	
		$('#vtr1_box .clip').html(f);
		$('#vtr1_box').find('button').attr("video", f);	
		charger(f,'#vtr1_box .thumb');
		content = butVTR1.html();
		content = content.replace(/'/g, "\\'");		
		state = butVTR1.attr('action');
		divclass = butVTR1.attr('class');
		thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+f+'/thumb.png';   // Save to MongoDB	
		socket.emit('UI|action', {action: 'saveState', device: 'vtr1_box', display: content, file: f, state: state, thumb: thumb, divclass: divclass, loop: loop1});				

	};

	if (e == 'tempTab') {
		$('#CH3temp').html(f);
		$('#CH3').html(f);
		var channel = $('#dve1').find(":selected").html();
		var layer = $('#ldve1').find(":selected").html();
		$('#CH3temp').html(f);	
		$('#CH3').html(f);	
		$('#dve1_box').find('.play').attr('tmpl',f);
		if ($('#3').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};
			$('#temp1 input').attr('onclick','doCheck("1","'+f+'")');	// Save to MongoDB	
			socket.emit('UI|action', {action: 'saveTemplate', channel: channel, layer: layer, tempname: f, json: check});
	};	
												
	if (e == 'ImgTab') {
		var butBUG1 = $('#bug1_box').find('.play');
		var channel = butBUG1.attr('channel');
		var layer = butBUG1.attr('layer');
		var player =  butBUG1.closest('.card');
		var thumb = '/'+f+'.png';
		$('#bug1_box .clip').html(f);
		//$('#vtr2_box .thumb').attr("src",thumb);
		socket.emit('UI|action', {action: 'load' , channel: channel, layer: layer, file: f , options: ''});  	
		butBUG1.attr('action','nobug');
		butBUG1.attr('logo',f);
		butBUG1.html('<i class="fas fa-eject"></i> Off Air'); 
		butBUG1.addClass('red');
		content = butBUG1.html();
		content = content.replace(/'/g, "\\'");		
		state = butBUG1.attr('action');
		divclass = butBUG1.attr('class');
		socket.emit('UI|action', {action: 'saveState', device: 'bug1_box', display: content, file: f, state: state, thumb: thumb, divclass: divclass, loop: loop2});
	};
};

function doThat(e,f) {	
		var butDVE1 = $('#dve1_box').find('.play');
		$('#dve1_box').find('button').attr("Name", e);
		$('#dve1_box').find('button').attr("Title",f);
		$('#Temp1Name').html(e);
		$('#Temp1Title').html(f);
		channel = butDVE1.attr('channel');
		var layer = butDVE1.attr('layer');
		content = butDVE1.html();
		content = content.replace(/'/g, "\\'");		
		state = butDVE1.attr('action');
		divclass = butDVE1.attr('class');
		if ($('#3').prop("checked") == true) {
		var data = '{\"f0\":\"'+e+'\",\"f1\":\"'+f+'\"}';
		} else {
		var data = '<templateData><componentData id=\"f0\"><data id=\"text\" value=\"'+e+'\"/></componentData><componentData id=\"f1\"><data id=\"text\" value=\"'+f+'\"/></componentData></templateData>' };
		var template = document.getElementById('CH3').innerHTML;
		socket.emit('UI|action', {action: 'saveState', device: 'dve1_box', display: content, file: e, state: state, thumb: f, divclass: divclass});
		if (state == 'nocg') {
			socket.emit('UI|action', {channel: channel, layer: layer, action: 'up', data: data, dve:'true'});	
			} 
		/**socket.emit('UI|action', {action: 'cg1' , template: template , data: data});
		var butCG1 = $("button[action='cg1']");
		butCG1.attr('action','nocg1');
		var htmlS = '<i class="fas fa-eject"></i> Off Air';
		butCG1.html( htmlS );   **/  
}

// UI Action Click
$(document).on('click', '#plAction', function(e){
	var device = $(this).closest('.card');
	var plist = device.find('.playList');
	var indexPL, index2PL;
	if (device.attr('id') == 'vtr1_box'){ indexPL = CH1index; index2PL = CH1index2 } else { indexPL = CH2index; index2PL = CH2index2 }; 
		if (	plist.hasClass('hide')) {
				device.attr('mode','playlist');
				plist.removeClass('hide');
				device.find('.prev').removeClass('hide');
				device.find('.next').removeClass('hide');
				device.find('.empty').removeClass('hide');
				socket.emit('UI|action', {action: 'saveState', device: device.attr('id')+'_plist', file: indexPL, thumb: index2PL , state: ''});

			}
		else {	device.attr('mode','');
				plist.addClass('hide');
				device.find('.prev').addClass('hide');
				device.find('.next').addClass('hide');
				device.find('.empty').addClass('hide');
				socket.emit('UI|action', {action: 'saveState', device: device.attr('id')+'_plist', file: indexPL, thumb: index2PL , state: 'hide'});
			}
});
			
function ignit1Plist(a,b,c,d,e,f){				// (channel, layer, player, playlist, playlist lenght, item number))
	CH1index = f;
	CH1ignit = 1;
	var video = d.find('tr').eq(f).find('td').eq(0).html();
	c.find('button').attr("video", video);	
	socket.emit('UI|action', {channel: a, layer: b, action: 'load', file: video, options: 'AUTO' });  //loading called item (f)
	var thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
	c.find('.thumb').attr("src", thumb);
	c.find('.clip').html(video);
	e = d.find('tr').length; 
	var g;
	d.find('.red').removeClass('red');
	d.find('tr').eq(f).addClass('red');
		if (f < e-1){ 
			CH1index2 =  f+1;		// index of n+1 item
		} else {
			CH1index2 =  0;		// index of 1st item
		}
	var next = d.find('tr').eq(CH1index2).find('td').eq(0).html();
	socket.emit('UI|action', {channel: a, layer: b, action: 'loadbg', file: next });    //Cueing n+1 item (g)
	d.find('.green').removeClass('green');
	d.find('tr').eq(CH1index2).addClass('green');
	socket.emit('UI|action', {action: 'saveState', device: c.attr('id')+'_plist', state: '', file: CH1index, thumb: CH1index2});
}
				
function ignit2Plist(a,b,c,d,e,f){				// (channel, layer, player, playlist, playlist lenght, item number))
	CH2index = f;
	CH2ignit = 1;
	var video = d.find('tr').eq(f).find('td').eq(0).html();
	c.find('button').attr("video", video);	
	socket.emit('UI|action', {channel: a, layer: b, action: 'load', file: video, options: 'AUTO' });  //loading called item (f)
	var thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
	c.find('.thumb').attr("src", thumb);
	c.find('.clip').html(video);
	e = d.find('tr').length; 
	var g;
	d.find('.red').removeClass('red');
	d.find('tr').eq(f).addClass('red');
		if (f < e-1){ 
			CH2index2 =  f+1;		// index of n+1 item
		} else {
			CH2index2 =  0;		// index of 1st item
		}
	var next = d.find('tr').eq(CH2index2).find('td').eq(0).html();
	socket.emit('UI|action', {channel: a, layer: b, action: 'loadbg', file: next });    //Cueing n+1 item (g)
	d.find('.green').removeClass('green');
	d.find('tr').eq(CH2index2).addClass('green');
	socket.emit('UI|action', {action: 'saveState', device: c.attr('id')+'_plist', state: '', file: CH2index, thumb: CH2index2});
}

$(document).on('click', '#sniffAction', function(e){ //CLS (media list) & TLS (Template list) CCG COMMAND
	var butVTR = $(this);
	var action = butVTR.attr('action');	
	socket.emit('UI|action', { action: action});  
	});
	
$(document).on('click', '#uiAction', function(e){	//VTR OTHERS BUTTONS
	var butVTR = $(this);
	var action = butVTR.attr('action');
	var file = butVTR.attr('video');
	var channel = butVTR.attr('channel');
	var layer = butVTR.attr('layer'); 
	var player =  butVTR.closest('.card');
	var device = player.attr('id');
	var butplay = player.find('.play');
	var content = butplay.html();
	var	state = butplay.attr('action');
	var	divclass = butplay.attr('class');
	var thumb = player.find('.thumb').attr('src');
	content = content.replace(/'/g, "\\'");
		if (device == 'vtr1_box'){ screen = 'CH1.png'; // VCR LOOP STATUS TO DB
			if (($(this).attr('action')) == ''){
				$(this).attr('action','loop');
				$(this).addClass('looping');
				loop1 = 'loop';	
				socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop1});
				}
			else if  (($(this).attr('action')) == 'loop'){
				$(this).attr('action','');
				$(this).removeClass('looping');
				loop1 = '';
				socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop1});
				}		} 
		else if (device == 'vtr2_box'){ screen = 'CH2.png';
			if (($(this).attr('action')) == ''){
				$(this).attr('action','loop');
				$(this).addClass('looping');
				loop2 = 'loop';	
				socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop2});
				}
			else if  (($(this).attr('action')) == 'loop'){
				$(this).attr('action','');
				$(this).removeClass('looping');
				loop2 = '';
				socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop2});
				}		
	}
				if	(player.attr('mode') == 'playlist'){
					var playerlist = player.find('.playList .plist');
					if (action == 'stop') {
						playerlist.find('.red').removeClass('red');
						playerlist.find('.green').removeClass('green');
							if (device == 'vtr1_box'){
								CH1ignit = 1;
								loop = loop1;
								} else
							if (device == 'vtr2_box'){
								CH2ignit = 1;
								loop = loop2;
								}
						socket.emit('UI|action', {channel: channel, layer: layer, action: action , file: file , options: loop1});  
						butplay.attr('action','play');
						butplay.html('<i class="fas fa-play"></i> Play'); 
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.removeClass('cligno');
						butplay.removeClass('green');
						player.find('button').attr("Video", '');
						player.find('.clip').html('');
						player.find('.thumb').attr("src",'/images/'+screen);	
						setTimeout(function(){
							player.find('.current h1').html('00:00:00:00');
							player.find('.duration h1').html('00:00:00:00');
							player.find('.remaining h1').html('00:00:00:00');
							player.find('.progressb').attr('aria-valuenow', '0');
							player.find('.progressb').css("width", '0%');
							}, 300);	
						device = player.attr('id'),
						state = butplay.attr('action'),
						divclass = butplay.attr('class'),
						file = '',
						thumb = '/images/'+screen,
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop});
						socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: 100000, thumb: 100000, state: ''});
						}
						else {
					if (action == 'resume') {
						socket.emit('UI|action', {channel: channel, layer: layer, action: action});  
						butplay.attr('action','pause');
						butplay.html('<i class="fas fa-pause"></i> Pause');
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.removeClass('cligno');
						butplay.addClass('green');
						divclass = butplay.attr('class');
						var video = playerlist.find('.red').find('td').eq(0).html();
							if (device == 'vtr1_box'){
								socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: CH1index, thumb: CH1index2, state: ''});
								loop = loop1;
									} else
							if (device == 'vtr2_box'){
								socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: CH2index, thumb: CH2index2, state: ''});
								loop = loop2;					
									}
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop1});
					}
					if (action == 'pause') {
						socket.emit('UI|action', {channel: channel, layer: layer, action: action});  
						butplay.attr('action','resume');
						butplay.html('<i class="fas fa-play"></i> Ready');
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.removeClass('green');
						butplay.addClass('cligno');
						divclass = butplay.attr('class');
						var video = playerlist.find('.red').find('td').eq(0).html();
							if (device == 'vtr1_box'){
								socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: CH1index, thumb: CH1index2, state: ''});
								loop = loop1;} else 
							if (device == 'vtr2_box'){
								socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: CH2index, thumb: CH2index2, state: ''});
								loop = loop2;
								}
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop1});
					}
					if (action == 'prev') {
						var actual = playerlist.find('.red');
						var next = playerlist.find('.green');
						actual.removeClass('red');
						next.removeClass('green');
						original = playerlist.find('tr').length;
							if (butplay.attr('action') == 'play'){
								butplay.attr('action','resume');
								butplay.html('<i class="fas fa-play"></i> Ready');
								content = butplay.html();
								content = content.replace(/'/g, "\\'");
								butplay.addClass('cligno');
								divclass = butplay.attr('class');
							} else {
								content = butplay.html();
								content = content.replace(/'/g, "\\'");
								divclass = butplay.attr('class');
							}							
							if (device == 'vtr1_box'){
								loop = loop1;
									if (actual.length <= 0) {
										ignit1Plist(channel,layer,player,playerlist,original,original-1)
										video = playerlist.find('tr').eq(0).find('td').eq(0).html(); 
										thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
									else {
										if (actual.index() > 0){
											ignit1Plist(channel,layer,player,playerlist,original,actual.index()-1);
											video = actual.prev('tr').find('td').eq(0).html();
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
											}						
										else {
											ignit1Plist(channel,layer,player,playerlist,original,original-1)
											video = playerlist.find('tr').eq(original-1).find('td').eq(0).html();
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
								}	} 
							if (device == 'vtr2_box'){
								loop = loop2;
									if (actual.length <= 0) {
										ignit2Plist(channel,layer,player,playerlist,original,original-1)
										video = playerlist.find('tr').eq(0).find('td').eq(0).html(); 
										thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
									else {
										if (actual.index() > 0){
											ignit2Plist(channel,layer,player,playerlist,original,actual.index()-1);
											video = actual.prev('tr').find('td').eq(0).html();
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
											}						
										else {
											ignit2Plist(channel,layer,player,playerlist,original,original-1)
											video = playerlist.find('tr').eq(original-1).find('td').eq(0).html();
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
								}	}							
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop});
						if (butplay.attr('action') == 'pause'){ socket.emit('UI|action', {channel: channel, layer: layer, action: 'resume'});  }
					}
					if (action == 'next') {
						var actual = playerlist.find('.red');
						var next = playerlist.find('.green');
						actual.removeClass('red');
						next.removeClass('green');
						original = playerlist.find('tr').length;
							if (butplay.attr('action') == 'play'){
								butplay.attr('action','resume');
								butplay.html('<i class="fas fa-play"></i> Ready');
								content = butplay.html();
								content = content.replace(/'/g, "\\'");
								butplay.addClass('cligno');
								divclass = butplay.attr('class');
							} else {
								content = butplay.html();
								content = content.replace(/'/g, "\\'");
								divclass = butplay.attr('class');
							}
							if (device == 'vtr1_box'){
								loop = loop1;
									if (actual.length <= 0) {
										ignit1Plist(channel,layer,player,playerlist,original,0)
										video = playerlist.find('tr').eq(0).find('td').eq(0).html(); 
										thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
									else {
										if (actual.index() < original-1) {
											ignit1Plist(channel,layer,player,playerlist,original,actual.index()+1);	
											video = actual.next('tr').find('td').eq(0).html();
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
											}						
										else {
											ignit1Plist(channel,layer,player,playerlist,original,0)
											video = playerlist.find('tr').eq(0).find('td').eq(0).html(); 
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
								}	}
							if (device == 'vtr2_box'){
								loop = loop2;
									if (actual.length <= 0) {
										ignit2Plist(channel,layer,player,playerlist,original,0)
										video = playerlist.find('tr').eq(0).find('td').eq(0).html(); 
										thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
									else {
										if (actual.index() < original-1){
											ignit2Plist(channel,layer,player,playerlist,original,actual.index()+1);	
											video = actual.next('tr').find('td').eq(0).html();
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
											}						
										else {
											ignit2Plist(channel,layer,player,playerlist,original,0)
											video = playerlist.find('tr').eq(0).find('td').eq(0).html();
											thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';}
								}	}		
						socket.emit('UI|action', {action: 'saveState', device: device, display: butplay.html().replace(/'/g, "\\'"), file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop});
						if (butplay.attr('action') == 'pause'){ socket.emit('UI|action', {channel: channel, layer: layer, action: 'resume'});  }
					}		
					if (action == 'play') {			
						butplay.attr('action','pause');
						butplay.html('<i class="fas fa-pause"></i> Pause');
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.removeClass('cligno');
						butplay.addClass('green');
						divclass = butplay.attr('class');
						original = playerlist.find('tr').length;
						video = playerlist.find('tr').eq(0).find('td').eq(0).html();
						thumb = 'http://'+cgsrv+':'+cgscan+'/db/_media/'+video+'/thumb.png';
							if (device == 'vtr1_box'){
								ignit1Plist(channel,layer,player,playerlist,original,0);
								loop = loop1;
								} else
							if (device == 'vtr2_box'){
								ignit2Plist(channel,layer,player,playerlist,original,0)
								loop = loop2;
								}
						socket.emit('UI|action', {channel: channel, layer: layer, action: 'resume'});
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop});
						}
					if (action == 'empty') {	
							if (device == 'vtr1_box'){ socket.emit('UI|action', {action: 'savePlist', plist: 'plist1', plistTab: ''});} else
							if (device == 'vtr2_box'){ socket.emit('UI|action', {action: 'savePlist', plist: 'plist2', plistTab: ''});}
					}}}
				else {
					if (device == 'vtr1_box'){loop = loop1};
					if (device == 'vtr2_box'){loop = loop2};
					socket.emit('UI|action', {channel: channel, layer: layer, action: action , file: file , options: loop});  
						if (action == 'stop') {
						butplay.attr('action','play');
						butplay.html('<i class="fas fa-play"></i> Play'); 
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.removeClass('cligno');
						butplay.removeClass('green');
						player.find('button').attr("Video", '');
						player.find('.clip').html('');
						player.find('.thumb').attr("src",'/images/'+screen);	
						setTimeout(function(){
							player.find('.current h1').html('00:00:00:00');
							player.find('.duration h1').html('00:00:00:00');
							player.find('.remaining h1').html('00:00:00:00');
							player.find('.progressb').attr('aria-valuenow', '0');
							player.find('.progressb').css("width", '0%');
							}, 300);
						state = butplay.attr('action');
						divclass = butplay.attr('class');
						file = player.find('.clip').html();
						thumb = '/images/'+screen,
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop});
						}
						else {
					if (action == 'resume') {
						butplay.attr('action','pause');
						butplay.html('<i class="fas fa-pause"></i> Pause');
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						state = butplay.attr('action');
						butplay.removeClass('cligno');
						butplay.addClass('green');
						divclass = butplay.attr('class');
						file = player.find('.clip').html();
						thumb = player.find('.thumb').attr("src");
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop});
					}
					if (action == 'pause') {
						butplay.attr('action','resume');
						butplay.html('<i class="fas fa-play"></i> Ready');
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						state = butplay.attr('action');
						butplay.removeClass('green');
						butplay.addClass('cligno');
						divclass = butplay.attr('class');
						file = player.find('.clip').html();
						thumb = player.find('.thumb').attr("src");
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop});
					}

			}}}
);

//Click in progressbar
$(document).on('click', '.progress', function(event){
	var player = $(this).closest('.card');
	var FrameR = player.attr('framer');
	var player_id = player.attr('id');
	var butPlay = player.find('.play');
	var file = 'dur_'+butPlay.attr('video');
	var channel = butPlay.attr('channel');
	var layer = butPlay.attr('layer');
	var dur = document.getElementById(file).innerHTML;
	var outside = document.getElementById(player_id+'_out');
	var inside = document.getElementById(player_id+'_in');
	inside.style.width = event.offsetX + "px";
      // calculate the new position of the video
	var pct = (event.offsetX / outside.clientWidth);
	var seeky = Math.floor((pct * dur * FrameR));console.log('touchpoint: '+pct+' - durée: '+dur+' - framerate: '+FrameR+' - position :'+seeky)
	socket.emit('UI|action', {channel: channel, layer: layer, action: 'call' , file: '' , options: seeky});   
	});

//Click DVE buttons
$(document).on('click', '#tempAction', function(e){
	var action = $(this).attr('action');
	var channel = $(this).attr('channel');	
	var layer = $(this).attr('layer');
	var template = $(this).attr('tmpl');
	var json = $(this).attr('json');	
	var name = $(this).attr('name');	
	var title = $(this).attr('title');	
	var data;
	// var state = 'cg';
	var player = $(this).closest('.card');
	var	device = player.attr('id');
	var	keyboardBut = device+'_key';
	if (json == true) {
		data = '{\"f0\":\"'+name+'\",\"f1\":\"'+title+'\"}';
		} else {
		data = '<templateData><componentData id=\"f0\"><data id=\"text\" value=\"'+name+'\"/></componentData><componentData id=\"f1\"><data id=\"text\" value=\"'+title+'\"/></componentData></templateData>' }
	if (action == 'cg') {
		$(this).attr('action','nocg');
		$(this).html('<i class="fas fa-eject"></i> Off Air');
		$(this).addClass('red');
		$('#'+keyboardBut).addClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'nocg';
		socket.emit('UI|action', {channel: channel, layer: layer, action: action , template: template , data: data , device: device, display: content, file: name, state: state, thumb: title, divclass: divclass});
		};
	if (action == 'up') {
		divclass = player.find('.play').attr('class');
		content = player.find('.play').html();
		content = content.replace(/'/g, "\\'");	
		state = player.find('.play').attr('action');
		socket.emit('UI|action', {channel: channel, layer: layer, action: action, data: data , device: device, display: content, file: name, state: state, thumb: title, divclass: divclass});	
		};   
	if (action == 'nocg') {
		$(this).attr('action','cg');
		$(this).html('<i class="fas fa-play-circle"></i> On Air');
		$(this).removeClass('red');	
		$('#'+keyboardBut).removeClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'cg';
		socket.emit('UI|action', {channel: channel, layer: layer, action: action, device: device, display: content, file: name, state: state, thumb: title, divclass: divclass});
		};	
});
	
$(document).on('click', '#changeScore', function(e){ //SCORE BUTTONS 
	var butSc = $(this);
	var targ = $("#score"+butSc.attr('action'));
	var valSc = "score"+butSc.attr('action');
	if (butSc.attr('class') == "plus" ){ targ.attr('value',Number(targ.val()) + 1); valSc = targ.val();}
	if (butSc.attr('class') == "zero" ){ targ.attr('value',Number(0));valSc = targ.val();}
	if (butSc.attr('class') == "minus" ){ targ.attr('value',Number(targ.val()) - 1);valSc = targ.val();}
	var butCGup = $("#score_box").find('[action="up"]');
	butCGup.click();
});	


$(document).on('change', '.colo', function(){ //CHANGE COLORS IN SCORE TEMPLATE 
	var butCol = $(this);
	var color;
	color = butCol.val();
	var butCGup = $("#score_box").find('[action="up"]');
	butCGup.click();
});
	
//ON AIR SCORE BUTTONS
$(document).on('click', '#scoreAction', function(e){
	var action = $(this).attr('action');
	var channel = $(this).attr('channel');	
	var layer = $(this).attr('layer');
	var template = $(this).attr('tmpl');
	var json = $(this).attr('json');	
	Gamer1 = $('#gamer1').val();
	Score1 = $('#score1').val();	
	Gamer2 = $('#gamer2').val();
	Score2 = $('#score2').val();	
	Gamer3 = $('#gamer3').val();
	Score3 = $('#score3').val();	
	Gamer4 = $('#gamer4').val();
	Score4 = $('#score4').val();	
	Gamer5 = $('#gamer5').val();
	Score5 = $('#score5').val();	
	Gamer6 = $('#gamer6').val();
	Score6 = $('#score6').val();	
	Gamer7 = $('#gamer7').val();
	Score7 = $('#score7').val();	
	Gamer8 = $('#gamer8').val();
	Score8 = $('#score8').val();	
	Gamer9 = $('#gamer9').val();
	Score9 = $('#score9').val();	
	Gamer10 = $('#gamer10').val();
	Score10 = $('#score10').val();	
	Gamer11 = $('#gamer11').val();
	Score11 = $('#score11').val();		
	Gamer12 = $('#gamer12').val();
	Score12 = $('#score12').val();		
	Gamer13 = $('#gamer13').val();
	Score13 = $('#score13').val();		
	Gamer14 = $('#gamer14').val();
	Score14 = $('#score14').val();		
	Gamer15 = $('#gamer15').val();
	Score15 = $('#score15').val();		
	Gamer16 = $('#gamer16').val();
	Score16 = $('#score16').val();
	color1 = $('#color1').val();
	color2 = $('#color2').val();
	var data;
	var scoreTab = [];
	for (var i = 1; i < 17; i++) {
		var object = {};
		object["Gamer"] = $('#gamer'+i).val();
		object["Score"] = $('#score'+i).val();
		scoreTab.push(object); 
		} 
	for (var i = 1; i < 3; i++) {
		var object = {};
		object["color"] = $('#color'+i).val();
		scoreTab.push(object); 
		} 
	var state = 'cg';
	var player = $(this).closest('.card');
	var	device = player.attr('id');
	if (json == true) {
		data = '{\"f0\":\"'+Gamer1+'\",\"f1\":\"'+Score1+'\",\"f2\":\"'+Gamer2+'\",\"f3\":\"'+Score2+'\",\"f4\":\"'+Gamer3+'\",\"f5\":\"'+Score3+'\",\"f6\":\"'+Gamer4+'\",\"f7\":\"'+Score4+'\",\"f8\":\"'+Gamer5+'\",\"f9\":\"'+Score5+'\",\"f10\":\"'+Gamer6+'\",\"f11\":\"'+Score6+'\",\"f12\":\"'+Gamer7+'\",\"f13\":\"'+Score7+'\",\"f14\":\"'+Gamer8+'\",\"f15\":\"'+Score8+'\",\"f16\":\"'+Gamer9+'\",\"f17\":\"'+Score9+'\",\"f18\":\"'+Gamer10+'\",\"f19\":\"'+Score10+'\",\"f20\":\"'+Gamer11+'\",\"f21\":\"'+Score11+'\",\"f22\":\"'+Gamer12+'\",\"f23\":\"'+Score12+'\",\"f24\":\"'+Gamer13+'\",\"f25\":\"'+Score13+'\",\"f26\":\"'+Gamer14+'\",\"f27\":\"'+Score14+'\",\"f28\":\"'+Gamer15+'\",\"f29\":\"'+Score15+'\",\"f30\":\"'+Gamer16+'\",\"f31\":\"'+Score16+'\",\"f32\":\"'+color1+'\",\"f33\":\"'+color2+'\"}';
		} else {
		data = '<templateData><componentData id=\"f0\"><data id="text" value=\"'+Gamer1+'\"/></componentData><componentData id=\"f1\"><data id="text" value=\"'+Score1+'\"/></componentData><componentData id=\"f2\"><data id="text" value=\"'+Gamer2+'\"/></componentData><componentData id=\"f3\"><data id="text" value=\"'+Score2+'\"/></componentData><componentData id=\"f4\"><data id="text" value=\"'+Gamer3+'\"/></componentData><componentData id=\"f5\"><data id="text" value=\"'+Score3+'\"/></componentData><componentData id=\"f6\"><data id="text" value=\"'+Gamer4+'\"/></componentData><componentData id=\"f7\"><data id="text" value=\"'+Score4+'\"/></componentData><componentData id=\"f8\"><data id="text" value=\"'+Gamer5+'\"/></componentData><componentData id=\"f9\"><data id="text" value=\"'+Score5+'\"/></componentData><componentData id=\"f10\"><data id="text" value=\"'+Gamer6+'\"/></componentData><componentData id=\"f11\"><data id="text" value=\"'+Score6+'\"/></componentData><componentData id=\"f12\"><data id="text" value=\"'+Gamer7+'\"/></componentData><componentData id=\"f13\"><data id="text" value=\"'+Score7+'\"/></componentData><componentData id=\"f14\"><data id="text" value=\"'+Gamer8+'\"/></componentData><componentData id=\"f15\"><data id="text" value=\"'+Score8+'\"/></componentData><componentData id=\"f16\"><data id="text" value=\"'+Gamer9+'\"/></componentData><componentData id=\"f17\"><data id="text" value=\"'+Score9+'\"/></componentData><componentData id=\"f18\"><data id="text" value=\"'+Gamer10+'\"/></componentData><componentData id=\"f19\"><data id="text" value=\"'+Score10+'\"/></componentData><componentData id=\"f20\"><data id="text" value=\"'+Gamer11+'\"/></componentData><componentData id=\"f21\"><data id="text" value=\"'+Score11+'\"/></componentData><componentData id=\"f22\"><data id="text" value=\"'+Gamer12+'\"/></componentData><componentData id=\"f23\"><data id="text" value=\"'+Score12+'\"/></componentData><componentData id=\"f24\"><data id="text" value=\"'+Gamer13+'\"/></componentData><componentData id=\"f25\"><data id="text" value=\"'+Score13+'\"/></componentData><componentData id=\"f26\"><data id="text" value=\"'+Gamer14+'\"/></componentData><componentData id=\"f27\"><data id="text" value=\"'+Score14+'\"/></componentData><componentData id=\"f28\"><data id="text" value=\"'+Gamer15+'\"/></componentData><componentData id=\"f29\"><data id="text" value=\"'+Score15+'\"/></componentData><componentData id=\"f30\"><data id="text" value=\"'+Gamer16+'\"/></componentData><componentData id=\"f31\"><data id="text" value=\"'+Score16+'\"/></componentData><componentData id=\"f32\"><data id="text" value=\"'+color1+'\"/></componentData><componentData id=\"f33\"><data id="text" value=\"'+color2+'\"/></componentData></templateData>' }
	if (action == 'cg') {
		$(this).attr('action','nocg');
		$(this).html('<i class="fas fa-eject"></i> Off Air');
		$(this).addClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'nocg';
		socket.emit('UI|action', {channel: channel, layer: layer, action: action , template: template , data: data , device: device, display: content, file: data, state: state, thumb: scoreTab, divclass: divclass});
		};
	if (action == 'up') {
		divclass = player.find('.play').attr('class');
		content = player.find('.play').html();
		content = content.replace(/'/g, "\\'");	
		state = player.find('.play').attr('action');
		socket.emit('UI|action', {channel: channel, layer: layer, action: action, data: data , device: device, display: content, file: data, state: state, thumb: scoreTab, divclass: divclass});	
		};   
	if (action == 'nocg') {
		$(this).attr('action','cg');
		$(this).html('<i class="fas fa-play-circle"></i> On Air');
		$(this).removeClass('red');	
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'cg';
		socket.emit('UI|action', {channel: channel, layer: layer, action: action, device: device, display: content, file: data, state: state, thumb: scoreTab, divclass: divclass});
		};	
});

//Click BUG buttons
$(document).on('click', '#bugAction', function(e){
	var action = $(this).attr('action');
	var channel = $(this).attr('channel');	
	var layer = $(this).attr('layer');
	var name = $(this).attr('logo');
	thumb = '/'+name+'.png';
	var player = $(this).closest('.card');
	var	device = player.attr('id');
	var	keyboardBut = device+'_key';
	if (action == 'bug') {
		$(this).attr('action','nobug');
		$(this).html('<i class="fas fa-eject"></i> Off Air');
		$(this).addClass('red');
		$('#'+keyboardBut).addClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'nobug';
		socket.emit('UI|action', {action: 'bugload' , channel: channel, layer: layer, file: name, device: device, display: content, file: name, state: state, thumb: thumb, divclass: divclass});
		} 
	if (action == 'nobug') {
		$(this).attr('action','bug');
		$(this).html('<i class="fas fa-play-circle"></i> On Air');
		$(this).removeClass('red');	
		$('#'+keyboardBut).removeClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'bug';
		socket.emit('UI|action', {action: 'bugstop' , channel: channel, layer: layer, device: device, display: content, file: name, state: state, thumb: '/images/CH1.png', divclass: divclass});
	}
	
		
});
	
var parameters = $("#setupcontent");
var butSet = $('#setup');
var butpara = $('.tembut');

butSet.on('click', function(e){
	if ((butSet.hasClass("param")) == false){
		butSet.addClass( "param" );
		parameters.css("display", "table"); 
		butpara.css("display", "table-cell"); 
		}
	else {
		butSet.removeClass();
		parameters.css("display", "none"); 
		butpara.css("display", "none");
		}
});	

var scoreZone = $("#scoring");
var butScore = $("#scoreBtn");

butScore.on('click', function(e){
	if ((butScore.hasClass("disp")) == false){
		butScore.addClass( "disp" );
		scoreZone.css("display", "block"); 
		}
	else {
		butScore.removeClass("disp");
		scoreZone.css("display", "none"); 
		}
});

var butCon = $('#Konnek');
butCon.on('click', function(e){
	// socket.emit('UI|action', {action: 'CCGget'});
	// socket.emit('UI|action', {action: 'OBSget'});
	// socket.emit('UI|action', {action: 'AUXget'});
	// socket.emit('UI|action', {action: 'xkeysget'});     
	// socket.emit('UI|action', {action: 'tempGet' });
	// socket.emit('UI|action', {action: 'titleGet' });
	// socket.emit('UI|action', {action: 'plistGet', plist: 'plist1' });
	// socket.emit('UI|action', {action: 'plistGet', plist: 'plist2' });
	// socket.emit('UI|action', {action: 'StateGet'});
});

// on load main page Action
function ignition(){
	setTimeout(function(){
		socket.emit('UI|action', {action: 'ccgGet'});
		socket.emit('UI|action', {action: 'xkeysget'});     
		socket.emit('UI|action', {action: 'tempGet' });
		socket.emit('UI|action', {action: 'titleGet' });
		socket.emit('UI|action', {action: 'plistGet', plist: 'plist1' });
		socket.emit('UI|action', {action: 'plistGet', plist: 'plist2' });
		socket.emit('UI|action', {action: 'StateGet'});
		socket.emit('UI|action', {action: 'ScoreGet'});
					}, 1000);		
}

// on load main page Action
function ignitObs(){
	setTimeout(function(){
		socket.emit('UI|action', {action: 'ccgGet'});
		socket.emit('UI|action', {action: 'obsGet'});	//ONLY FOR OBS PAGE
		socket.emit('UI|action', {action: 'xkeysget'});     
		socket.emit('UI|action', {action: 'tempGet' });
		socket.emit('UI|action', {action: 'titleGet' });
		socket.emit('UI|action', {action: 'plistGet', plist: 'plist1' });
		socket.emit('UI|action', {action: 'plistGet', plist: 'plist2' });
		socket.emit('UI|action', {action: 'StateGet'});
		socket.emit('UI|action', {action: 'ScoreGet'});
					}, 1000);		
}

// on load main page Action
function ignitAux(){
	setTimeout(function(){
		socket.emit('UI|action', {action: 'ccgGet'});
		socket.emit('UI|action', {action: 'auxGet'});	//ONLY FOR OBS AUX PAGE
		socket.emit('UI|action', {action: 'xkeysget'});     
		socket.emit('UI|action', {action: 'tempGet' });
		socket.emit('UI|action', {action: 'titleGet' });
		socket.emit('UI|action', {action: 'plistGet', plist: 'plist1' });
		socket.emit('UI|action', {action: 'plistGet', plist: 'plist2' });
		socket.emit('UI|action', {action: 'StateGet'});
		socket.emit('UI|action', {action: 'ScoreGet'});
					}, 1000);		
}

//Devices selection button
function saveChannel(f){
	varia = $('#'+f).val();
	$('#'+f+'_box').find('button').attr("channel", varia);
	socket.emit('UI|action', {action: 'configUP' , arg1: f, arg2: varia});     
};
function saveLayer(f){
	varia = $('#'+f).val();
	$('#'+f+'_box').find('button').attr("layer", varia);
	socket.emit('UI|action', {action: 'configUP' , arg1: f, arg2: varia});     
};

//Change CasparCG on db and socket
$("#addSRV").on('click', function()  {
	cgsrv = document.getElementById('server').value;
	amcport = document.getElementById('amcport').value;
	oscport = document.getElementById('oscport').value;
	cgscan = document.getElementById('scanport').value;
	socket.emit('UI|action', {action: 'CCGsave' , srv: cgsrv, port1: amcport, port2: oscport, port3: cgscan});
});

//Change OBS-Main on db and socket
$("#addObs").on('click', function()  {
	obssrv = $("#obsserver").val();
	obsport = $("#obsport").val();
	obspass = $("#obspass").val();
	socket.emit('UI|action', {action: 'OBSsave' , obssrv: obssrv, obsport: obsport, obspass: obspass});     
});

//Change OBS-Aux on db and socket
$("#addAUX").on('click', function()  {
	auxsrv = $("#auxserver").val();
	auxport = $("#auxport").val();
	auxpass = $("#auxpass").val();
	socket.emit('UI|action', {action: 'AUXsave' , auxsrv: auxsrv, auxport: auxport, auxpass: auxpass});     
});

// Add a Title to table and to DB
$(".TitleDB").click(function saveTitles() {
	var titleTab = [];
	var object;
		for (var i = 1; i < $('#TitleList tr').length; i++) {
			object = {};
			object["Name"] = $("#TitleList").find('tr').eq(i).find('td').eq(0).html();
			object["Title"] = $("#TitleList").find('tr').eq(i).find('td').eq(1).html();
			titleTab.push(object);
		} 
	object = {};
	object["Name"] = $("#name1").val();
	object["Title"] = $("#title1").val();
	titleTab.push(object); 
	socket.emit('UI|action', {action: 'saveTitle', title: titleTab});
	$("#name1").val('');
	$("#title1").val('');
});

// Delete a Title table line DB
function deLine(a){
	var row = a.parentNode.rowIndex;
	$('#TitleList').find('tr').eq(row).remove();
	var titleTab = [];
	var object;
		for (var i = 1; i < $('#TitleList tr').length; i++) {
			object = {};
			object["Name"] = $("#TitleList").find('tr').eq(i).find('td').eq(0).html();
			object["Title"] = $("#TitleList").find('tr').eq(i).find('td').eq(1).html();
			titleTab.push(object);
		}
	socket.emit('UI|action', {action: 'saveTitle', title: titleTab});
};

// Modify a Title table line DB
function upLine(a){
	var row = a.parentNode.rowIndex;
	var upName = $('#TitleList').find('tr').eq(row).find('td').eq(0);
	var upTitle = $('#TitleList').find('tr').eq(row).find('td').eq(1);
		if (a.firstChild.classList.contains("fa-pen")){
			$('#TitleList').find('tr').eq(row).find('td').eq(2).html('<i class="fas fa-save"></i>');
			$('#TitleList').find('tr').eq(row).find('td').eq(0).html('<input type="text" id="upName" value="'+upName.html() +'"\">');
			$('#TitleList').find('tr').eq(row).find('td').eq(1).html('<input type="text" id="upTitle" value="'+upTitle.html()+'">');
		} else {
			$('#TitleList').find('tr').eq(row).find('td').eq(2).html('<i class="fas fa-pen"></i>');
			$('#TitleList').find('tr').eq(row).find('td').eq(0).html($('#upName').val());
			$('#TitleList').find('tr').eq(row).find('td').eq(1).html($('#upTitle').val());
			var titleTab = [];
			var object;
				for (var i = 1; i < $('#TitleList tr').length; i++) {
					object = {};
					object["Name"] = $("#TitleList").find('tr').eq(i).find('td').eq(0).html();
					object["Title"] = $("#TitleList").find('tr').eq(i).find('td').eq(1).html();
					titleTab.push(object);
				}
		socket.emit('UI|action', {action: 'saveTitle', title: titleTab});				
		}
};

// Delete a Playlist table line DB
function dePLine(a){
	var row = a.parentNode.rowIndex;
	var box = $(a.closest('.card')).attr('id');
	$('#'+box+' .playList').find('tr').eq(row).remove();
	var plistTab = [];
	var object;
		for (var i = 1; i < $('#'+box+' .playList').find('tr').length; i++) {
			object = {};
			object["name"] = $('#'+box+' .playList').find('tr').eq(i).find('td').eq(0).html();
			object["timecode"] = $('#'+box+' .playList').find('tr').eq(i).find('td').eq(1).html();
			object["duration"] = $('#'+box+' .playList').find('tr').eq(i).find('td').eq(2).html();
			plistTab.push(object);
		} console.log(plistTab);
		if (box == 'vtr1_box'){ socket.emit('UI|action', {action: 'savePlist', plist: 'plist1', plistTab: plistTab})}
		if (box == 'vtr2_box'){ socket.emit('UI|action', {action: 'savePlist', plist: 'plist2', plistTab: plistTab})}
};

// Empty Titles  from table and MongoDB
$("#empty").click(function () {
	var titleTab = [];
	socket.emit('UI|action', {action: 'saveTitle', title: titleTab});
});

//OPEN THE EXPLORER WINDOW TO CHOOSE A CSV SCOREBOARD FILE TO IMPORT
	$("#ScoreUpload").change(function() {
		filename = this.files[0].name;
		console.log(filename);
		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls|.csv)$/;  
			if (regex.test($("#ScoreUpload").val().toLowerCase())) {
				var xlsxflag = false;				/*Flag for checking whether excel is .xls format or .xlsx format*/  
				var csvflag = false;				/*Flag for checking whether excel is .xls format or .xlsx format*/  
					if ($("#ScoreUpload").val().toLowerCase().indexOf(".xlsx") > 0 | $("#ScoreUpload").val().toLowerCase().indexOf(".xls") > 0) { xlsxflag = true; }  
					if ($("#ScoreUpload").val().toLowerCase().indexOf(".csv") > 0) { csvflag = true; }  
					if (typeof (FileReader) != "undefined") {
						var data,ScoreList;
						var reader = new FileReader();
						var object1 = {};
						var object2 = {};
						reader.onload = function (e) {
							const text = e.target.result;
								if (xlsxflag) {	/*Converts the excel data in to object*/  
									data = XLSX.read(text, {type: 'binary'});  
									data.SheetNames.forEach(function(sheetName) {
										var XL_row_object = XLSX.utils.sheet_to_row_object_array(data.Sheets[sheetName]);
										var json_object = JSON.stringify(XL_row_object);
										ScoreList = JSON.parse(json_object);								
								 }) } 
								if (csvflag) {	/*Converts the csv data in to object*/  
									ScoreList = csvToArray(text);
								 }
							object1["color"] = "#ff0000";
							ScoreList.push(object1);
							object2["color"] = "#002AFF";
							ScoreList.push(object2);								
							socket.emit('UI|action', {action: 'saveScore', scoreboard: ScoreList});
							console.log(ScoreList);
						}
						if (xlsxflag) { reader.readAsBinaryString($("#ScoreUpload")[0].files[0]);}
						if (csvflag) { reader.readAsText($("#ScoreUpload")[0].files[0]);}					
						} else {
					alert("This browser does not support HTML5.");
					}
			} else {
			alert("Please upload a valid CSV file.");
			}
	});

//OPEN EXPLORER WINDOW TO CHOOSE A XLSX, XLS OR CSV TITLE FILE TO IMPORT
		$("#fileUpload").change(function() {
		filename = this.files[0].name
		console.log(filename);
		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls|.csv)$/;  
			if (regex.test($("#fileUpload").val().toLowerCase())) {
				var xlsxflag = false;				/*Flag for checking whether excel is .xls format or .xlsx format*/  
				var csvflag = false;				/*Flag for checking whether excel is .xls format or .xlsx format*/  
					if ($("#fileUpload").val().toLowerCase().indexOf(".xlsx") > 0 | $("#fileUpload").val().toLowerCase().indexOf(".xls") > 0) { xlsxflag = true; }  
					if ($("#fileUpload").val().toLowerCase().indexOf(".csv") > 0) { csvflag = true; }  
					if (typeof (FileReader) != "undefined") {
						var data,TitleList;
						var reader = new FileReader();
						reader.onload = function (e) {
							var text = e.target.result;
								if (xlsxflag) {	/*Converts the excel data in to object*/  
									data = XLSX.read(text, {type: 'binary'});  
									data.SheetNames.forEach(function(sheetName) {
										var XL_row_object = XLSX.utils.sheet_to_row_object_array(data.Sheets[sheetName]);
										var json_object = JSON.stringify(XL_row_object);
										TitleList = JSON.parse(json_object);								
										console.log(TitleList);
								 }) } 
								if (csvflag) {	/*Converts the csv data in to object*/  
									TitleList = csvToArray(text);
									console.log(TitleList);
								 }
								socket.emit('UI|action', {action: 'saveTitle', title: TitleList});
						}
						if (xlsxflag) { reader.readAsBinaryString($("#fileUpload")[0].files[0]);}
						if (csvflag) { reader.readAsText($("#fileUpload")[0].files[0]);}
					} else {
						alert("This browser does not support HTML5.");
					}
			} else {
				alert("Please upload a valid CSV file.");
			}
        });	
		
	function csvToArray(csv, delimiter = ";") {
		const headers = csv.slice(0, csv.indexOf("\r")).split(delimiter);
		const rows = csv.slice(csv.indexOf("\n") + 1, -1).split("\r\n");
		const arr = rows.map(function (row) {
			const values = row.split(delimiter);
			const el = headers.reduce(function (object, header, index) {
			object[header] = values[index];
			return object;
			}, {});
			return el;
		});
		return arr;
    }
  
//EXPORT TABLE TO EXCEL
   function ExportToExcel(type, fn, dl) {
            var elt = document.getElementById('TitleList');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
			var XLSXname = prompt("Please enter the name of your ExcelFile");

            return dl ?
                XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
                XLSX.writeFile(wb, fn || (XLSXname+'.'+ (type || 'xlsx')));
    }
  
//VIRTUAL KEYBOARD COMMUTS	
$("#XkeysSetAux1").on('click', '.Xkeysbut', function()  {
	obsaux_1 = $(this).attr('scname');
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'VirtualKey' , arg1: changedKey, arg2: 'aux1', arg3: obsaux_1});     
});

$("#XkeysSetAux2").on('click', '.Xkeysbut', function()  {
	obsaux_2 = $(this).attr('scname');
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'VirtualKey' , arg1: changedKey, arg2: 'aux2', arg3:obsaux_2});  
});

$("#XkeysSetPGM").on('click', '.Xkeysbut', function()  {
	obspgm = $(this).attr('scname');
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'VirtualKey' , arg1: changedKey, arg2: 'pgm', arg3: obspgm});
});

$("#XkeysSetPVW").on('click', '.Xkeysbut', function()  {
	obspvw = $(this).attr('scname');
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'VirtualKey' , arg1: changedKey, arg2: 'pvw', arg3: obspvw});     
});

//VIRTUAL KEYBOARD DVE & BUG
$(".card-xkeys").on('click', '.dveclass', function()  {
	var whichBox = $(this).attr('name')+'_box'
	var whichBUT = $('#'+whichBox).find('.play');
	whichBUT.click();
});

//VIRTUAL KEYBOARD TRANSITIONS
$("#XkeysSetPGM").on('click', '.AutoButton', function()  {
	socket.emit('UI|action', {action: 'transKey' , arg: '71'});     
});

$("#XkeysSetPVW").on('click', '.CutButton', function()  {
	socket.emit('UI|action', {action: 'transKey' , arg: '72'});     
});