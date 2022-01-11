// SOCKETIO CONNECT
var socket = io.connect('//192.168.0.155:7777', {
    query: {
        room: 'web'
    }
});

var server;
var amcport;
var oscport;
var scanport;
var vtr1;
var vtr2;
var bug1;
var bug2;
var dve1;
var dve2;
var dve3;
var dve4;
var lvtr1;
var lvtr2;
var lbug1;
var lbug2;
var ldve1;
var ldve2;
var ldve3;
var ldve4;
var temp1;
var temp2;
var temp3;
var temp4;
var json1;
var json2;
var json3;
var json4;
var obs;
var auxserver;
var auxport;
var intervalID = 0;
var socketisOpen = false;
var device1;
var action1;
var class1;
var display1;
var file1;
var thumb1;
var loop1;
var device2;
var action2;
var class2;
var display2;
var file2;
var thumb2;
var loop2;
var loop;
var device3;
var action3;
var class3;
var display3;
var file3;
var thumb3;
var device4;
var action4;
var class4;
var display4;
var file4;
var thumb4;
var device5;
var action5;
var class5;
var display5;
var file5;
var thumb5;
var device6;
var action6;
var class6;
var display6;
var file6;
var thumb6;
var device7;
var action7;
var class7;
var display7;
var file7;
var thumb7;
var device8;
var action8;
var class8;
var display8;
var file8;
var thumb8;
var device9;
var aux1_active;
var obsaux_1;
var device10;
var aux2_active;
var obsaux_2;
var device11;
var pgm_active;
var program;
var device12;
var pvw_active;
var preview;
var device13;
var Hplist1;
var Iplist1;
var device14;
var Hplist2;
var Iplist2;
var p1Time = '';
var q1Time = '';
var p2Time = '';
var q2Time = '';
var xkey1;
var xkey2;
var xkey3;
var xkey4;
var xkey5;
var xkey6;
var xkey7;
var xkey8;
var xkey9;
var xkey10;
var xkey11;
var xkey12;
var xkey13;
var xkey14;
var xkey15;
var xkey16;
var xkey17;
var xkey18;
var xkey19;
var xkey20;
var xkey21;
var xkey22;
var xkey23;
var xkey24;
var xkey25;
var xkey26;
var xkey27;
var xkey28;
var xkey29;
var xkey30;
var xkey31;
var xkey32;
var xkey33;
var xkey34;
var xkey35;
var xkey36;
var xkey37;
var xkey38;
var xkey39;
var xkey40;
var xkey41;
var xkey42;
var xkey43;
var xkey44;
var xkey45;
var xkey46;
var xkey47;
var xkey48;
var xkey49;
var xkey50;
var xkey51;
var xkey52;
var xkey53;
var xkey54;
var xkey55;
var xkey56;
var xkey57;
var xkey58;
var xkey59;
var xkey60;
var xkey61;
var xkey62;
var xkey63;
var xkey64;
var xkey65;
var xkey66;
var xkey67;
var xkey68;
var xkey69;
var xkey70;
var xkey71;
var xkey72;
var xkey73;
var xkey74;
var xkey75;
var xkey76;
var xkey77;
var xkey78;
var xkey79;
var xkey80;
	
// SIO || CONNECT
socket.on('connect',function() {
  console.log('Connected to NodeJS Server');
});

// SIO || DISCONNECT
socket.on('disconnect',function() {
  console.log('Disconnected to NodeJS Server');
});
// SIO || MEDIAS LIST RECEIVED
socket.on('ccgcls',function(mediasList) {
	var tableau = mediasList.split(";");
	var tab = new Array();
	for (var i = 0; i < tableau.length; i++) {
    tab[i] = tableau[i].split(",");
}	for (var i = 0; i < tab.length; i++) {
    tab[i].pop();
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
	//alert(mediasList);
});

// SIO || TEMPLATE LIST RECEIVED
socket.on('ccgtls',function(tempList) {
	var template = tempList.split(/\r\n|\r|\n/);
	generateTable(template,'#tempList','tempTab');
});

// SIO || CASPARCG CONFIG RECEIVED
socket.on('ccgconf',function(z) {
	var data = JSON.parse(z);;
	server = data[0].var;
	amcport = data[1].var;
	oscport = data[2].var;
	scanport = data[3].var;
	vtr1 = data[4].var;
	vtr2 = data[5].var;
	dve1 = data[6].var;
	dve2 = data[7].var;
	dve3 = data[8].var;
	dve4 = data[9].var;
	aux1 = data[10].var;
	obsserver = data[11].var;
	obsport = data[12].var;
	auxserver = data[13].var;
	auxport = data[14].var;
	lvtr1 = data[15].var;
	lvtr2 = data[16].var;
	ldve1 = data[17].var;
	ldve2 = data[18].var;
	ldve3 = data[19].var;
	ldve4 = data[20].var;
	bug1 = data[21].var;
	bug2 = data[22].var;
	lbug1 = data[23].var;
	lbug2 = data[24].var;
	$('#server').attr('value',server);
	$('#amcport').attr('value',amcport);
	$('#oscport').attr('value',oscport);
	$('#scanport').attr('value',scanport);
	$('#vtr1 option').eq(vtr1 -1).prop('selected', true);
	$('#vtr2 option').eq(vtr2 -1).prop('selected', true);
	$('#bug1 option').eq(bug1 -1).prop('selected', true);
	$('#bug2 option').eq(bug2 -1).prop('selected', true);
	$('#dve1 option').eq(dve1 -1).prop('selected', true);
	$('#dve2 option').eq(dve2 -1).prop('selected', true);
	$('#dve3 option').eq(dve3 -1).prop('selected', true);
	$('#dve4 option').eq(dve4 -1).prop('selected', true);
	$('#aux1 option').eq(aux1 -1).prop('selected', true);
	$('#lvtr1 option').eq(lvtr1 -1).prop('selected', true);
	$('#lvtr2 option').eq(lvtr2 -1).prop('selected', true); 
	$('#lbug1 option').eq(lbug1 -10).prop('selected', true);
	$('#lbug2 option').eq(lbug2 -10).prop('selected', true);
	$('#ldve1 option').eq(ldve1 -10).prop('selected', true);
	$('#ldve2 option').eq(ldve2 -10).prop('selected', true);
	$('#ldve3 option').eq(ldve3 -10).prop('selected', true);
	$('#ldve4 option').eq(ldve4 -10).prop('selected', true);
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
	$('#obsserver').attr('value',obsserver);
	$('#obsport').attr('value',obsport);
	$('#auxserver').attr('value',auxserver);
	$('#auxport').attr('value',auxport);
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
});

/** SIO || OBS CONFIG RECEIVED
socket.on('obsconf',function(z) {
	var tab1 = z.split(",");
	obsserver = tab1[0];
	$('#obsserver').attr('value',obsserver);
	obsport = tab1[1];
	$('#obsport').attr('value',obsport);
});

// SIO || AUX CONFIG RECEIVED
socket.on('auxconf',function(z) {
	var tab1 = z.split(",");
});**/

// SIO || CCG TEMPLATES CONFIG RECEIVED
socket.on('tempconf',function(z) {
	var tab1 = JSON.parse(z);
	temp1 = tab1[0].tempname;
	temp2 = tab1[1].tempname;
	temp3 = tab1[2].tempname;
	temp4 = tab1[3].tempname;
	json1 = tab1[0].json;
	json2 = tab1[1].json;
	json3 = tab1[2].json;
	json4 = tab1[3].json;
	$('#CH3temp').html(temp1);
	$('#CH3').html(temp1);
	$('#CH4temp').html(temp2);
	$('#CH4').html(temp2);
	$('#CH5temp').html(temp3);
	$('#CH5').html(temp3);
	$('#CH6temp').html(temp4);
	$('#CH6').html(temp4);
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
	if (json1=='1'){ $('#temp1 input').prop("checked", true)} else { $('#temp1 input').prop("checked", false)} 
	if (json2=='1'){ $('#temp2 input').prop("checked", true)} else { $('#temp2 input').prop("checked", false)} 
	if (json3=='1'){ $('#temp3 input').prop("checked", true)} else { $('#temp3 input').prop("checked", false)} 
	if (json4=='1'){ $('#temp4 input').prop("checked", true)} else { $('#temp4 input').prop("checked", false)} 
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
								$('#bug1_box #bugAction').attr('action',action7,'class',class7);
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
								$('#bug2_box #bugAction').attr('action',action8,'class',class8);
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
								Iplist1 = Number(TrucTruc[0].file);
			if (Hplist1 == '') {
						vcr1.attr('mode','playlist');
						vcr1.find('.playList').removeClass('hide');
						vcr1.find('.prev').removeClass('hide');
						vcr1.find('.next').removeClass('hide');
						vcr1.find('.empty').removeClass('hide');
						vcr1.find('.red').removeClass('red');
						vcr1.find('.playList .plist tr').eq(Iplist1-1).addClass('red');		

			}
				else {	vcr1.attr('mode','');
						vcr1.find('.playList').addClass('hide');
						vcr1.find('.prev').addClass('hide');
						vcr1.find('.next').addClass('hide');
						vcr1.find('.empty').addClass('hide');
					}
							}
		if (a === device14){	Hplist2 = Truc[0].action;	//PLAYLIST 2 STATE
										Iplist2 = Number(TrucTruc[0].file);
			if (Hplist2 == '') {
						vcr2.attr('mode','playlist');
						vcr2.find('.playList').removeClass('hide');
						vcr2.find('.prev').removeClass('hide');
						vcr2.find('.next').removeClass('hide');
						vcr2.find('.empty').removeClass('hide');
						vcr2.find('.red').removeClass('red');
						vcr2.find('.playList .plist tr').eq(Iplist2-1).addClass('red');		
					}
				else {	vcr2.attr('mode','');
						vcr2.find('.playList').addClass('hide');
						vcr2.find('.prev').addClass('hide');
						vcr2.find('.next').addClass('hide');
						vcr2.find('.empty').addClass('hide');
					}
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
	action1 = Truc[0].action;
	action2 = Truc[1].action;
	action3 = Truc[2].action;
	action4 = Truc[3].action;
	action5 = Truc[4].action;
	action6 = Truc[5].action;
	action7 = Truc[12].action;
	action8 = Truc[13].action;
	class1 = Truc[0].hclass;
	class2 = Truc[1].hclass;
	class3 = Truc[2].hclass;
	class4 = Truc[3].hclass;
	class5 = Truc[4].hclass;
	class6 = Truc[5].hclass;
	class7 = Truc[12].hclass;
	class8 = Truc[13].hclass;
	display1 = Truc[0].display;
	display2 = Truc[1].display;
	display3 = Truc[2].display;
	display4 = Truc[3].display;
	display5 = Truc[4].display;
	display6 = Truc[5].display;
	display7 = Truc[12].display;
	display8 = Truc[13].display;
	file1 = Truc[0].file;
	file2 = Truc[1].file;
	file3 = Truc[2].file;
	file4 = Truc[3].file;
	file5 = Truc[4].file;
	file6 = Truc[5].file;
	file7 = Truc[12].file;
	file8 = Truc[13].file;
	thumb1 = Truc[0].thumb;
	thumb2 = Truc[1].thumb;
	thumb3 = Truc[2].thumb;
	thumb4 = Truc[3].thumb;
	thumb5 = Truc[4].thumb;
	thumb6 = Truc[5].thumb;
	thumb7 = Truc[12].thumb;
	thumb8 = Truc[13].thumb;
	loop1 = Truc[0].loop;
	loop2 = Truc[1].loop;
	aux1_active = Truc[6].action;
	aux2_active = Truc[7].action;
	pgm_active = Truc[8].action;
	pvw_active = Truc[9].action;	
	Hplist1 = Truc[10].action;	
	Hplist2 = Truc[11].action;			
	Iplist1 = Number(Truc[10].file);	
	Iplist2 = Number(Truc[11].file);
	vcr1 = $('#vtr1_box');
	vcr2 = $('#vtr2_box');	
	if (Hplist1 == '') {
				vcr1.attr('mode','playlist');
				vcr1.find('.playList').removeClass('hide');
				vcr1.find('.prev').removeClass('hide');
				vcr1.find('.next').removeClass('hide');
				vcr1.find('.empty').removeClass('hide');
				vcr1.find('.red').removeClass('red');
				vcr1.find('.playList .plist tr').eq(Iplist1-1).addClass('red');		
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
				vcr2.find('.playList .plist tr').eq(Iplist2-1).addClass('red');
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
	
	$('#bug1_box #bugAction').attr('action',action7,'class',class7);
	if (class7.includes("red") == true ){$('#bug1_box_key').addClass('red')} else {$('#bug1_box_key').removeClass('red')};
	$('#bug1_box #bugAction').attr('logo',file7);
	$('#bug1_box #bugAction').html(display7);
	$('#bug1_box .thumb').attr('src',thumb7);
	$('#bug1_box .clip').html(file7);
	
	$('#bug2_box #bugAction').attr('action',action8,'class',class8);
	if (class8.includes("red") == true ){$('#bug2_box_key').addClass('red')} else {$('#bug2_box_key').removeClass('red')};
	$('#bug2_box #bugAction').attr('logo',file8);
	$('#bug2_box #bugAction').html(display8);
	$('#bug2_box .thumb').attr('src',thumb8);
	$('#bug2_box .clip').html(file8);
	
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
	$('#dve2_box .play').attr({'action': action4,'class': class4});
	if (class4.includes("red") == true ){$('#dve2_box_key').addClass('red')} else {$('#dve2_box_key').removeClass('red')};
	$('#dve2_box .play').html(display4);
	
	$('#Temp3Name').html(file5);
	$('#Temp3Title').html(thumb5);
	$('#dve3_box').find('button').attr("Name", file5);
	$('#dve3_box').find('button').attr("Title",thumb5);
	$('#dve3_box .play').attr({'action': action5,'class': class5});
	if (class5.includes("red") == true ){$('#dve3_box_key').addClass('red')} else {$('#dve3_box_key').removeClass('red')};
	$('#dve3_box .play').html(display5);
	
	$('#Temp4Name').html(file6);
	$('#Temp4Title').html(thumb6);
	$('#dve4_box').find('button').attr("Name", file6);
	$('#dve4_box').find('button').attr("Title",thumb6);
	$('#dve4_box .play').attr({'action': action6,'class': class6});
	if (class6.includes("red") == true ){$('#dve4_box_key').addClass('red')} else {$('#dve4_box_key').removeClass('red')};
	$('#dve4_box .play').html(display6);
	

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
	generateJSONTables(xkeysL);
	//alert(xkeys);
});

// SIO || SAVED TITLES LIST RECEIVED
socket.on('titles',function(titles) {
	var titlesL = JSON.parse(titles);
	generateJSONTable(titlesL,'#TitleList tbody','Name','Title');
	//alert(titles);
});

// SIO || SAVED PLAYLIST LIST RECEIVED
socket.on('playlist',function(a,b) {
	var PlistL = JSON.parse(b);
	if (a == 'plist1') {generateJSONTable(PlistL,'#vtr1_box .playList tbody','Name','TimeCode');}
	if (a == 'plist2') {generateJSONTable(PlistL,'#vtr2_box .playList tbody','Name','TimeCode');}
});


// SIO || OBS SCENES LIST RECEIVED
socket.on('obslist',function(obsList) {
	var obsL = obsList.split(";");
	generateTable(obsL,'#OBSList','obsTab');
});

// SIO || BUTTONS CLASS RECEIVED
socket.on('rClick',function(a) {
	var b = $('#'+a);
	if (a == 'xkeys04' || a == 'xkeys12' || a == 'xkeys20' || a == 'xkeys28' || a == 'xkeys36' || a == 'xkeys44' || a == 'xkeys52' || a == 'xkeys60') { $("#XkeysSetAux1 .aux1").removeClass("red");}
	if (a == 'xkeys05' || a == 'xkeys13' || a == 'xkeys21' || a == 'xkeys29' || a == 'xkeys37' || a == 'xkeys45' || a == 'xkeys53' || a == 'xkeys61') { $("#XkeysSetAux2 .aux2").removeClass("red");}
	if (a == 'xkeys06' || a == 'xkeys14' || a == 'xkeys22' || a == 'xkeys30' || a == 'xkeys38' || a == 'xkeys46' || a == 'xkeys54' || a == 'xkeys62') { $("#XkeysSetPGM .pgm").removeClass("red");}
	if (a == 'xkeys07' || a == 'xkeys15' || a == 'xkeys23' || a == 'xkeys31' || a == 'xkeys39' || a == 'xkeys47' || a == 'xkeys55' || a == 'xkeys63') { $("#XkeysSetPVW .pvw").removeClass("red");}
	b.addClass("red");
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
  }  
});
	
function generateJSONTable(data,dest,col1,col2){
	$(dest).empty();
	if (col2 == 'TimeCode'){
			$.each(data, function(index, item) {
				var $tr = $('<tr draggable="true">').append(
				$('<td>').text(item.name),
				$('<td>').text(item.timecode),
				$('<td class="hide">').text(item.duration)).appendTo(dest); });}
				else {
	//$(dest).html('<thead><tr><th>'+col1+'</th><th>'+col2+'</th></tr></thead>');
	$.each(data, function(index, item) {//index is the index & item is the field
        if (col2 == 'Address'){
			var $tr = $('<tr class="event" name="'+item.name+'" addr="'+item.urlAddress+'" draggable="true">').append(
            $('<td>').text(item.name),
            $('<td>').text(item.urlAddress)).appendTo(dest); } 
		else if (col2 == 'Title'){
			var $tr = $('<tr ondblclick="doThat(&#039;'+item.name+'&#039;,&#039;'+item.title+'&#039;)" class="event" name="'+item.name+'"  title="'+item.title+'" draggable="true">').append(
            $('<td contenteditable="true">').text(item.name),
            $('<td contenteditable="true">').text(item.title)).appendTo(dest); } 	
    });
	}}
	
function generateJSONTables(data){
	//LINE1 KEYBOARD LINE CONFIG
	$('#XkeysLine1 tr').html('<td class="head"><h2>LINE 1</h2></td>');
	var Line1data = [];
	for (i = 0; i < 73; i=i+8){ Line1data.push(data[i]);}
		$.each(Line1data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine1 tr');
		});
	$('#xkeys00').addClass('red');
	$('#xkeys64').addClass('dveclass');
	$('#xkeys72').addClass('dveclass');
	
	//LINE2 KEYBOARD LINE CONFIG
	$('#XkeysLine2 tr').html('<td class="head"><h2>LINE 2</h2></td>');
	var Line2data = [];
	for (i = 1; i < 74; i=i+8){ Line2data.push(data[i]);}
		$.each(Line2data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine2 tr');
		});
	$('#xkeys01').addClass('red');
	$('#xkeys65').addClass('dveclass');
	$('#xkeys73').addClass('dveclass');
	
	//LINE3 KEYBOARD LINE CONFIG
	$('#XkeysLine3 tr').html('<td class="head"><h2>LINE 3</h2></td>');
	var Line3data = [];
	for (i = 2; i < 75; i=i+8){ Line3data.push(data[i]);}
		$.each(Line3data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine3 tr');
		});
	$('#xkeys02').addClass('red');
	$('#xkeys66').addClass('dveclass');
	$('#xkeys74').addClass('dveclass');
	
	//LINE4 KEYBOARD LINE CONFIG
	$('#XkeysLine4 tr').html('<td class="head"><h2>LINE 4</h2></td>');
	var Line4data = [];
	for (i = 3; i < 60; i=i+8){ Line4data.push(data[i]);}
		$.each(Line4data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysLine4 tr');
		});
	$('#XkeysLine4 tr').append('<td class="nondrop"><div class="XkeysAction dveclass" id="bug1_box_key" name="bug1"><h2 class="sTemp Xbut">68</h2><div>BUG 1</div></div></td><td class="nondrop"><div class="XkeysAction dveclass" id="bug2_box_key" name="bug2"><h2 class="sTemp Xbut">76</h2><div>BUG 2</div></div></td>')
	$('#xkeys03').addClass('red');
	
	//AUX1 KEYBOARD LINE CONFIG
	$('#XkeysSetAux1 tr').html('<td class="head"><h2>AUX 1</h2></td>');
	var Aux1data = [];
	for (i = 4; i < 61; i=i+8){ Aux1data.push(data[i]);}
		$.each(Aux1data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux1" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetAux1 tr');
		});
	$('#XkeysSetAux1 tr').append('<td class="nondrop"><div class="XkeysAction dveclass" id="dve1_box_key" name="dve1"><h2 class="sTemp Xbut">69</h2><div>DVE 1</div></div></td><td class="nondrop"><div class="XkeysAction dveclass" id="dve2_box_key" name="dve2"><h2 class="sTemp Xbut">77</h2><div>DVE 2</div></div></td>')
	$('#xkeys04').addClass('red');
	
	//AUX2 KEYBOARD LINE CONFIG
	$('#XkeysSetAux2 tr').html('<td class="head"><h2>AUX 2</h2></td>');
	var Aux2data = [];
	for (i = 5; i < 62; i=i+8){ Aux2data.push(data[i]);}
		$.each(Aux2data, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut aux2" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetAux2 tr');
		});
	$('#XkeysSetAux2 tr').append('<td class="nondrop"><div class="XkeysAction dveclass" id="dve3_box_key" name="dve3"><h2 class="sTemp Xbut">70</h2><div>DVE 3</div></div></td><td class="nondrop"><div class="XkeysAction dveclass" id="dve4_box_key" name="dve4"><h2 class="sTemp Xbut">78</h2><div>DVE 4</div></div></td>')
	$('#xkeys05').addClass('red');
	
	//PGM KEYBOARD LINE CONFIG
	$('#XkeysSetPGM tr').html('<td class="head"><h2>PROGRAM</h2></td>');
	var PGMdata = [];
	for (i = 6; i < 63; i=i+8){ PGMdata.push(data[i]);}
		$.each(PGMdata, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut pgm" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetPGM tr');
		});
	$('#XkeysSetPGM tr').append('<td class="nondrop"><div class="XkeysAction AutoButton"><h2 class="sTemp Xbut">71 - 79</h2><div>AUTO</div></div></td>')
	$('#xkeys06').addClass('red');
	
	//PVW KEYBOARD LINE CONFIG
	$('#XkeysSetPVW tr').html('<td class="head"><h2>PREVIEW</h2></td>');
	var PVWdata = [];
	for (i = 7; i < 64; i=i+8){ PVWdata.push(data[i]);}
		$.each(PVWdata, function(index, item) {//index is the index & item is the field
	        var $td = $('<td xkeysid="'+item.xkid+'" scene="'+item.scenename+'"><div id="xkeys'+item.xkid+'" class="Xkeysbut pvw" ScID="'+item.xkid+'" ScName="'+item.scenename+'"><h2 class="sTemp Xbut">'+(+item.xkid+1)+'</h2><div>'+item.scenename+'</div></div></td>').appendTo('#XkeysSetPVW tr');
		});
	$('#XkeysSetPVW tr').append('<td class="nondrop"><div class="XkeysAction CutButton"><h2 class="sTemp Xbut">72 - 80</h2><div>CUT</div></div></td>')
	$('#xkeys07').addClass('red');
	
}
	
function timeCode(a) {
	var dur = a/25
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
				var TC = timeCode(data[row][2]);
				html += '<td class="hide" id="dur_'+data[row][0]+'">' + data[row][2] + '</td><td>' +TC+'</td>\r\n';
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
		Tt.setData('Name', tName);
		Tt.setData('Title', tTitle);
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
		
	});
		
// Medias Drag & drop
$(document).ready(function () {
	$('#VideoList').on("dragstart", '.event', function (event) {
		var durdiv = '#dur_'+$(this).text();
		var dur = $(durdiv).text();
        var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).text());
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
					thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
					socket.emit('UI|action', {action: 'saveState', device: 'vtr1_box', display: content, file: video, state: state, thumb: thumb, divclass: divclass, loop: loop1});};
    });
	
	$('#vtr2_box .card-body').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#vtr2_box .clip').empty();
			var video = event.originalEvent.dataTransfer.getData('Text', $(this).text());
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
					thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
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
			socket.emit('UI|action', {action: 'savePlist', type: 'add', plist: 'plist1', name: video, duration: dur, timecode: TC});
		}	});	
		$('#vtr2_box .playList').on("dragenter dragover drop", function (event) {
			event.preventDefault();
        if (event.type === 'drop') {
			var video = event.originalEvent.dataTransfer.getData('Text');
            var dur = event.originalEvent.dataTransfer.getData('dur');			
			var TC = timeCode(dur);
			var html = '<tr><td>'+video+'</td><td>'+TC+'</td><td class="hide">'+dur+'</td></tr>';
			$('#vtr2_box .playList tbody').append(html);
			///// SAVE PLIST2
			socket.emit('UI|action', {action: 'savePlist', type: 'add', plist: 'plist2', name: video, duration: dur, timecode: TC});
		}	});
});
		
// BUG Drag & drop
$(document).ready(function () {
	$('#ImgList').on("dragstart", '.event', function (event) {
        var dt = event.originalEvent.dataTransfer;
        dt.setData('Text', $(this).text());
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
			//thumb: 'http://'+server+'/casparcg/Videos/'+logo+'.png',
			//$('#bug1_box .thumb').attr("src",thumb);
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
			//thumb: 'http://'+server+'/casparcg/Videos/'+logo+'.png',
			//$('#bug2_box .thumb').attr("src",thumb);
			content = butBUG2.html();
			content = content.replace(/'/g, "\\'");			
			butBUG2.addClass('red');
			state = butBUG2.attr('action');
			divclass = butBUG2.attr('class');
			socket.emit('UI|action', {action: 'saveState', device: 'bug2_box', display: content, file: logo, state: state, thumb: thumb, divclass: divclass, loop: ''});
        };});
});

$("#vtr1_box .playList tbody").sortable({
    axis: 'y',
    update: function (event, ui) {
		socket.emit('UI|action', {action: 'savePlist', type: 'suppr', plist: 'plist1'});
    	$('#vtr1_box .playList tbody tr').each(function(){
		var dur =  $(this).find('td').eq(2).text();
		var TC = $(this).find('td').eq(1).text();
		var video = $(this).find('td').eq(0).text();
			setTimeout(function(){
			socket.emit('UI|action', {action: 'savePlist', type: 'add', plist: 'plist1', name: video, duration: dur, timecode: TC});
				}, 30);			
	});}
});

$("#vtr2_box .playList tbody").sortable({
    axis: 'y',
    update: function (event, ui) {
		socket.emit('UI|action', {action: 'savePlist', type: 'suppr', plist: 'plist2'});
    	$('#vtr2_box .playList tbody tr').each(function(){
		var dur =  $(this).find('td').eq(2).text();
		var TC = $(this).find('td').eq(1).text();
		var video = $(this).find('td').eq(0).text();
			setTimeout(function(){
				socket.emit('UI|action', {action: 'savePlist', type: 'add', plist: 'plist2', name: video, duration: dur, timecode: TC});
				}, 30);			
	});}
});
	

// Templates Drag & drop
$(document).ready(function () {
	$('#tempList').on("dragstart", '.event', function (event) {
        var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).text());
		});
	
    $('#temp1').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#CH3temp').empty();
			$('#CH3').empty();
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
			$('#CH3temp').html(tempName);	
			$('#CH3').html(tempName);	
			$('#dve1_box').find('.play').attr('tmpl',tempName);
			if ($('#3').prop("checked") == true) {
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
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
			$('#CH4temp').html(tempName);								
			$('#CH4').html(tempName);								
			$('#dve2_box').find('.play').attr('tmpl',tempName);	
			if ($('#4').prop("checked") == true) {
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
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
			$('#CH5temp').html(tempName);								
			$('#CH5').html(tempName);								
			$('#dve3_box').find('.play').attr('tmpl',tempName);
			if ($('#5').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};		
			$('#temp3 input').attr('onclick','doCheck("3","'+tempName+'")');	// Save to MariaDB
			socket.emit('UI|action', {action: 'saveTemplate', channel: '3', tempname: tempName, json: check});
		};	});
		
	    $('#temp4').on("dragenter dragover drop", function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			$('#CH6temp').empty();
			$('#CH6').empty();
            var tempName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
			$('#CH6temp').html(tempName);								
			$('#CH6').html(tempName);								
			$('#dve4_box').find('.play').attr('tmpl',tempName);	
			if ($('#6').prop("checked") == true) {
			var check = '1';}
			else {
			var check = '0';};		
			$('#temp4 input').attr('onclick','doCheck("4","'+tempName+'")');	// Save to MariaDB
			socket.emit('UI|action', {action: 'saveTemplate', channel: '4', tempname: tempName, json: check});
		};	});
});
	


// OBS Scenes Drag & drop to Xkeys buttons
$(document).ready(function () {
	$('#OBSList').on("dragstart", '.event', function (event) {
        var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).text());
		});
    $('#XkeysSetAux1').on("dragenter dragover drop",'td', function (event) {
		event.preventDefault();
        if (event.type === 'drop') {
			
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
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
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
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
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
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
			var sceneName = event.originalEvent.dataTransfer.getData('Text', $(this).text());
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
	$(b).attr("src",'http://'+server+':'+scanport+'/db/_media/'+a+'/thumb.png');
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
		thumb = 'http://'+server+':'+scanport+'/db/_media/'+f+'/thumb.png';   // Save to MongoDB	
		socket.emit('UI|action', {action: 'saveState', device: 'vtr1_box', display: content, file: f, state: state, thumb: thumb, divclass: divclass, loop: loop1});				

	};

	if (e == 'tempTab') {
		$('#CH3temp').html(f);
		$('#CH3').html(f);
		var channel = $('#dve1').find(":selected").text();
		var layer = $('#ldve1').find(":selected").text();
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
		//thumb: 'http://'+server+'/casparcg/Videos/'+f+'.png';
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
	var Iplist ;
	if (device.attr('id') == 'vtr1_box'){ Iplist = Iplist1} else { Iplist = Iplist2}; 
		if (	plist.hasClass('hide')) {
				device.attr('mode','playlist');
				plist.removeClass('hide');
				device.find('.prev').removeClass('hide');
				device.find('.next').removeClass('hide');
				device.find('.empty').removeClass('hide');
				socket.emit('UI|action', {action: 'saveState', device: device.attr('id')+'_plist', file: Iplist, state: ''});

			}
		else {	device.attr('mode','');
				plist.addClass('hide');
				device.find('.prev').addClass('hide');
				device.find('.next').addClass('hide');
				device.find('.empty').addClass('hide');
				socket.emit('UI|action', {action: 'saveState', device: device.attr('id')+'_plist', file: Iplist, state: 'hide'});
			}
});

function TCdelay(callback, delay) {
    var timerId, start, remaining = delay;
    this.pause = function() {
        clearTimeout(timerId);
        remaining -= Date.now() - start;
    };
    this.resume = function() {
        start = Date.now();
        clearTimeout(timerId);
        timerId = setTimeout(callback, remaining);
    };
	this.clear = function() {
        clearTimeout(timerId);
    };
    this.resume();
}
			
function ignit1Plist(a,b,c,d,e,f){				// (channel, layer, player, playlist, playlist items number, item number))
		if (p1Time != "") {p1Time.clear();}
		if (q1Time != "") {q1Time.clear();}
	d.find('tr').eq(f).addClass('red');
	var video = d.find('tr').eq(f).find('td').eq(0).text();
	c.find('button').attr("video", video);	
	var thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
	c.find('.thumb').attr("src", thumb);
	c.find('.clip').html(video);
	socket.emit('UI|action', {channel: a, layer: b, action: 'load', file: video, options: 'AUTO' });  //loading called item
	var evolution = d.find('tr').length; 
	e = evolution;
	play1list(a,b,c,d,e,f);
	socket.emit('UI|action', {action: 'saveState', device: c.attr('id')+'_plist', state: '', file: f+1});
}
				
function play1list(a,b,c,d,e,f){	// (channel, layer, player, playlist, playlist items number,item number)
		if (p1Time != "") {p1Time.clear();}
		if (q1Time != "") {q1Time.clear();}
	var next =  d.find('tr').eq(f+1).find('td').eq(0).text(); // name of n+1 item
	var dur =  parseInt(d.find('tr').eq(f).find('td').eq(2).text())*40;	// Duration (ms) of current item
	socket.emit('UI|action', {channel: a, layer: b, action: 'loadbg', file: next });    //Cueing n+1 item
	var evolution = d.find('tr').length; 
	e = evolution;
			q1Time = new TCdelay(function(){		//TimeOut on actual item duration to highlight the right item
						d.find('tr').eq(f).removeClass('red'); 		
						d.find('tr').eq(f+1).addClass('red');
						c.find('.thumb').attr("src",'http://'+server+':'+scanport+'/db/_media/'+next+'/thumb.png');
						c.find('.clip').html(next);
						c.find('button').attr("video", next);	
						socket.emit('UI|action', {action: 'saveState', device: c.attr('id'), display: c.find('.play').html().replace(/'/g, "\\'"), file: next, state: c.find('.play').attr('action'), thumb: 'http://'+server+':'+scanport+'/db/_media/'+next+'/thumb.png', divclass: c.find('.play').attr('class'), loop: loop1});
						}, dur-500);			
			p1Time = new TCdelay(function(){		//TimeOut on duration item n of playlist + 500ms for BGloading item n+2 after item n+1 started to play
							if (f < e-2){ play1list(a,b,c,d,e,f+1);	} 
							else { loop1Plist(a,b,c,d,e,f+1) }; 
						}, dur+500);
		socket.emit('UI|action', {action: 'saveState', device: c.attr('id')+'_plist', state: '', file: f+1});
}	

function loop1Plist(a,b,c,d,e,f){	// (channel, layer, player, playlist, playlist items number, item number)
			if (p1Time != "") {p1Time.clear();}
			if (q1Time != "") {q1Time.clear();}
			var next =  d.find('tr').eq(0).find('td').eq(0).text(); // return name of playlist first item
			var dur =  parseInt(c.find('tr').eq(f).find('td').eq(2).text())*40; // Duration of actual item
			// alert(next);
			socket.emit('UI|action', {channel: a, layer: b, action: 'loadbg', file: next });    //Cueing first item
					q1Time = new TCdelay(function(){		//TimeOut on actual item duration to highlight the right item
						d.find('tr').eq(f).removeClass('red'); 
						d.find('tr').eq(0).addClass('red');
						c.find('.thumb').attr("src",'http://'+server+':'+scanport+'/db/_media/'+next+'/thumb.png');
						c.find('.clip').html(next);
						c.find('button').attr("video", next);	
						socket.emit('UI|action', {action: 'saveState', device: c.attr('id'), display: c.find('.play').html().replace(/'/g, "\\'"), file: next, state: c.find('.play').attr('action'), thumb: 'http://'+server+':'+scanport+'/db/_media/'+next+'/thumb.png', divclass: c.find('.play').attr('class'), loop: loop1});
						}, dur);
					p1Time = new TCdelay(function(){ 
						play1list(a,b,c,d,e,0);
						},dur+500);
		socket.emit('UI|action', {action: 'saveState', device: c.attr('id')+'_plist', state: '', file: 0});
}

function ignit2Plist(a,b,c,d,e,f){				// (channel, layer, player, playlist, playlist items number, item number))
			if (p2Time != "") {p2Time.clear();}
			if (q2Time != "") {q2Time.clear();}
	d.find('tr').eq(f).addClass('red');
	var video = d.find('tr').eq(f).find('td').eq(0).text();
	c.find('.thumb').attr("src",'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png');
	c.find('.clip').html(video);
	socket.emit('UI|action', {channel: a, layer: b, action: 'load', file: video, options: 'AUTO' });  //loading called item
	var evolution = d.find('tr').length; 
				if (evolution != e){ e = evolution; }	
				play2list(a,b,c,d,e,f);
}
				
function play2list(a,b,c,d,e,f){	// (channel, layer, player, playlist, playlist items number,item number)
			if (p2Time != "") {p2Time.clear();}
			if (q2Time != "") {q2Time.clear();}
			var next =  d.find('tr').eq(f+1).find('td').eq(0).text(); // name of n+1 item
			var dur =  parseInt(d.find('tr').eq(f).find('td').eq(2).text())*40;	// Duration (ms) of current item
			socket.emit('UI|action', {channel: a, layer: b, action: 'loadbg', file: next });    //Cueing n+1 item
			var evolution = d.find('tr').length; 
			e = evolution;
			q2Time = new TCdelay(function(){		//TimeOut on actual item duration to have the right highlight
						d.find('tr').eq(f).removeClass('red'); 		
						d.find('tr').eq(f+1).addClass('red');
						c.find('.thumb').attr("src",'http://'+server+':'+scanport+'/db/_media/'+next+'/thumb.png');
						c.find('.clip').html(next);
						}, dur-300);				
			p2Time = new TCdelay(function(){		//TimeOut on duration item n+1 of playlist + 300ms for loading after item n+1 started to play
							if (f < e-2){ play2list(a,b,c,d,e,f+1);	} 
							else { loop2Plist(a,b,c,d,e,f+1) }; 
						}, dur+300);									
}	

function loop2Plist(a,b,c,d,e,f){	// (channel, layer, player, playlist, playlist items number, item number)
			if (p2Time != "") {p2Time.clear();}
			if (q2Time != "") {q2Time.clear();}
			var next =  d.find('tr').eq(0).find('td').eq(0).text(); // return name of playlist first item
			var dur =  parseInt(c.find('tr').eq(f).find('td').eq(2).text())*40; // Duration of actual item
			socket.emit('UI|action', {channel: a, layer: b, action: 'loadbg', file: next });    //Cueing first item
			q2Time = new TCdelay(function(){		//TimeOut on actual item duration to have the right highlight
						d.find('tr').eq(f).removeClass('red'); 
						d.find('tr').eq(0).addClass('red');
						c.find('.thumb').attr("src",'http://'+server+':'+scanport+'/db/_media/'+next+'/thumb.png');
						c.find('.clip').html(next);
						}, dur-300);
			p2Time = new TCdelay(function(){ 
						play2list(a,b,c,d,e,0);
						},dur+300);
}

$(document).on('click', '#sniffAction', function(e){
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
						var actual = playerlist.find('.red');
						actual.removeClass('red');
							if (device == 'vtr1_box'){
								if (p1Time != "") {p1Time.clear();}
								if (q1Time != "") {q1Time.clear();}
								loop = loop1;
								} else
							if (device == 'vtr2_box'){
								if (p2Time != "") {p2Time.clear();}
								if (q2Time != "") {q2Time.clear();}
								loop = loop2;
								}
						socket.emit('UI|action', {channel: channel, layer: layer, action: action , file: file , options: loop1});  
						butplay.attr('action','play');
						butplay.html('<i class="fas fa-play"></i> Play'); 
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.removeClass('cligno');
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
						socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: 100000, state: ''});
						}
						else {
					if (action == 'resume') {
						socket.emit('UI|action', {channel: channel, layer: layer, action: action});  
						butplay.attr('action','pause');
						butplay.html('<i class="fas fa-pause"></i> Pause');
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.removeClass('cligno');
						divclass = butplay.attr('class');
						var id = playerlist.find('.red').index()+1;
						var video = playerlist.find('.red').find('td').eq(0).text();
							if (device == 'vtr1_box'){
								if (p1Time != "") {p1Time.resume();}
								if (q1Time != "") {q1Time.resume();}
								loop = loop1;
									} else
							if (device == 'vtr2_box'){
								if (p2Time != "") {p2Time.resume();}
								if (q2Time != "") {q2Time.resume();}
								loop = loop2;					
									}
						socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: id, state: ''});
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop1});
					}
					if (action == 'pause') {
						socket.emit('UI|action', {channel: channel, layer: layer, action: action});  
						butplay.attr('action','resume');
						butplay.html('<i class="fas fa-play"></i> Ready');
						content = butplay.html();
						content = content.replace(/'/g, "\\'");
						butplay.addClass('cligno');
						divclass = butplay.attr('class');
						var id = playerlist.find('.red').index()+1;
						var video = playerlist.find('.red').find('td').eq(0).text();
							if (device == 'vtr1_box'){
								if (p1Time != "") {p1Time.pause();}
								if (q1Time != "") {q1Time.pause();}
								loop = loop1;} else 
							if (device == 'vtr2_box'){
								if (p2Time != "") {p2Time.pause();}
								if (q2Time != "") {q2Time.pause();}
								loop = loop2;
								}
						socket.emit('UI|action', {action: 'saveState', device: device+'_plist', file: id, state: ''});
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop1});
					}
					if (action == 'prev') {
						var actual = playerlist.find('.red');
						actual.removeClass('red');
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
								if (p1Time != "") {p1Time.clear();}
								if (q1Time != "") {q1Time.clear();}
								loop = loop1;
									if (actual.index() > 0){
										ignit1Plist(channel,layer,player,playerlist,original,actual.index()-1);
										video = actual.prev('tr').find('td').eq(0).text();
										thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
										}						
									else {
										ignit1Plist(channel,layer,player,playerlist,original,original-1)
										video = playerlist.find('tr').eq(original-1).find('td').eq(0).text();
										thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';}
							} else	if (device == 'vtr2_box'){
								if (p2Time != "") {p2Time.clear();}
								if (q2Time != "") {q2Time.clear();}
								loop = loop2;
									if (actual.index() > 0){
										ignit2Plist(channel,layer,player,playerlist,original,actual.index()-1);
										video = actual.prev('tr').find('td').eq(0).text();
										thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
										}						
									else {
										ignit2Plist(channel,layer,player,playerlist,original,original-1)
										video = playerlist.find('tr').eq(original-1).find('td').eq(0).text();
										thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';}
							}							
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop});
						if (butplay.attr('action') == 'pause'){ socket.emit('UI|action', {channel: channel, layer: layer, action: 'resume'});  }
					}
					if (action == 'next') {
						var actual = playerlist.find('.red');
						original = playerlist.find('tr').length;
						actual.removeClass('red');
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
								if (p1Time != "") {p1Time.clear();}
								if (q1Time != "") {q1Time.clear();}
								loop = loop1;
									if (actual.length <= 0) {
										ignit1Plist(channel,layer,player,playerlist,original,0)
										video = playerlist.find('tr').eq(0).find('td').eq(0).text(); 
										thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';}
									else {
										if (actual.index() < original-1) {
											ignit1Plist(channel,layer,player,playerlist,original,actual.index()+1);	
											video = actual.next('tr').find('td').eq(0).text();
											thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
											}						
										else {
											ignit1Plist(channel,layer,player,playerlist,original,0)
											video = playerlist.find('tr').eq(0).find('td').eq(0).text(); 
											thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';}
								}	}
												if (device == 'vtr2_box'){
								if (p2Time != "") {p2Time.clear();}
								if (q2Time != "") {q2Time.clear();}
								loop = loop2;
									if (actual.length <= 0) {
										ignit2Plist(channel,layer,player,playerlist,original,0)
										video = playerlist.find('tr').eq(0).find('td').eq(0).text(); 
										thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';}
									else {
										if (actual.index() < original-1){
											ignit2Plist(channel,layer,player,playerlist,original,actual.index()+1);	
											video = actual.next('tr').find('td').eq(0).text();
											thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
											}						
										else {
											ignit2Plist(channel,layer,player,playerlist,original,0)
											video = playerlist.find('tr').eq(0).find('td').eq(0).text();
											thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';}
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
						divclass = butplay.attr('class');
						original = playerlist.find('tr').length;
						if (playerlist.find('.red').length > 0) {
							var id = playerlist.find('.red').index();
							video = playerlist.find('.red').find('td').eq(0).text();
							thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
						} else {
							var id = 0;
							video = playerlist.find('tr').eq(0).find('td').eq(0).text();
							thumb = 'http://'+server+':'+scanport+'/db/_media/'+video+'/thumb.png';
						}							
							if (device == 'vtr1_box'){
								ignit1Plist(channel,layer,player,playerlist,original,id);
								loop = loop1;
								} else
							if (device == 'vtr2_box'){
								ignit2Plist(channel,layer,player,playerlist,original,id)
								loop = loop2;
								}
						socket.emit('UI|action', {channel: channel, layer: layer, action: 'resume'});
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: video, state: butplay.attr('action'), thumb: thumb, divclass: divclass, loop: loop});
						}
					if (action == 'empty') {	
							if (device == 'vtr1_box'){ socket.emit('UI|action', {action: 'savePlist', type: 'suppr', plist: 'plist1'});} else
							if (device == 'vtr2_box'){ socket.emit('UI|action', {action: 'savePlist', type: 'suppr', plist: 'plist2'});}
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
						divclass = butplay.attr('class');
						file = player.find('.clip').html();
						butplay.removeClass('cligno');
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
						divclass = butplay.attr('class');
						file = player.find('.clip').html();
						butplay.addClass('cligno');
						thumb = player.find('.thumb').attr("src");
						socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: file, state: state, thumb: thumb, divclass: divclass, loop: loop});
					}

			}}}
);

//Click in progressbar
$(document).on('click', '.progress', function(event){
	var outside = $(this);   
	var player = $(this).closest('.card');
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
	var pct = (event.offsetX / outside.offsetWidth);
	var seeky = Math.floor((pct * dur));
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
	var state = 'cg';
	var player = $(this).closest('.card');
	var	device = player.attr('id');
	var	keyboardBut = device+'_key';
	if (json == true) {
		data = '{\"f0\":\"'+name+'\",\"f1\":\"'+title+'\"}';
		} else {
		data = '<templateData><componentData id=\"f0\"><data id=\"text\" value=\"'+name+'\"/></componentData><componentData id=\"f1\"><data id=\"text\" value=\"'+title+'\"/></componentData></templateData>' }
	if (action == 'cg') {
		socket.emit('UI|action', {channel: channel, layer: layer, action: action , template: template , data: data , device: device, dve:'true'});
		$(this).attr('action','nocg');
		$(this).html('<i class="fas fa-eject"></i> Off Air');
		$(this).addClass('red');
		$('#'+keyboardBut).addClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		display: $(this).html();
		state = 'nocg';
		socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: name, state: state, thumb: title, divclass: divclass});
		} 
	if (action == 'up') {
		socket.emit('UI|action', {channel: channel, layer: layer, action: action, data: data , device: device, dve:'true'});	
		divclass = player.find('play').attr('class');
		display: player.find('play').html();
		state = player.find('play').attr('action');
		socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: name, state: state, thumb: title, divclass: divclass});
	};   
	if (action == 'nocg') {
		socket.emit('UI|action', {channel: channel, layer: layer, action: action, device: device, dve:'false'});
		$(this).attr('action','cg');
		$(this).html('<i class="fas fa-play-circle"></i> On Air');
		$(this).removeClass('red');	
		$('#'+keyboardBut).removeClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		display: $(this).html();
		state = 'cg';
		socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: name, state: state, thumb: title, divclass: divclass});
	}
	
		
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
		socket.emit('UI|action', {action: 'load' , channel: channel, layer: layer, file: name , options: ''});
		$(this).attr('action','nobug');
		$(this).html('<i class="fas fa-eject"></i> Off Air');
		$(this).addClass('red');
		$('#'+keyboardBut).addClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'nobug';
		socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: name, state: state, thumb: thumb, divclass: divclass});
		} 
	if (action == 'nobug') {
		socket.emit('UI|action', {action: 'stop' , channel: channel, layer: layer, file: name , options: ''});
		$(this).attr('action','bug');
		$(this).html('<i class="fas fa-play-circle"></i> On Air');
		$(this).removeClass('red');	
		$('#'+keyboardBut).removeClass('red');
		content = $(this).html();
		content = content.replace(/'/g, "\\'");	
		divclass = $(this).attr('class');
		state = 'bug';
		socket.emit('UI|action', {action: 'saveState', device: device, display: content, file: name, state: state, thumb: '/images/CH1.png', divclass: divclass});
	}
	
		
});
	
var parameters = $("#setupcontent")
var butSet = $('#setup')
var butpara = $('.tembut')

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

var butCon = $('#Konnek');
butCon.on('click', function(e){
	socket.emit('UI|action', {action: 'CCGget'});
	socket.emit('UI|action', {action: 'StateGet'});
});

// on load pages Action
function ignition(){
	socket.emit('UI|action', {action: 'CCGget'});
	socket.emit('UI|action', {action: 'xkeysget'});     
	socket.emit('UI|action', {action: 'tempGet' });
	socket.emit('UI|action', {action: 'titleGet' });
	socket.emit('UI|action', {action: 'plistGet', plist: 'plist1' });
	socket.emit('UI|action', {action: 'plistGet', plist: 'plist2' });
	socket.emit('UI|action', {action: 'StateGet'});
}
	
//Devices selection button
function saveChannel(f){
	varia = document.getElementById(f).value;
	division = '#'+f+'_box';
	$( division ).find('button').attr("channel", varia);
	socket.emit('UI|action', {action: 'configUP' , arg1: f, arg2: varia});     
};
function saveLayer(f){
	varia = document.getElementById(f).value;
	division = '#'+f+'_box';
	$( division ).find('button').attr("layer", varia);
	socket.emit('UI|action', {action: 'configUP' , arg1: f, arg2: varia});     
};

//Change CasparCG on db and socket
$("#addSRV").on('click', function()  {
	server = document.getElementById('server').value;
	amcport = document.getElementById('amcport').value;
	oscport = document.getElementById('oscport').value;
	scanport = document.getElementById('scanport').value;
	socket.emit('UI|action', {action: 'CCGsave' , srv: server, port1: amcport, port2: oscport, port3: scanport});
});

//Change OBS-Main on db and socket
$("#addObs").on('click', function()  {
	obsserver = document.getElementById('obsserver').value;
	obsport = document.getElementById('obsport').value;
	socket.emit('UI|action', {action: 'OBSsave' , obssrv: obsserver, obsport: obsport});     
});

//Change OBS-Aux on db and socket
$("#addAUX").on('click', function()  {
	auxserver = $("#auxserver").val();
	auxport = $("#auxport").val();
	socket.emit('UI|action', {action: 'AUXsave' , auxsrv: auxserver, auxport: auxport});     
});

// Save Titles to table and to MariaDB
$(".TitleDB").click(function saveTitles() {
	var name = $("#name1").val();
	var title = $("#title1").val();
	var tline = '<tr ondblclick="doThat(&#039;'+name+'&#039;,&#039;'+title+'&#039;);" class="event" name="'+name+'" title="'+title+'" draggable="true"><td contenteditable="true">'+name+'</td><td contenteditable="true">'+title+'</td></tr>';
	$("#TitleList tbody").append(tline);
    socket.emit('UI|action', {action: 'saveTitrage', type: 'add', name: name, title: title});     
	$('#name1').val('');
	$('#title1').val('');
});

// Empty Titles  from table and MariaDB
$("#empty").click(function delTitles() {
	$("#TitleList").html('');
	$("#TitleList").html('<tr><th>Name</th><th>Title</th></tr>');
    socket.emit('UI|action', {action: 'saveTitrage', type: 'suppr'});    
});

 

/** Make Titles sortable (but no more droppable to DVE) from table and MariaDB => NE MARCHE PAS ENCORE
$("#sort").click(function sorting() {
	$("#TitleList").addClass('sort');
 
});



$("#TitleList tbody").sortable({
    axis: 'y',
    update: function (event, ui) {
			socket.emit('UI|action', {action: 'saveTitrage', type: 'suppr'});
			$('#TitleList tbody tr').each(function(){
				var sname =  $(this).find('td').eq(0).text();
				var stitle = $(this).find('td').eq(1).text();
					setTimeout(function(){
						socket.emit('UI|action', {action: 'saveTitrage', type: 'add', name: sname, title: stitle});
						}, 30);			
	});}
});

$("#TitleList td[contenteditable=true]").blur(function(){	//DOES NOT WORK !!!!
	var line = $(this).closest('tr');
	var sValue = $(this).text();
	var name = line.find('td').eq(0).text();
	var title = line.find('td').eq(1).text();
		if (name == sValue){socket.emit('UI|action', {action: 'saveTitrage', type: 'name', name: name, title: title});}
		else
		if (title == sValue){socket.emit('UI|action', {action: 'saveTitrage', type: 'title', name: name, title: title});}
        });
	**/
//Import table from csv 
$("#upload").bind("click", function () {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
            if (regex.test($("#fileUpload").val().toLowerCase())) {
                if (typeof (FileReader) != "undefined") {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var table = $("<tbody/>");
                        var rows = e.target.result.split("\n");
	                    $("#TitleList").html('<tr><th>Name</th><th>Title</th></tr>');
						socket.emit('UI|action', {action: 'saveTitrage', type: 'suppr'}); 
                        for (var i = 1; i < rows.length; i++) {
                            var cells = rows[i].split(";");
                            if (cells.length > 1) {
								var cell0 = $('<td contenteditable="true"></td>');
								var cell1 = $('<td contenteditable="true"></td>');
								cell0.html(cells[0]);
								cell1.html(cells[1]);
								var row = $('<tr ondblclick="doThat(&#039;'+cells[0]+'&#039;,&#039;'+cells[1]+'&#039;);" class="event" name="'+cells[0]+'" title="'+cells[1]+'" draggable="true"></tr>');
								row.append(cell0);
								row.append(cell1);
                                table.append(row);
								socket.emit('UI|action', {action: 'saveTitrage', type: 'add', name: cells[0], title: cells[1]}); 
                            }
                        }
                        $("#TitleList").append(table);
                    }
                    reader.readAsText($("#fileUpload")[0].files[0]);
                } else {
                    alert("This browser does not support HTML5.");
                }
            } else {
                alert("Please upload a valid CSV file.");
            }
        });
$("#fileUpload").change(function() {
  filename = this.files[0].name
  console.log(filename);
});

//EXPORT TABLE TO CSV
$("#export").on('click', function() {
		var data = "";
		var tableData = [];
		var rows = $("#TitleList tr");
		rows.each(function(index, row) {
			var rowData = [];
			$(row).find("th, td").each(function(index, column) {
			rowData.push(column.innerText);
			});
		tableData.push(rowData.join(";"));
		});
		data += tableData.join("\n");
    $(document.body).append('<a id="download-link" download="TitleList.csv" href=' + URL.createObjectURL(new Blob([data], {
      type: "text/csv"
    })) + '/>');
    $('#download-link')[0].click();
    $('#download-link').remove();
  });
  
//VIRTUAL KEYBOARD COMMUTS	
$("#XkeysSetAux1").on('click', '.Xkeysbut', function()  {
	obsaux_1 = $(this).attr('scname');
	$(".aux1").removeClass("red");	
	$(this).addClass("red");
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'XKeySend' , arg1: changedKey, arg2: 'aux1', arg3: obsaux_1});     
});

$("#XkeysSetAux2").on('click', '.Xkeysbut', function()  {
	obsaux_2 = $(this).attr('scname');
	$(".aux2").removeClass("red");	
	$(this).addClass("red");
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'XKeySend' , arg1: changedKey, arg2: 'aux2', arg3:obsaux_2});  
});

$("#XkeysSetPGM").on('click', '.Xkeysbut', function()  {
	obspgm = $(this).attr('scname');
	$(".pgm").removeClass("red");	
	$(this).addClass("red");
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'XKeySend' , arg1: changedKey, arg2: 'pgm', arg3: obspgm});
});

$("#XkeysSetPVW").on('click', '.Xkeysbut', function()  {
	obspvw = $(this).attr('scname');
	$(".pvw").removeClass("red");	
	$(this).addClass("red");
	var changedKey = $(this).attr("scid").toString();
	socket.emit('UI|action', {action: 'XKeySend' , arg1: changedKey, arg2: 'pvw', arg3: obspvw});     
});

//VIRTUAL KEYBOARD DVE & BUG
$(".card-xkeys").on('click', '.dveclass', function()  {
	var whichdve = $(this).attr('name')+'_box'
	var whichBUT = $('#'+whichdve).find('.play');
	whichBUT.click();
});

//VIRTUAL KEYBOARD TRANSITIONS
$("#XkeysSetPGM").on('click', '.AutoButton', function()  {
	socket.emit('UI|action', {action: 'transKey' , arg: '70'});     
});

$("#XkeysSetPVW").on('click', '.CutButton', function()  {
	socket.emit('UI|action', {action: 'transKey' , arg: '71'});     
});
