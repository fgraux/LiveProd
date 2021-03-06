// GLOBAL SETTINGS
var globalSettings = require("./LiveProdConfig");

// Terminal Colors
var term = require('terminal-kit').terminal ;

// CasparCG Connection
const { CasparCG, AMCP } = require('casparcg-connection');
var oscSocket;

// VARIABLE DECLARATION

var cgsrv,cgamcp,cgosc,cgscan;
var vtr1,vtr2,bug1,bug2,dve1,dve2,dve3,dve4,score;
var lvtr1,lvtr2,lbug1,lbug2,ldve1,ldve2,ldve3,ldve4,lscore;
var temp1,temp2,temp3,temp4,temp5,json1,json2,json3,json4,json5;
var obsrv,obsport,obspass,obsSceneL,obsAddr,obsOld;
var auxsrv,auxport,auxpass,auxAddr,auxOld;
const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
const obsAux = new OBSWebSocket();
var ccgChannel;
var CH1frameR,CH2frameR;
var videoFile;
var options;
var templateName;
var tempData;
var tmp1;
var tmp2;
var tmp3;
var tmp4;
var json1;
var json2;
var json3;
var json4;
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
var device15,action15,class15,display15,file15,thumb15;
var titleList;
var myXkeys;
var Xkeys80_1;
var xKeys,xkey1,xkey2,xkey3,xkey4,xkey5,xkey6,xkey7,xkey8,xkey9,xkey10,xkey11,xkey12,xkey13,xkey14,xkey15,xkey16,xkey17,xkey18,xkey19,xkey20,xkey21,xkey22,xkey23,xkey24,xkey25,xkey26,xkey27,xkey28,xkey29,xkey30,xkey31,xkey32,xkey33,xkey34,xkey35,xkey36,xkey37,xkey38,xkey39,xkey40,xkey41,xkey42,xkey43,xkey44,xkey45,xkey46,xkey47,xkey48,xkey49,xkey50,xkey51,xkey52,xkey53,xkey54,xkey55,xkey56,xkey57,xkey58,xkey59,xkey60,xkey61,xkey62,xkey63,xkey64,xkey65,xkey66,xkey67,xkey68,xkey69,xkey70,xkey71,xkey72,xkey73,xkey74,xkey75,xkey76,xkey77,xkey78,xkey79,xkey80;
var Gamer1,Score1,Gamer2,Score2,Gamer3,Score3,Gamer4,Score4,Gamer5,Score5,Gamer6,Score6,Gamer7,Score7,Gamer8,Score8,Gamer9,Score9,Gamer10,Score10,Gamer11,Score11,Gamer12,Score12,Gamer13,Score13,Gamer14,Score14,Gamer15,Score15,Gamer16,Score16;
var streamS = 'false';
var nCasp = 0;
let connectedXKeys = 'false';
const fs = require('fs'); //Open or export file module
// var fonts;
// const getSystemFonts = require('get-system-fonts');//Retrieve all system fonts
// async function FontsPrint() {
// fonts = await getSystemFonts();
// term("\n"+dateTimeNow()+"\t^#^r^W SYS FONTS ^ \tList of fonts in this system: "+fonts)
// };
// FontsPrint();

// TimerThingy
	var timexe = require('timexe');
	'use strict';
	require('dotenv').config();

// SOCKET.IO
	const socket_app = require('express');
	const socket_server = require('http').createServer(socket_app);
	const socket_io = require('socket.io')(socket_server, {
	  cors: {
		origin: '*',
	  }
	});

//WEB SERVER SETUP
	var express = require('express');
	var createError = require('http-errors');
	var path = require('path');
	var cookieParser = require('cookie-parser');
	var app = express();
	var cors = require('cors');
	var corsOptions = {
		origin: '*',
		};
	app.use(cors());

// VIEW ENGINE SETUP
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, '../Videos/')));
	
// GET HOME PAGE
	app.get('/', cors(corsOptions), function(req, res, next) {
	  res.render('index', { title: 'LiveProd' });
	});
	
// GET OBS PAGE
	app.get('/obs', cors(corsOptions), function(req, res, next) {
	  res.render('obs', { title: 'LiveProd' });
	});
	
// GET AUX PAGE
	app.get('/aux', cors(corsOptions), function(req, res, next) {
	  res.render('auxobs', { title: 'LiveProd' });
	});
	
// GET KEYBOARD PAGE
	app.get('/keyboard', cors(corsOptions), function(req, res, next) {
	  res.render('keyboard', { title: 'LiveProdKeyboard' });
	});
	
// GET KEYBOARD PAGE WITH ATEM STYLE
	app.get('/keyboard2', cors(corsOptions), function(req, res, next) {
	  res.render('keyboard_min', { title: 'LiveProdKeyboard' });
	});	
		
// GET CLOCK PAGE
	app.get('/clock', cors(corsOptions), function(req, res, next) {
	  res.render('clock', { title: 'LiveProdClock' });
	});
// GET TALLY PAGE
	app.get('/tally', cors(corsOptions), function(req, res, next) {
	  res.render('tally', { title: 'LiveProdTally' });
	});
// GET SCORING PAGE
	app.get('/score', cors(corsOptions), function(req, res, next) {
	  res.render('score', { title: 'LiveProdScoringBoard' });
	});
module.exports = app;

//START WEB SERVER
	app.listen(80, function() {
		term("\n"+dateTimeNow()+"\t^#^g^W WEBSERVER ^ \tListening on port 80")
	});
	
//MONGO DATABASE
	const MongoClient = require("mongodb").MongoClient;
	const  url = 'mongodb://0.0.0.0:27017';
	const client = new MongoClient(url, { useUnifiedTopology: true }, { useNewUrlParser: true }, { writeConcern: true });
	client.connect();    
	const database = client.db("liveprodb");
		
// IGNIT CASPARCG CONFIG FROM MONGO DB COLLECTION
async function DBignitPrint() {
	await DBccgPrint();	
	// START CCG CONNECTOR
		ccgConnector(cgsrv, cgamcp, function(err, response){
		if(!err){
			ccgConnectOSC(cgosc);
			term(response); }
		else {
			if(err == 'disconnected'){term("\n"+dateTimeNow()+"\t^#^y^B CASPAR CG ^ \tDisconnected from CasparCG Server :"+cgsrv+":"+cgamcp);}}
		});			
}

//GET CASPARCG CONFIG UPDATE FROM MONGO DB COLLECTION
async function DBccgPrint() {
let truc = await DBserverGet();
dbSrv = JSON.stringify(truc);
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
	obsAddr = obssrv+':'+obsport;
	auxAddr =  auxsrv+':'+auxport;
		//SEND DATA TO WEBAPP
			ccg_retrieve(dbSrv, function(err, response){
					if(!err){ term(response); }
				});
};

//GET OBS CONFIG FROM MONGO DB COLLECTION
async function DBobsPrint() {
let truc = await DBserverGet();
dbSrv = JSON.stringify(truc);
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
	obsAddr = obssrv+':'+obsport;
	auxAddr =  auxsrv+':'+auxport;

		//SEND DATA TO WEBAPP
			obs_retrieve(obssrv, obsport, obspass, function(err, response){
					if(!err){ term(response); }
				});
	
		if(obs.readyState == OBSWebSocket.OPEN){		// Start OBS Connector
			obs.disconnect();
			term("\n"+dateTimeNow()+"\t^#^r^W OBS DISCONNECTED ^ \tAttemting to reconnect");
			obsMain_detect(obsAddr,function(err, response){
				if(!err){ term(response); }
				else { if(err == 'disconnected'){ term("\n"+dateTimeNow()+"\t^#^r^W OBSCONNEC ^ \tDisconnected from OBS main instance: "+obsAddr); }}
			})
		};	
};				

//GET OBS AUX CONFIG FROM MONGO DB COLLECTION
async function DBauxPrint() {
let truc = await DBserverGet();
dbSrv = JSON.stringify(truc);
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
	obsAddr = obssrv+':'+obsport;
	auxAddr =  auxsrv+':'+auxport;

		//SEND DATA TO WEBAPP
			aux_retrieve(auxsrv, auxport, auxpass, function(err, response){
					if(!err){ term(response); }
				});
	
		if(obsAux.readyState == OBSWebSocket.OPEN){		// Start OBS AUX Connector
			obsAux.disconnect();
			term("\n"+dateTimeNow()+"\t^#^r^W OBS AUX DISCONNECTED ^ \tAttemting to reconnect");
			obsAux_detect(auxAddr,function(err, response){
				if(!err){ term(response); }
					else{ if(err == 'disconnected'){ term("\n"+dateTimeNow()+"\t^#^r^W OBSCONNEC ^ \tDisconnected from OBS aux instance: "+auxAddr); }}
				})		
		};	
};	

//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTIONS (DBccgPrint, DBobsPrint, DBauxPrint)
	var DBserverGet = () => {
		const tserver = database.collection("server");
		return new Promise((resolve, reject) => {
			tserver.find({}, { projection: { _id: 0, constant: 1, var: 1} }).toArray(function(err, result) {
				err 
					? reject(err) 
					: resolve(result);
				});
			});
	};

// GET APP WHOLE PREVIOUS STATE FROM MONGO DB COLLECTION
async function DBstatePrint() {
	let Truc;
	const collec = await database.listCollections({name: "state"});
		if (collec) { Truc = await DBstateGet() }
		else { let crea = await DBstateCreate();
			if (crea) { Truc = await DBstateGet() }
		}		
		statement = JSON.stringify(Truc);
		state_retrieve(statement, function(err, response){
			if(!err){ term(response); }
			});
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
		thumb15 = Truc[14].thumb;
		loop1 = Truc[0].loop;
		loop2 = Truc[1].loop;
		aux1_active = Truc[6].action;
		aux2_active = Truc[7].action;
		pgm_active = Truc[8].action;
		pvw_active = Truc[9].action;
		obsaux_1 = Truc[6].hclass;
		obsaux_2 = Truc[7].hclass;
		program = Truc[8].hclass;
		preview = Truc[9].hclass;	
		Hplist1 = Truc[10].action;	
		Hplist2 = Truc[11].action;		
		Iplist1 = Truc[10].file;	
		Iplist2 = Truc[11].file;
		if (connectedXKeys == 'true') { xKey_ignit();}
	}
	
//CREATE A MONGODB COLLECTION NAMED "STATE" IF NOT EXISTS THEN FILLS IT WITH JSON BACKUP
	var DBstateCreate = () => {
		return new Promise((resolve, reject) => {
			try {
				database.createCollection("state", function(err, res) {
				if (err) throw err;
				term("\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tCollection created: state")})
				const tstate = database.collection("state");
						let stateFs = fs.readFileSync('DB_bkp/state.json');  
						let stateArr = JSON.parse(stateFs);  
						const results = tstate.insertMany(stateArr, {safe:true}, function(err){ 
							if(err != null){ term("\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tCollection creation failed: "+err)}
						});
						return resolve( results); }
				catch (error) { return reject(error); }			
		})
	};
  
//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (DBstatePrint)
	var DBstateGet = async () => {
		const tstate = database.collection("state");
			return new Promise((resolve, reject) => {
				tstate.find({}, { projection: { _id: 0, device: 1, action: 1, hclass: 1, display: 1, file: 1, thumb: 1, loop: 1} }).toArray(function(err, result) {
					err 
						? reject(err) 
						: resolve(result);
					});
			});		
	};

// GET PREVIOUS STATE OF ONE DEVICE OR FUNCTION OF THE APP FROM MONGO DB COLLECTION
	async function DB1statePrint(a) {
	let Truc = await DB1stateGet(a);
	statement = JSON.stringify(Truc);
	action = Truc[0].action;
	partial_retrieve(statement, function(err, response){
				if(!err){
					term(response);
				}
			});
			if (a == device1){	action1 = Truc[0].action;	//VTR1 STATE
								class1 = Truc[0].hclass;
								display1 = Truc[0].display;
								file1 = Truc[0].file;
								thumb1 = Truc[0].thumb;
								loop1 = Truc[0].loop;
								}
			if (a == device2){	action2 = Truc[0].action;	//VTR2 STATE
								class2 = Truc[0].hclass;
								display2 = Truc[0].display;
								file2 = Truc[0].file;
								thumb2 = Truc[0].thumb;
								loop2 = Truc[0].loop;
								}
			if (a == device3){	action3 = Truc[0].action;	//DVE1 STATE
								class3 = Truc[0].hclass;
								display3 = Truc[0].display;
								file3 = Truc[0].file;
								thumb3 = Truc[0].thumb;
								// if (action3 == 'nocg'){	Xkeys80_1.setBacklight(69,'red'); } else {	Xkeys80_1.setBacklight(69,false); }
								}
			if (a == device4){	action4 = Truc[0].action;	//DVE2 STATE
								class4 = Truc[0].hclass;
								display4 = Truc[0].display;
								file4 = Truc[0].file;
								thumb4 = Truc[0].thumb;
								}
			if (a == device5){	action5 = Truc[0].action;	//DVE3 STATE
								class5 = Truc[0].hclass;
								display5 = Truc[0].display;
								file5 = Truc[0].file;
								thumb5 = Truc[0].thumb;
								}
			if (a == device6){	action6 = Truc[0].action;	//DVE4 STATE
								class6 = Truc[0].hclass;
								display6 = Truc[0].display;
								file6 = Truc[0].file;
								thumb6 = Truc[0].thumb;
								}
			if (a == device7){	action7 = Truc[0].action;	//BUG1 STATE
								class7 = Truc[0].hclass;
								display7 = Truc[0].display;
								file7 = Truc[0].file;
								}
			if (a == device8){	action8 = Truc[0].action;	//BUG2 STATE
								class8 = Truc[0].hclass;
								display8 = Truc[0].display;
								file8 = Truc[0].file;
								}
			if (a == device9){	aux1_active = Truc[0].action;	//AUX1 STATE
									obsaux_1 = Truc[0].hclass;
								}
			if (a == device10){	aux2_active = Truc[0].action;	//AUX2 STATE
								obsaux_2 = Truc[0].hclass;
								}
			if (a == device11){	pgm_active = Truc[0].action;	//PGM STATE
								program = Truc[0].hclass;
								}
			if (a == device12){	pvw_active = Truc[0].action;	//PVW STATE
								preview = Truc[0].hclass;
								}
			if (a == device13){	Hplist1 = Truc[0].action;	//PLAYLIST 1 STATE
								Iplist1 = Truc[0].file;
								}
			if (a == device14){	Hplist2 = Truc[0].action;	//PLAYLIST 2 STATE
								Iplist2 = Truc[0].file;
								}
			if (a == device15){	action15 = Truc[0].action;	//SCORE STATE
								class15 = Truc[0].hclass;
								display15 = Truc[0].display;
								file15 = Truc[0].file;
								thumb15 = Truc[0].thumb;
								}
	};

//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (DB1statePrint)
	var DB1stateGet = (a) => {
		const tserver = database.collection("state");
		return new Promise((resolve, reject) => {
			tserver.find({device: a}, { projection: { _id: 0, device: 1, action: 1, hclass: 1, display: 1, file: 1, thumb: 1, loop: 1} }).toArray(function(err, result) {
				err 
					? reject(err) 
					: resolve(result);
				});
			});
	};

// GET PREVIOUS CHOSEN CASPARCG TEMPLATES PER CHANNEL FROM MONGO DB COLLECTION
	async function DBtemplatePrint() {
		let Truc = await DBtemplateGet();
		tempconf = JSON.stringify(Truc);
		temp_retrieve(tempconf, function(err, response){
				if(!err){
					term(response);
				}
			});
		tmp1 = Truc[0].tempname;
		tmp2 = Truc[1].tempname;
		tmp3 = Truc[2].tempname;
		tmp4 = Truc[3].tempname;
		json1 = Truc[0].json;
		json2 = Truc[1].json;
		json3 = Truc[2].json;
		json4 = Truc[3].json;
	}

//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (DBtemplatePrint)
	var DBtemplateGet = () => {
		const tserver = database.collection("template");
		return new Promise((resolve, reject) => {
			tserver.find({}, { projection: { _id: 0, channel: 1, tempname: 1, json: 1} }).toArray(function(err, result) {
				err 
					? reject(err) 
					: resolve(result);
				});
			});
	};
	
// GET STORED TITLE LIST FROM MONGO DB COLLECTION
	async function DBtitlePrint() {
	let truc = await DBtitleGet();
	titleList = JSON.stringify(truc);
	title_retrieve(titleList, function(err, response){
				if(!err){
					term(response);
				}
			});
	}

//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (DBtitlePrint)
	var DBtitleGet = () => {
		const titleTab = database.collection("title");
		return new Promise((resolve, reject) => {
			titleTab.find({}, { projection: { _id: 0, Name: 1, Title: 1} }).toArray(function(err, result) {
				err 
					? reject(err) 
					: resolve(result);
				});
			});
	}

// GET STORED PLAYLSIST FROM MONGO DB COLLECTION
	async function DPlaylistPrint(plist) {
	let truc = await PlaylistGet(plist);
	PLAYList = JSON.stringify(truc);
	plist_retrieve(plist, PLAYList, function(err, response){
				if(!err){
					term(response);
				}
			});
	}

//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (DPlaylistPrint)
	var PlaylistGet = (plist) => {
		const PlistTab = database.collection(plist);
		return new Promise((resolve, reject) => {
			PlistTab.find({}, { projection: { _id: 0, name: 1, duration: 1, timecode: 1} }).toArray(function(err, result) {
				err 
					? reject(err) 
					: resolve(result);
				});
			});
	}

// GET XKEYS KEYBOARD STORED CONFIG FROM MONGO DB COLLECTION (OBS scenes assignment to keys)
	async function DBXkeysPrint() {
	let truc = await DBXkeysGet();
	xKeys = JSON.stringify(truc);
	xkeys_retrieve(xKeys, function(err, response){
				if(!err){ term(response); }
			});
	var xkeysL = JSON.parse(xKeys);
	xkey01 = xkeysL[00]['scenename']
	xkey02 = xkeysL[01]['scenename']
	xkey03 = xkeysL[02]['scenename']
	xkey04 = xkeysL[03]['scenename']
	xkey05 = xkeysL[04]['scenename']
	xkey06 = xkeysL[05]['scenename']
	xkey07 = xkeysL[06]['scenename']
	xkey08 = xkeysL[07]['scenename']
	xkey09 = xkeysL[08]['scenename']
	xkey10 = xkeysL[09]['scenename']
	xkey11 = xkeysL[10]['scenename']
	xkey12 = xkeysL[11]['scenename']
	xkey13 = xkeysL[12]['scenename']
	xkey14 = xkeysL[13]['scenename']
	xkey15 = xkeysL[14]['scenename']
	xkey16 = xkeysL[15]['scenename']
	xkey17 = xkeysL[16]['scenename']
	xkey18 = xkeysL[17]['scenename']
	xkey19 = xkeysL[18]['scenename']
	xkey20 = xkeysL[19]['scenename']
	xkey21 = xkeysL[20]['scenename']
	xkey22 = xkeysL[21]['scenename']
	xkey23 = xkeysL[22]['scenename']
	xkey24 = xkeysL[23]['scenename']
	xkey25 = xkeysL[24]['scenename']
	xkey26 = xkeysL[25]['scenename']
	xkey27 = xkeysL[26]['scenename']
	xkey28 = xkeysL[27]['scenename']
	xkey29 = xkeysL[28]['scenename']
	xkey30 = xkeysL[29]['scenename']
	xkey31 = xkeysL[30]['scenename']
	xkey32 = xkeysL[31]['scenename']
	xkey33 = xkeysL[32]['scenename']
	xkey34 = xkeysL[33]['scenename']
	xkey35 = xkeysL[34]['scenename']
	xkey36 = xkeysL[35]['scenename']
	xkey37 = xkeysL[36]['scenename']
	xkey38 = xkeysL[37]['scenename']
	xkey39 = xkeysL[38]['scenename']
	xkey40 = xkeysL[39]['scenename']
	xkey41 = xkeysL[40]['scenename']
	xkey42 = xkeysL[41]['scenename']
	xkey43 = xkeysL[42]['scenename']
	xkey44 = xkeysL[43]['scenename']
	xkey45 = xkeysL[44]['scenename']
	xkey46 = xkeysL[45]['scenename']
	xkey47 = xkeysL[46]['scenename']
	xkey48 = xkeysL[47]['scenename']
	xkey49 = xkeysL[48]['scenename']
	xkey50 = xkeysL[49]['scenename']
	xkey51 = xkeysL[50]['scenename']
	xkey52 = xkeysL[51]['scenename']
	xkey53 = xkeysL[52]['scenename']
	xkey54 = xkeysL[53]['scenename']
	xkey55 = xkeysL[54]['scenename']
	xkey56 = xkeysL[55]['scenename']
	xkey57 = xkeysL[56]['scenename']
	xkey58 = xkeysL[57]['scenename']
	xkey59 = xkeysL[58]['scenename']
	xkey60 = xkeysL[59]['scenename']
	xkey61 = xkeysL[60]['scenename']
	xkey62 = xkeysL[61]['scenename']
	xkey63 = xkeysL[62]['scenename']
	xkey64 = xkeysL[63]['scenename']
	xkey65 = xkeysL[64]['scenename']
	xkey66 = xkeysL[65]['scenename']
	xkey67 = xkeysL[66]['scenename']
	xkey68 = xkeysL[67]['scenename']
	xkey69 = xkeysL[68]['scenename']
	xkey70 = xkeysL[69]['scenename']
	xkey71 = xkeysL[70]['scenename']
	xkey72 = xkeysL[71]['scenename']
	xkey73 = xkeysL[72]['scenename']
	xkey74 = xkeysL[73]['scenename']
	xkey75 = xkeysL[74]['scenename']
	xkey76 = xkeysL[75]['scenename']
	xkey77 = xkeysL[76]['scenename']
	xkey78 = xkeysL[77]['scenename']
	xkey79 = xkeysL[78]['scenename']
	xkey80 = xkeysL[79]['scenename']
	}

//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (DBXkeysPrint)
	var DBXkeysGet = () => {
		const txkeys = database.collection("xkeys");
		return new Promise((resolve, reject) => {
			txkeys.find({}, { projection: { _id: 0, xkid: 1, scenename: 1} }).sort({xkid: 1}).toArray(function(err, result) {
				err 
					? reject(err) 
					: resolve(result);
				});
			});
	}

// GET PREVIOUS CHOSEN CASPARCG TEMPLATES PER CHANNEL FROM MONGO DB COLLECTION
	async function DBscorePrint() {
		let thumb = await DBscoreGet();
		scoreConf = JSON.stringify(thumb);
		Score_retrieve(scoreConf, function(err, response){
				if(!err){
					term(response);
				}
			});
	}

//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (DBtemplatePrint)
	var DBscoreGet = () => {
		const tserver = database.collection("score");
		return new Promise((resolve, reject) => {
			tserver.find({}, { projection: { _id: 0, Gamer: 1, Score: 1, color: 1} }).toArray(function(err, result) {
				err 
					? reject(err) 
					: resolve(result);
				});
			});
	};

//LET'S RETRIEVE CASPARCG & STATES INFOS WHEN APP START
	DBignitPrint();
	DBstatePrint();

// UPDATE SERVER CONFIG IN DATABASE
	async function DBupdateSrv(a,b) {
		const database = client.db("liveprodb");
		const tcollec = database.collection("server");
		const filter = { constant: a };
		const options = { upsert: true };
		const updField = {
		  $set: {
			var: b,
		  },
		};
		const result = await tcollec.updateOne(filter, updField, options);
	DBccgPrint();
	}

// UPDATE XKEYS ASSIGNMENT IN DATABASE
	async function DBupdateXkey(a,b) {
		const database = client.db("liveprodb");
		const tcollec = database.collection("xkeys");
		const filter = { xkid: a };
		const options = { upsert: true };
		const updField = {
		  $set: {
			scenename: b,
		  },
		};
		const result = await tcollec.updateOne(filter, updField, options);
	DBXkeysPrint();
	}

// UPDATE ONE DEVICE OR FUCTION APP SATE IN DATABASE
	async function DBupdateState(a,b,c,d,e,f,g) {
		const database = client.db("liveprodb");
		const tcollec = database.collection("state");
		const filter = { device: a };
		const options = { upsert: true };
		const updField = {
		  $set: {
			action: b, hclass: c, display: d, file: e, thumb: f, loop: g,
		  },
		};
		const result = await tcollec.updateOne(filter, updField, options);
		DB1statePrint(a);
	}

// UPDATE LOWTHIRD LIST IN DATABASE
	async function DBdropTitle() { //EMPTY LIST
		const database = client.db("liveprodb");
		const tcollec = database.collection("title");
		const result = await tcollec.deleteMany();
	}
	async function DBimportTitle(a) {
		const database = client.db("liveprodb");
		const tcollec = database.collection("title");
		const result = await tcollec.insertMany(a, {safe:true}, function(err){ if(err){console.log(err);}})
			setTimeout(function(){
				DBtitlePrint();	
			}, 50);
	}

// UPDATE SCOREBOARD IN DATABASE
	async function DBdropScore() { //EMPTY LIST
		const database = client.db("liveprodb");
		const tcollec = database.collection("score");
		const result = await tcollec.deleteMany();
	}	
	async function DBimportScore(a) {
		const database = client.db("liveprodb");
		const tcollec = database.collection("score");
		const result = await tcollec.insertMany(a, {safe:true}, function(err){ if(err){console.log(err);}});
			setTimeout(function(){
				DBscorePrint();	
			}, 50);
	}
// UPDATE CASPARCG TEMPLATE OF A CHANNEL IN DATABASE
	async function DBupdateTemplate(a,b,c) {
		const database = client.db("liveprodb");
		const tcollec = database.collection("template");
		const filter = { channel: a };
		const options = { upsert: true };
		const updField = {
		  $set: {
			tempname: b, json: c,
		  },
		};
		const result = await tcollec.updateOne(filter, updField, options);
			setTimeout(function(){
				DBtemplatePrint();
			}, 50);		
	}

// UPDATE PLAYLIST IN DATABASE
	async function DBupdatePlist(a,b) {
		const database = client.db("liveprodb");
		const tcollec = database.collection(a);
		const result = await tcollec.insertMany(b, {safe:true}, function(err){ if(err){console.log(err);}});
			setTimeout(function(){
				DPlaylistPrint(a);
			}, 50);
	}

// REMOVE PLAYLIST IN DATABASE
	async function DBdropPlist(a) {
		const database = client.db("liveprodb");
		const tcollec = database.collection(a);
		const result = await tcollec.deleteMany();
			setTimeout(function(){
				DPlaylistPrint(a);
			}, 50);
	}
	
	function xKey_ignit() {
				myXkeys.setBacklight(pgm_active, 'red'); //red light POWER ON DB stored active PGM source
				myXkeys.setBacklight(pvw_active, 'red'); //red light POWER ON DB stored active PVW source
				myXkeys.setBacklight(aux1_active, 'red'); //red light POWER ON DB stored active AUX1 source
				myXkeys.setBacklight(aux2_active, 'red'); //red light POWER ON DB stored active AUX2 source
				if (action3 == 'nocg'){ myXkeys.setBacklight('69', 'red')} else { myXkeys.setBacklight('69', false)}; //red light POWER ON or OFF DVE1 button
				if (action4 == 'nocg'){ myXkeys.setBacklight('77', 'red')} else { myXkeys.setBacklight('77', false)}; //red light POWER ON or OFF DVE2 button
				if (action5 == 'nocg'){ myXkeys.setBacklight('70', 'red')} else { myXkeys.setBacklight('70', false)}; //red light POWER ON or OFF DVE3 button
				if (action6 == 'nocg'){ myXkeys.setBacklight('78', 'red')} else { myXkeys.setBacklight('78', false)}; //red light POWER ON or OFF DVE4 button		
				if (action15 == 'nocg'){ myXkeys.setBacklight('60', 'red')} else { myXkeys.setBacklight('60', false)}; //red light POWER ON or OFF SCORE button		
						}	

//SET UP XKEYS PANEL
	const HID = require('node-hid')
	const { XKeysWatcher } = require('xkeys');
	const watcher = new XKeysWatcher();

		

		watcher.on('connected', (Xkeys80_1) => {
			myXkeys = Xkeys80_1;
						connectedXKeys = 'true';
						term("\n"+dateTimeNow()+`\t^#^r^W XKEYS GET ^ \tConnected from any Xkeys panel of type ${Xkeys80_1.info.name} `+connectedXKeys);
			Xkeys80_1.on('reconnected', () => {
						connectedXKeys = 'true';
						term("\n"+dateTimeNow()+`\t^#^r^W XKEYS GET ^ \tReconnected from any Xkeys panel of type ${Xkeys80_1.info.name} `+connectedXKeys);
					})

			Xkeys80_1.on('disconnected', () => {
						// Clean up stuff
						Xkeys80_1.removeAllListeners()
						connectedXKeys = 'false';
						term("\n"+dateTimeNow()+`\t^#^r^W XKEYS OUT ^ \tDisconnected from any Xkeys panel of type ${Xkeys80_1.info.name} `+connectedXKeys);
					})
			Xkeys80_1.on('error', err => {
						connectedXKeys = 'false';
						term("\n"+dateTimeNow()+"\t^#^M^W XKEYS OUT ^ \t\tDisconnected from any Xkeys panel "+connectedXKeys);
			});

	// INITIALIZING THE XKEY PANEL
		for (i = 5; i < 62; i=i+8){
						Xkeys80_1.setBacklight(i, '0000ff'); //blue light POWER ON all AUX1 line buttons  
						}
		for (i = 6; i < 63; i=i+8){
						Xkeys80_1.setBacklight(i, '0000ff'); //blue light POWER ON all AUX2 buttons  
						}				
		for (i = 7; i < 64; i=i+8){
						Xkeys80_1.setBacklight(i, '0000ff'); //blue light POWER ON all PGM line buttons  
						}
		for (i = 8; i < 65; i=i+8){
						Xkeys80_1.setBacklight(i, '0000ff'); //blue light POWER ON all PVW line buttons  
						}
		for (i = 71; i < 80; i=i+8){
						Xkeys80_1.setBacklight(i, 'red'); //red light POWER ON AUTO buttons
						}
		for (i = 72; i < 81; i=i+8){
						Xkeys80_1.setBacklight(i, 'red'); //red light POWER ON CUT buttons
						}	              
		if (pgm_active != undefined){xKey_ignit();}
		Xkeys80_1.on('down', a => {
	
			//START STREAMING
				// if (a == '73') {
					// console.log(streamS);
					// if (streamS != false){	obs.send('StopStreaming').catch(console.error);
											// Xkeys80_1.setBacklight('73', 'red', true); //flash red light POWER ON REC button
											// Xkeys80_1.setBacklight('74', 'red', true); //flash red light POWER ON REC button	
											// streamS = false;
					// }			else	{	obs.send('StartStreaming').catch(console.error);
											// Xkeys80_1.setBacklight('73', false); //flash red light POWER OFF REC button
											// Xkeys80_1.setBacklight('74', false); //flash red light POWER OFF REC button	
											// streamS = true;
					// }
				
				// }
						
			//CUT SWITCH  
				if (a == '72') {
				transButton(a, function(err, response){	if(!err){ term(response);	}	});	
				}
			//AUTO SWITCH 
				if (a == '71') {
				transButton(a, function(err, response){	if(!err){ term(response);	}	});	
											Xkeys80_1.setBacklight(a, 'red', true); //red flashing on button AUTO										
											Xkeys80_1.setBacklight(79, 'red', true); //red flashing on button AUTO										
											setTimeout(function(){
												Xkeys80_1.setBacklight(a, 'red'); // Stop red flashing on button AUTO										
												Xkeys80_1.setBacklight(79, 'red'); //Stop red flashing on button AUTO
												}, 600);
				}
				
				var cnumber = parseInt(a);
				var cname = 'xkey'+pad2(cnumber);

			//AUX1 XKEYS ACTIONS
				if (a == '5' || a == '13' || a == '21' || a == '29' || a == '37' || a == '45' || a == '53' || a == '61') {
					KeyChange(a, 'aux1', eval(cname), 'real', function(err, response){
						if(!err){ term(response); }
					});
				}

			//AUX2 XKEYS ACTIONS
				if (a == '6' || a == '14' || a == '22' || a == '30' || a == '38' || a == '46' || a == '54' || a == '62') {
					KeyChange(a, 'aux2', eval(cname), 'real', function(err, response){
						if(!err){ term(response); }
					});
				}

			//PROGRAM XKEYS ACTIONS
				if (a == '7' || a == '15' || a == '23' || a == '31' || a == '39' || a == '47' || a == '55' || a == '63') {
					KeyChange(a, 'pgm', eval(cname), 'real', function(err, response){
						if(!err){ term(response); }
					});
				}

			//PREVIEW XKEYS ACTIONS
				if (a == '8' || a == '16' || a == '24' || a == '32' || a == '40' || a == '48' || a == '56' || a == '64') {
					KeyChange(a, 'pvw', eval(cname), 'real', function(err, response){
						if(!err){ term(response); }
					});
				}

			//SHOW BUGS
				if (a == '68' ) {
					IOSendData(['web'], 'sClick', 'bug1_box');
					if (action7 == 'bug') { action7 = 'nobug';}
					else { action7 = 'bug';}
				}
				
				if (a == '76' ) {
					IOSendData(['web'], 'sClick', 'bug2_box');
					if (action8 == 'bug') { action8 = 'nobug';}
					else { action8 = 'bug';}
				}

			//SHOW DVE
				if (a == '69' ) {		//DVE 1 BOX
					IOSendData(['web'], 'sClick', 'dve1_box');
					if (action3 == 'cg') {
						Xkeys80_1.setBacklight(a, 'red'); //red light POWER ON selected button
						action3 = 'nocg';}
					else {
						Xkeys80_1.setBacklight(a, false); //red light POWER OFF selected button
						action3 = 'cg';}
				}
				if (a == '77' ) {		//DVE 2 BOX
					IOSendData(['web'], 'sClick', 'dve2_box');
					if (action4 == 'cg') {
						Xkeys80_1.setBacklight(a, 'red'); //red light POWER ON selected button
						action4 = 'nocg';}
					else {
						Xkeys80_1.setBacklight(a, false); //red light POWER OFF selected button
						action4 = 'cg';}
					}
				if (a == '70' ) {		//DVE 3 BOX
					IOSendData(['web'], 'sClick', 'dve3_box');
					if (action5 == 'cg') {
						Xkeys80_1.setBacklight(a, 'red'); //red light POWER ON selected button
						action5 = 'nocg';}
					else {
						Xkeys80_1.setBacklight(a, false); //red light POWER OFF selected button
						action5 = 'cg';}
					}
				if (a == '78' ) {		//DVE 4 BOX
					IOSendData(['web'], 'sClick', 'dve4_box');
					if (action6 == 'cg') {
						Xkeys80_1.setBacklight(a, 'red'); //red light POWER ON selected button
						action6 = 'nocg';}
					else {
						Xkeys80_1.setBacklight(a, false); //red light POWER OFF selected button
						action6 = 'cg';}
					}
				if (a == '60' ) {		//SCORE BOX
					IOSendData(['web'], 'sClick', 'score_box');
					if (action15 == 'cg') {
						Xkeys80_1.setBacklight(a, 'red'); //red light POWER ON selected button
						action15 = 'nocg';}
					else {
						Xkeys80_1.setBacklight(a, false); //red light POWER OFF selected button
						action15 = 'cg';}
					}
					});
	});

	function pad2(number) {	//LITTLE FUNCTION THAT ADD A ZERO TO INTEGER < 0 (01,02,03...)
	   return (number < 10 ? '0' : '') + number
	}

	function transButton(a,callback)	{ //MIX & CUT SWITCH FROM XKEYS OR VIRTUAL PANEL
		pgm_active = parseInt(pgm_active) + 1;
		pvw_active = parseInt(pvw_active) - 1;
			//CUT
				if (a == '72' ){	obs.send('SetCurrentTransition', { 'transition-name': 'Cut'  }).catch(err => {});
									obs.send('SetCurrentScene', { 'scene-name': preview  }).catch(err => {term("\n"+dateTimeNow()+"\t^#^M^W OBS ERROR ^ \tStart OBS or check network setup")});	
									obs.send('SetPreviewScene', { 'scene-name': program  }).catch(err => {term("\n"+dateTimeNow()+"\t^#^M^W OBS ERROR ^ \tStart OBS or check network setup")});	
									term("\n"+dateTimeNow()+"\t^#^M^W CUTSWITCH ^ \t=> MOVE PGM : "+program+' TO '+preview);}
			//AUTO MIX 
				if (a == '71' ){	obs.send('SetCurrentTransition', { 'transition-name': 'Fade'  }).catch(err => {term("\n"+dateTimeNow()+"\t^#^M^W OBS ERROR ^ \tStart OBS or check network setup")});	
									obs.send('SetTransitionDuration', { 'duration': 1000  }).catch(err => {term("\n"+dateTimeNow()+"\t^#^M^W OBS ERROR ^ \tStart OBS or check network setup")});	
									obs.send('TransitionToProgram', { 'with-transition.name': 'Fade' }).catch(err => {term("\n"+dateTimeNow()+"\t^#^M^W OBS ERROR ^ \tStart OBS or check network setup")});	
									var b = 79;
									term("\n"+dateTimeNow()+"\t^#^M^W MIXSWITCH ^ \t=> MOVE PGM : "+program+' TO '+preview);								
											setTimeout(function(){
												obs.send('SetPreviewScene', { 'scene-name': program  }).catch(err => {term("\n"+dateTimeNow()+"\t^#^M^W OBS ERROR ^ \tStart OBS or check network setup")});	
												var tempo = preview;
												preview = program;
												program = tempo;
												tempo = pgm_active;
												pgm_active = pad2(pvw_active);
												pvw_active = pad2(tempo);
												}, 600);
									
								}						
	}				
 
// OSC PROTOCOL
	var oscClient = require('osc-min');
	var udpConnection = require("dgram");

// SAVED CONNECTIONS
	var CasparCG_Connection;
	var socketIO_Connection = socket_io;

// VARIABLES
	var timecodeVars = {
		videoPresent: null,
		currentTime: 0,
		currentTimeConverted: '00:00:00:00',
		currentDuration: 0,
		currentDurationConverted: '00:00:00:00',
		currentCountDown: 0,
		currentCountDownConverted: 0,
		currentProgressPercent: 0
	}

	var timecode2Vars = {
		video2Present: null,
		current2Time: 0,
		current2TimeConverted: '00:00:00:00',
		current2Duration: 0,
		current2DurationConverted: '00:00:00:00',
		current2CountDown: 0,
		current2CountDownConverted: 0,
		current2ProgressPercent: 0
	}

// Start SocketIO Connector
	socketIOConnector(function(err, response){
		if(!err){
			term(response);
		}
		else{
			if(err == 'disconnect'){
				term(response);
			}
		}
	});

// SOCKETIO CONNECTOR
	function socketIOConnector(callback){		
		socket_server.listen(globalSettings.socketIO.port);		// SOCKET IO LISTEN		
		socketIO_Connection.on('connection', function(socket){	// SOCKET IO OPEN			
		var roomName = socket.handshake.query.room;				// ADD CLIENT TO ROOM  (OPTIONAL)
		socket.join(roomName);
			if(roomName == 'web'){
				callback(undefined, "\n"+dateTimeNow()+"\t^#^g^W SOCKET IO ^ \tClient Connected with ID: "+socket.id)
			}		
			socket.on('disconnect', function(){              	// SOCKET.IO CLIENT DISCONNECT
				if(roomName == 'web'){
					callback('disconnect', "\n"+dateTimeNow()+"\t^#^r^W SOCKET IO ^ \tClient Disconnected from ID: "+socket.id)
				}
			});			
			socket.on('UI|action', function(uiActionReceived){	// GET ACTION FROM UI
				uiActions(uiActionReceived);
				callback(undefined, "\n"+dateTimeNow()+"\t^#^g^W SOCKET IO ^ \tReceived command for ACTION: "+uiActionReceived.action)
			}); 
		});
	}


// UI Actions
	function uiActions(uiActionReceived){	
		if (uiActionReceived.action == 'ccgGet'){			//PUSH CASPARCG, OBS MAIN & AUX CONFIG STORED IN DB TO WEBAPP
			DBccgPrint();	
		// GET CCG MEDIAS LIST	
			ccg_cls(cgsrv, cgscan, function(err, response){
					if(!err){term(response);}
				});

		// GET CCG TEMPLATES LIST	
			ccg_tls(cgsrv, cgscan, function(err, response){
					if(!err){term(response);}
				});
			// ccg_info(function(err, response){
				// if(!err){term(response);}
			// });
		}
		if (uiActionReceived.action == 'obsGet'){			//PUSH CASPARCG, OBS MAIN & AUX CONFIG STORED IN DB TO WEBAPP
			DBobsPrint();
		}
		if (uiActionReceived.action == 'auxGet'){			//PUSH CASPARCG, OBS MAIN & AUX CONFIG STORED IN DB TO WEBAPP
			DBauxPrint();
		}
		if (uiActionReceived.action == 'CCGsave'){			//UPDATE CASPARCG CONFIG FROM WEBAPP (to variables & DB)
			cgsrv = uiActionReceived.srv;
			DBupdateSrv('cgsrv',cgsrv); 
			cgamcp = uiActionReceived.port1;
			DBupdateSrv('amcport',cgamcp); 
			cgosc = uiActionReceived.port2;
			DBupdateSrv('oscport',cgosc); 
			cgscan = uiActionReceived.port3;
			DBupdateSrv('scanport',cgscan); 
			nCasp = nCasp + 1;
			DBccgPrint();			
		// START CCG CONNECTOR
				ccgConnector(cgsrv, cgamcp, function(err, response){
				if(!err){
					ccgConnectOSC(cgosc);
					term(response); }
				else {
					if(err == 'disconnected'){term("\n"+dateTimeNow()+"\t^#^y^B CASPAR CG^ \tDisconnected from CasparCG Server :"+cgsrv+":"+cgamcp);}}
				});		
				
		// GET CCG MEDIAS LIST	
			ccg_cls(cgsrv, cgscan, function(err, response){
					if(!err){term(response);}
				});

		// GET CCG TEMPLATES LIST	
			ccg_tls(cgsrv, cgscan, function(err, response){
					if(!err){term(response);}
				});
		}
		if (uiActionReceived.action == 'OBSsave'){			//UPDATE OBS CONFIG FROM WEBAPP (to variables & DB)		
			obsOld = obsAddr;
			obssrv = uiActionReceived.obssrv;
			DBupdateSrv('obssrv',obssrv); 
			obsport = uiActionReceived.obsport;
			DBupdateSrv('obsport',obsport); 
			obspass = uiActionReceived.obspass;
			DBupdateSrv('obspass',obspass); 
			obsAddr = obssrv+':'+obsport;		
			DBobsPrint();
		}	
		if(uiActionReceived.action == 'AUXsave'){			//UPDATE OBS AUX CONFIG FROM WEBAPP (to variables & DB)		
			auxOld = auxAddr;
			auxsrv = uiActionReceived.auxsrv;
			DBupdateSrv('auxsrv',auxsrv); 
			auxport = uiActionReceived.auxport;
			DBupdateSrv('auxport',auxport); 
			auxpass = uiActionReceived.auxpass;
			DBupdateSrv('auxpass',auxpass); 
			auxAddr =  auxsrv+':'+auxport;
			DBauxPrint();
		}	
		if(uiActionReceived.action == 'tempGet'){			//PUSH CASPARCG TEMPLATES PER CHANNEL STORED IN DB TO WEBAPP
			DBtemplatePrint();
		}				 
		if(uiActionReceived.action == 'StateGet'){			//RECEIVES DEMAND FROM WEBAPP : STATUS OF ALL DEVICES
			DBstatePrint();
		}			 
		if(uiActionReceived.action == 'ScoreGet'){			//RECEIVES DEMAND FROM WEBAPP : SCORE DATAS
			DBscorePrint();
		}
		if(uiActionReceived.action == 'xkeysget'){			//PUSH XKEYS CONFIG STORED IN DB TO WEBAPP
			DBXkeysPrint();
		}
		if(uiActionReceived.action == 'titleGet'){			//PUSH TITLES LIST STORED IN DB TO WEBAPP
			DBtitlePrint();
		}
		if(uiActionReceived.action == 'plistGet'){			//PUSH PLAYLIST STORED IN DB TO WEBAPP
			var Plist = uiActionReceived.plist;
			DPlaylistPrint(Plist);
		}
		if(uiActionReceived.action == 'configUP'){			//UPDATE 1 CONFIG ELEMENT (CasparCG channels & Xkeys assignment) FROM WEBAPP (to variables & DB)
			var arg1 = uiActionReceived.arg1;
			var arg2 = uiActionReceived.arg2;
				if (arg1 == 'vtr1'){ vtr1 = arg2; DBupdateSrv('vtr1',vtr1);}
				if (arg1 == 'vtr2'){ vtr2 = arg2; DBupdateSrv('vtr2',vtr2);}
				if (arg1 == 'bug1'){ bug1 = arg2; DBupdateSrv('bug1',bug1);}
				if (arg1 == 'bug2'){ bug2 = arg2; DBupdateSrv('bug2',bug2);}
				if (arg1 == 'dve1'){ dve1 = arg2; DBupdateSrv('dve1',dve1);}
				if (arg1 == 'dve2'){ dve2 = arg2; DBupdateSrv('dve2',dve2);}
				if (arg1 == 'dve3'){ dve3 = arg2; DBupdateSrv('dve3',dve3);}
				if (arg1 == 'dve4'){ dve4 = arg2; DBupdateSrv('dve4',dve4);}
				if (arg1 == 'score'){ score = arg2; DBupdateSrv('score',score);}
				if (arg1 == 'lvtr1'){ lvtr1 = arg2; DBupdateSrv('lvtr1',lvtr1);}
				if (arg1 == 'lvtr2'){ lvtr2 = arg2; DBupdateSrv('lvtr2',lvtr2);}
				if (arg1 == 'lbug1'){ lbug1 = arg2; DBupdateSrv('lbug1',lbug1);}
				if (arg1 == 'lbug2'){ lbug2 = arg2; DBupdateSrv('lbug2',lbug2);}
				if (arg1 == 'ldve1'){ ldve1 = arg2; DBupdateSrv('ldve1',ldve1);}
				if (arg1 == 'ldve2'){ ldve2 = arg2; DBupdateSrv('ldve2',ldve2);}
				if (arg1 == 'ldve3'){ ldve3 = arg2; DBupdateSrv('ldve3',ldve3);}
				if (arg1 == 'ldve4'){ ldve4 = arg2; DBupdateSrv('ldve4',ldve4);}
				if (arg1 == 'lscore'){ lscore = arg2; DBupdateSrv('lscore',lscore);}
				if (arg1 == '04'){ xkey05 = arg2; DBupdateXkey('04',xkey05); }
				if (arg1 == '05'){ xkey06 = arg2; DBupdateXkey('05',xkey06); }
				if (arg1 == '06'){ xkey07 = arg2; DBupdateXkey('06',xkey07); }
				if (arg1 == '07'){ xkey08 = arg2; DBupdateXkey('07',xkey08); }
				if (arg1 == '12'){ xkey13 = arg2; DBupdateXkey('12',xkey13); }
				if (arg1 == '13'){ xkey14 = arg2; DBupdateXkey('13',xkey14); }
				if (arg1 == '14'){ xkey15 = arg2; DBupdateXkey('14',xkey15); }
				if (arg1 == '15'){ xkey16 = arg2; DBupdateXkey('15',xkey16); }
				if (arg1 == '20'){ xkey21 = arg2; DBupdateXkey('20',xkey21); } 
				if (arg1 == '21'){ xkey22 = arg2; DBupdateXkey('21',xkey22); }
				if (arg1 == '22'){ xkey23 = arg2; DBupdateXkey('22',xkey23); }
				if (arg1 == '23'){ xkey24 = arg2; DBupdateXkey('23',xkey24); }
				if (arg1 == '28'){ xkey29 = arg2; DBupdateXkey('28',xkey29); }
				if (arg1 == '29'){ xkey30 = arg2; DBupdateXkey('29',xkey30); }
				if (arg1 == '30'){ xkey31 = arg2; DBupdateXkey('30',xkey31); }
				if (arg1 == '31'){ xkey32 = arg2; DBupdateXkey('31',xkey32); }
				if (arg1 == '36'){ xkey37 = arg2; DBupdateXkey('36',xkey37); }
				if (arg1 == '37'){ xkey38 = arg2; DBupdateXkey('37',xkey38); }
				if (arg1 == '38'){ xkey39 = arg2; DBupdateXkey('38',xkey39); }
				if (arg1 == '39'){ xkey40 = arg2; DBupdateXkey('39',xkey40); }
				if (arg1 == '44'){ xkey45 = arg2; DBupdateXkey('44',xkey45); }
				if (arg1 == '45'){ xkey46 = arg2; DBupdateXkey('45',xkey46); }
				if (arg1 == '46'){ xkey47 = arg2; DBupdateXkey('46',xkey47); }
				if (arg1 == '47'){ xkey48 = arg2; DBupdateXkey('47',xkey48); }
				if (arg1 == '52'){ xkey53 = arg2; DBupdateXkey('52',xkey53); }
				if (arg1 == '53'){ xkey54 = arg2; DBupdateXkey('53',xkey54); }
				if (arg1 == '54'){ xkey55 = arg2; DBupdateXkey('54',xkey55); }
				if (arg1 == '55'){ xkey56 = arg2; DBupdateXkey('55',xkey56); }
				if (arg1 == '60'){ xkey61 = arg2; DBupdateXkey('60',xkey31); }
				if (arg1 == '61'){ xkey62 = arg2; DBupdateXkey('61',xkey62); }
				if (arg1 == '62'){ xkey63 = arg2; DBupdateXkey('62',xkey63); }
				if (arg1 == '63'){ xkey64 = arg2; DBupdateXkey('63',xkey64); }
			term("\n"+dateTimeNow()+"\t^#^g^W CASPAR CG ^ \tDevice:   "+arg1+" now on channel: "+arg2);
		}	
		if(uiActionReceived.action == 'saveState') {		//RECEIVES VCR & DVE SATES CHANGES FROM THE WEBAPP
			var device = uiActionReceived.device;
			var state = uiActionReceived.state;
			var divclass = uiActionReceived.divclass;
			var display = uiActionReceived.display;
			var file = uiActionReceived.file;
			var thumb = uiActionReceived.thumb;
			var loop = uiActionReceived.loop;
				if (device == 'vtr1_box'){ action1 = state; class1 = divclass; display1 = display; file1 = file; thumb1 = thumb; loop1 = loop;}
				if (device == 'vtr2_box'){ action2 = state; class2 = divclass; display2 = display; file2 = file; thumb2 = thumb; loop2 = loop;}
			DBupdateState(device, state, divclass, display, file, thumb, loop).catch(err => {  console.log(err);});
		}
		if(uiActionReceived.action == 'saveTemplate') {		//RECEIVES TEMPLATES SETUP CHANGES FROM THE WEBAPP 
			var channel = uiActionReceived.channel;
			var tempname = uiActionReceived.tempname;
			var json = uiActionReceived.json;
			DBupdateTemplate(channel, tempname, json).catch(err => { console.log(err) });
		}	
		if(uiActionReceived.action == 'saveTitle') {		//RECEIVES CHANGES FROM THE WEBAPP TITLES LIST
			var title = uiActionReceived.title;
					DBdropTitle().then( () => DBimportTitle(title).catch(err => { console.log(err) }));	
		}	
		if(uiActionReceived.action == 'saveScore') {		//RECEIVES CHANGES FROM THE WEBAPP SCORING BOARD LIST
			var scoreboard = uiActionReceived.scoreboard;
					DBdropScore().then( () => DBimportScore(scoreboard).catch(err => { console.log(err) }));
		}
		if(uiActionReceived.action == 'savePlist') {		//RECEIVES CHANGES FROM THE WEBAPP PLAYLIST
			var plist = uiActionReceived.plist;
			var plistTab = uiActionReceived.plistTab;
					DBdropPlist(plist).then( () => DBupdatePlist(plist, plistTab).catch(err => { console.log(err) }));
		}
		
		if(uiActionReceived.action == 'VirtualKey') {		//RECEIVES ACTION FROM THE WEBAPP VIRTUAL XKEYS PANEL
			var tKey = uiActionReceived.arg1;
			var tline = uiActionReceived.arg2;
			var tName = uiActionReceived.arg3;
			KeyChange(tKey, tline, tName, 'virtual', function(err, response){
				if(!err){ term(response); }
			});
		}
		if(uiActionReceived.action == 'transKey') {			//RECEIVES TRANSITION ACTION FROM WEBAPP VIRTUAL XKEYS CONSOLE
			var tKey = uiActionReceived.arg;
			transButton(tKey, function(err, response){
				if(!err){ term(response); }
			});
		}
		if(uiActionReceived.action == 'tls'){				//PUSH CASPARCG TEMPLATES LIST FROM THE FOLDER TO WEBAPP
			ccg_tls(cgsrv, cgscan, function(err, response){
				if(!err){ term(response); }
			});
		}		
		if(uiActionReceived.action == 'cls'){				//PUSH CASPARCG MEDIAS LIST FROM THE FOLDER TO WEBAPP
			ccg_cls(cgsrv, cgscan, function(err, response){
				if(!err){ term(response); }
			});
		}		
		if(uiActionReceived.action == 'load'){				//LOAD A VIDEO TO CASPARCG CHANNEL
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			videoFile = uiActionReceived.file;
			options = uiActionReceived.options;
			ccg_LoadMedia(ccgChannel, ccgLayer, videoFile, options, function(err, response){
				if(!err){ term(response); }
			});
		}		
		if(uiActionReceived.action == 'bugload'){				//LOAD AN IMAGE TO CASPARCG CHANNEL
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			videoFile = uiActionReceived.file;
			bugbox = uiActionReceived.device;	
			state = uiActionReceived.state;
			divclass = uiActionReceived.divclass;
			display = uiActionReceived.display;
			file = uiActionReceived.file;
			thumb = uiActionReceived.thumb;	
			options ='';
				if (bugbox == 'bug1_box'){ action7 = state; class7 = divclass; display7 = display; file7 = file; thumb7 = thumb; j = '68'; }
				if (bugbox == 'bug2_box'){ action8 = state; class8 = divclass; display8 = display; file8 = file; thumb8 = thumb; j = '76'; }
			if (connectedXKeys == 'true') { myXkeys.setBacklight( j, 'red')}; //red light POWER ON selected button 			
			DBupdateState(bugbox, state, divclass, display, file, thumb).catch(err => {  console.log(err);});
			ccg_LoadMedia(ccgChannel, ccgLayer, videoFile, options, function(err, response){
				if(!err){ term(response); }
			});
		}		
		if(uiActionReceived.action == 'loadbg'){			//LOAD IN BACKGROUND A CASPARCG MEDIA (VIDEO OR IMAGE) => PLAYLIST MODE
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			videoFile = uiActionReceived.file;
			ccg_LoadbgMedia(ccgChannel, ccgLayer, videoFile, function(err, response){
				if(!err){ term(response); }
			});
		}
		if(uiActionReceived.action == 'play'){				//PLAY A CASPARCG MEDIA (VIDEO OR IMAGE)
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			videoFile = uiActionReceived.file;
			options = uiActionReceived.options;
			ccg_PlayMedia(ccgChannel, ccgLayer, videoFile, options, function(err, response){
				if(!err){ term(response); }
			});
		}		
		if(uiActionReceived.action == 'call'){				//POSITION A CASPARCG MEDIA (VIDEO OR IMAGE) AT A CERTAIN TIMECODE
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			options = uiActionReceived.options;
			ccg_CallMedia(ccgChannel, ccgLayer, options, function(err, response){
				if(!err){ term(response); }
			});
		}
		if(uiActionReceived.action == 'pause'){				//PAUSE A CASPARCG MEDIA (VIDEO OR IMAGE)
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			ccg_PauseMedia(ccgChannel, ccgLayer, function(err, response){
				if(!err){ term(response); }
			});
		}
		if(uiActionReceived.action == 'resume'){			//RESUME A CASPARCG MEDIA (VIDEO OR IMAGE)
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			ccg_ResumeMedia(ccgChannel, ccgLayer, function(err, response){
				if(!err){ term(response); }
			});
		}
		if(uiActionReceived.action == 'stop'){				//STOP A CASPARCG MEDIA (VIDEO OR IMAGE)
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			ccg_StopMedia(ccgChannel, ccgLayer, function(err, response){
				if(!err){ term(response); }
			});
		}			
		if(uiActionReceived.action == 'bugstop'){				//LOAD AN IMAGE TO CASPARCG CHANNEL
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			bugbox = uiActionReceived.device;	
			state = uiActionReceived.state;
			divclass = uiActionReceived.divclass;
			display = uiActionReceived.display;
			file = uiActionReceived.file;
			thumb = uiActionReceived.thumb;	
				if (bugbox == 'bug1_box'){ action7 = state; class7 = divclass; display7 = display; file7 = file; thumb7 = thumb; j = '68'; }
				if (bugbox == 'bug2_box'){ action8 = state; class8 = divclass; display8 = display; file8 = file; thumb8 = thumb; j = '76'; }
			if (connectedXKeys == 'true') { myXkeys.setBacklight( j, false)};//red light POWER OFF selected button
			DBupdateState(bugbox, state, divclass, display, file, thumb).catch(err => {  console.log(err);});
			ccg_StopMedia(ccgChannel, ccgLayer, function(err, response){
				if(!err){ term(response); }
			});
		}		
		if(uiActionReceived.action == 'cg'){				//PLAY A CASPARCG TEMPLATE
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			templateName = uiActionReceived.template;
			tempData = uiActionReceived.data;
			dvebox = uiActionReceived.device;
			state = uiActionReceived.state;
			divclass = uiActionReceived.divclass;
			display = uiActionReceived.display;
			file = uiActionReceived.file;
			thumb = uiActionReceived.thumb;
			term("\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tTemplates received :"+file)
				if (dvebox == 'dve1_box'){ action3 = state; class3 = divclass; display3 = display; file3 = file; thumb3 = thumb; j = '69'};
				if (dvebox == 'dve2_box'){ action4 = state; class4 = divclass; display4 = display; file4 = file; thumb4 = thumb; j = '77'};
				if (dvebox == 'dve3_box'){ action5 = state; class5 = divclass; display5 = display; file5 = file; thumb5 = thumb; j = '70'};
				if (dvebox == 'dve4_box'){ action6 = state; class6 = divclass; display6 = display; file6 = file; thumb6 = thumb; j = '78'};
				if (dvebox == 'score_box'){ action15 = state; class15 = divclass; display15 = display; file15 = file; thumb15 = thumb; j = '60';
					Gamer1 = thumb[0].Gamer;
					Score1 = thumb[0].Score;
					Gamer2 = thumb[1].Gamer;
					Score2 = thumb[1].Score;
					Gamer3 = thumb[2].Gamer;
					Score3 = thumb[2].Score;
					Gamer4 = thumb[3].Gamer;
					Score4 = thumb[3].Score;
					Gamer5 = thumb[4].Gamer;
					Score5 = thumb[4].Score;
					Gamer6 = thumb[5].Gamer;
					Score6 = thumb[5].Score;
					Gamer7 = thumb[6].Gamer;
					Score7 = thumb[6].Score;
					Gamer8 = thumb[7].Gamer;
					Score8 = thumb[7].Score;
					Gamer9 = thumb[8].Gamer;
					Score9 = thumb[8].Score;
					Gamer10 = thumb[9].Gamer;
					Score10 = thumb[9].Score;
					Gamer11 = thumb[10].Gamer;
					Score11 = thumb[10].Score;
					Gamer12 = thumb[11].Gamer;
					Score12 = thumb[11].Score;
					Gamer13 = thumb[12].Gamer;
					Score13 = thumb[12].Score;
					Gamer14 = thumb[13].Gamer;
					Score14 = thumb[13].Score;
					Gamer15 = thumb[14].Gamer;
					Score15 = thumb[14].Score;
					Gamer16 = thumb[15].Gamer;
					Score16 = thumb[15].Score;
					color1 = thumb[16].color;
					color2 = thumb[17].color;
					DBdropScore().then( () => DBimportScore(thumb).catch(err => { console.log(err) }));
				};
			if (connectedXKeys == 'true') { myXkeys.setBacklight( j, 'red')};//red light POWER ON selected button
			DBupdateState(dvebox, state, divclass, display, file, thumb).catch(err => { console.log(err); });
			ccg_cgMedia(ccgChannel, ccgLayer, templateName, tempData, function(err, response){
				if(!err){ term(response); }
			});
		}		
		if(uiActionReceived.action == 'nocg'){				//STOP A CASPARCG TEMPLATE
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			dvebox = uiActionReceived.device;
			state = uiActionReceived.state;
			divclass = uiActionReceived.divclass;
			display = uiActionReceived.display;
			file = uiActionReceived.file;
			thumb = uiActionReceived.thumb;
			term("\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tTemplates received :"+file)
				if (dvebox == 'dve1_box'){ action3 = state; class3 = divclass; display3 = display; file3 = file; thumb3 = thumb; j = '69'};
				if (dvebox == 'dve2_box'){ action4 = state; class4 = divclass; display4 = display; file4 = file; thumb4 = thumb; j = '77'};
				if (dvebox == 'dve3_box'){ action5 = state; class5 = divclass; display5 = display; file5 = file; thumb5 = thumb; j = '70'};
				if (dvebox == 'dve4_box'){ action6 = state; class6 = divclass; display6 = display; file6 = file; thumb6 = thumb; j = '78'};
				if (dvebox == 'score_box'){ action15 = state; class15 = divclass; display15 = display; file15 = file; thumb15 = thumb; j = '60';
					Gamer1 = thumb[0].Gamer;
					Score1 = thumb[0].Score;
					Gamer2 = thumb[1].Gamer;
					Score2 = thumb[1].Score;
					Gamer3 = thumb[2].Gamer;
					Score3 = thumb[2].Score;
					Gamer4 = thumb[3].Gamer;
					Score4 = thumb[3].Score;
					Gamer5 = thumb[4].Gamer;
					Score5 = thumb[4].Score;
					Gamer6 = thumb[5].Gamer;
					Score6 = thumb[5].Score;
					Gamer7 = thumb[6].Gamer;
					Score7 = thumb[6].Score;
					Gamer8 = thumb[7].Gamer;
					Score8 = thumb[7].Score;
					Gamer9 = thumb[8].Gamer;
					Score9 = thumb[8].Score;
					Gamer10 = thumb[9].Gamer;
					Score10 = thumb[9].Score;
					Gamer11 = thumb[10].Gamer;
					Score11 = thumb[10].Score;
					Gamer12 = thumb[11].Gamer;
					Score12 = thumb[11].Score;
					Gamer13 = thumb[12].Gamer;
					Score13 = thumb[12].Score;
					Gamer14 = thumb[13].Gamer;
					Score14 = thumb[13].Score;
					Gamer15 = thumb[14].Gamer;
					Score15 = thumb[14].Score;
					Gamer16 = thumb[15].Gamer;
					Score16 = thumb[15].Score;		
					color1 = thumb[16].color;
					color2 = thumb[17].color;			
					DBdropScore().then( () => DBimportScore(thumb).catch(err => { console.log(err) }));
				};
			if (connectedXKeys == 'true') { myXkeys.setBacklight( j, false)};//red light POWER OFF selected button
			DBupdateState(dvebox, state, divclass, display, file, thumb).catch(err => {  console.log(err);});
			ccg_nocgMedia(ccgChannel, ccgLayer, function(err, response){
				if(!err){ term(response); }
			});
		}
		if(uiActionReceived.action == 'up'){				//UPDATE DATAS OF A PLAYING CASPARCG TEMPLATE
			ccgChannel = uiActionReceived.channel;
			ccgLayer = uiActionReceived.layer;
			tempData = uiActionReceived.data;
			dvebox = uiActionReceived.device;
			state = uiActionReceived.state;
			divclass = uiActionReceived.divclass;
			display = uiActionReceived.display;
			file = uiActionReceived.file;
			thumb = uiActionReceived.thumb;
			term("\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tTemplates received :"+file)
				if (dvebox == 'dve1_box'){ action3 = state; class3 = divclass; display3 = display; file3 = file; thumb3 = thumb;}
				if (dvebox == 'dve2_box'){ action4 = state; class4 = divclass; display4 = display; file4 = file; thumb4 = thumb;}
				if (dvebox == 'dve3_box'){ action5 = state; class5 = divclass; display5 = display; file5 = file; thumb5 = thumb;}
				if (dvebox == 'dve4_box'){ action6 = state; class6 = divclass; display6 = display; file6 = file; thumb6 = thumb;}
				if (dvebox == 'score_box'){ action15 = state; class15 = divclass; display15 = display; file15 = file; thumb15 = thumb;
					Gamer1 = thumb[0].Gamer;
					Score1 = thumb[0].Score;
					Gamer2 = thumb[1].Gamer;
					Score2 = thumb[1].Score;
					Gamer3 = thumb[2].Gamer;
					Score3 = thumb[2].Score;
					Gamer4 = thumb[3].Gamer;
					Score4 = thumb[3].Score;
					Gamer5 = thumb[4].Gamer;
					Score5 = thumb[4].Score;
					Gamer6 = thumb[5].Gamer;
					Score6 = thumb[5].Score;
					Gamer7 = thumb[6].Gamer;
					Score7 = thumb[6].Score;
					Gamer8 = thumb[7].Gamer;
					Score8 = thumb[7].Score;
					Gamer9 = thumb[8].Gamer;
					Score9 = thumb[8].Score;
					Gamer10 = thumb[9].Gamer;
					Score10 = thumb[9].Score;
					Gamer11 = thumb[10].Gamer;
					Score11 = thumb[10].Score;
					Gamer12 = thumb[11].Gamer;
					Score12 = thumb[11].Score;
					Gamer13 = thumb[12].Gamer;
					Score13 = thumb[12].Score;
					Gamer14 = thumb[13].Gamer;
					Score14 = thumb[13].Score;
					Gamer15 = thumb[14].Gamer;
					Score15 = thumb[14].Score;
					Gamer16 = thumb[15].Gamer;
					Score16 = thumb[15].Score;		
					color1 = thumb[16].color;
					color2 = thumb[17].color;			
					DBdropScore().then( () => DBimportScore(thumb).catch(err => { console.log(err) }));
				};
			DBupdateState(dvebox, state, divclass, display, file, thumb).catch(err => {  console.log(err);});
			ccg_upMedia(ccgChannel, ccgLayer, tempData, function(err, response){
				if(!err){ term(response); }
			});
		}
			// if(uiActionReceived.action == 'aux1'){
			// var device = uiActionReceived.file
			// ccg_Aux1(aux1, ccgLayer, device, function(err, response){
				// if(!err){ term(response); }
			// });
		// }
}

// SOCKET IO SEND DATA
	function IOSendData(targets, type, vars, var2, var3){
		if (socketIO_Connection != null){
			if(type == 'timing'){			// SEND TIMING CH1
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('timing', vars);
				});
			}
			if(type == 'timing2'){			// SEND TIMING CH2
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('timing2', vars);
				});
			}
			if(type == 'ccgcls'){			// SEND CLS
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('ccgcls', vars, var2, var3);
				});
			}
			if(type == 'ccgtls'){			// SEND TLS
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('ccgtls', vars);
				});
			}
			if(type == 'ccgconf'){			// SEND CCG CONFIG
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('ccgconf', vars);
				});
			}
			if(type == 'obsconf'){			// SEND OBS CONFIG
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('obsconf', vars, var2, var3 );
				});
			}
			if(type == 'auxconf'){			// SEND AUX CONFIG
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('auxconf', vars, var2, var3 );
				});
			}
			if(type == 'tempconf'){			// SEND TEMPLATES CONFIG
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('tempconf', vars);
				});
			}
			if(type == 'scoredata'){			// SEND SCORING DATAS
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('scoredata', vars);
				});
			}
			if(type == 'xkeys'){			// SEND XKEYS CONFIG
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('xkeys', vars);
				});
			}		
			if(type == 'titles'){			// SEND TITLES LIST
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('titles', vars);
				});
			}
			if(type == 'playlist'){			// SEND PLAYLIST LIST
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('playlist', vars, var2);
				});
			}
			if(type == 'status'){			// SEND STATUS
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('status', vars);
				});
			}
			if(type == 'solostatus'){			// SEND SOLO STATUS
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('solostatus', vars);
				});
			}
			if(type == 'obslist'){			// SEND OBS SCENES
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('obslist', vars);
				});
			}
			// if(type == 'ndilist'){		// SEND NDI==> abandonned!!!
				// targets.forEach(function(target){
				// socketIO_Connection.to(target).emit('ndilist', vars);
				// });
			// }
			if(type == 'sClick'){			// SEND CLICKS BOXES (VTR & DVE)
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('sClick', vars);
				});
			}
			if(type == 'tClick'){			// SEND CLICKS ON AUX BUTTONS
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('tClick', vars);
				});
			}
			if(type == 'rClick'){			// SEND CLASS BUTTONS
				targets.forEach(function(target){
				socketIO_Connection.to(target).emit('rClick', vars);
				});
			}
		}
	}

//VIDEO SWITCHING FUNCTION
	function KeyChange(a,b,c,d,callback){			
		obs.send('SetCurrentTransition', { 'transition-name': 'Cut'  }).catch(err => {});
		obsAux.send('SetCurrentTransition', { 'transition-name': 'Cut'  }).catch(err => {});
		if (b == 'aux1'){
			obsAux.send('SetCurrentScene', { 'scene-name': c }).catch(err => {	term("\n"+dateTimeNow()+"\t^#^r^W OBS ERROR ^ \tNo OBS Aux instance actually connected!")});
			aux1_active = a;
			obsaux_1 = c;
		}
		if (b == 'aux2'){
			obsAux.send('SetPreviewScene', { 'scene-name': c }).catch(err => {	term("\n"+dateTimeNow()+"\t^#^r^W OBS ERROR ^ \tNo OBS Aux instance actually connected!")});
			aux2_active = a;
			obsaux_2 = c;
		}
		if (b == 'pgm'){
			obs.send('SetCurrentScene', { 'scene-name': c }).catch(err => {	term("\n"+dateTimeNow()+"\t^#^r^W OBS ERROR ^ \tNo OBS Main instance actually connected!")});
			pgm_active = a;
			program = c;
		}
		if (b == 'pvw'){
			obs.send('SetPreviewScene', { 'scene-name': c }).catch(err => {	term("\n"+dateTimeNow()+"\t^#^r^W OBS ERROR ^ \tNo OBS Main instance actually connected!")});
			pvw_active = a;
			preview = c;
		}
	}

//CONNECT TO AN OBS MAIN DEVICE 
	function obsMain_detect(obsAddr,callback){
		obs.connect({ address: obsAddr, password: obspass }).then(() => {
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W OBSCONNEC ^ \tOBS Main instance connected to: \t"+obsAddr)
				obs_List(function(err, response){
					if(!err){ term(response); }
				});
				// obs_filter(function(err, response){
					// if(!err){ term(response); }
				// });
		}).catch((error) => { term("\n"+dateTimeNow()+"\t^#^r^W OBSCONNEC ^ \tNo OBS Main instance actually connected!"); });
		obs.on('error', err => { term("\n"+dateTimeNow()+"\t^#^r^W OBSCONNEC ^ \t^No OBS Main instance actually connected!"); });
		obs.on('SwitchScenes', data => {		//OBS PROGRAM SWITCH CHANGE! 
				program = (`${data.sceneName}`);
					if (program == xkey07) { pgm_active = '07'; j = 7;}
					if (program == xkey15) { pgm_active = '15'; j = 15;}
					if (program == xkey23) { pgm_active = '23'; j = 23;}
					if (program == xkey31) { pgm_active = '31'; j = 31;} 
					if (program == xkey39) { pgm_active = '39'; j = 39;}
					if (program == xkey47) { pgm_active = '47'; j = 47;} 
					if (program == xkey55) { pgm_active = '55'; j = 55;}
					if (program == xkey63) { pgm_active = '63'; j = 63;}
				DBupdateState('pgm_active',pgm_active,program,'','','','');
					if (connectedXKeys == 'true'){
						for (i = 7; i < 64; i=i+8){ myXkeys.setBacklight(i, '0000ff')}; //blue light POWER ON all line buttons 
						myXkeys.setBacklight(j, 'red')}; //red light POWER ON selected button		
				term("\n"+dateTimeNow()+"\t^#^M^W OBSPGM OK ^ \tKey pressed: \t"+pgm_active+' - '+program);			
		});						
		obs.on('PreviewSceneChanged', dt => {			//OBS PREVIEW SWITCH CHANGE! 
				preview = (`${dt.sceneName}`);
					if (preview == xkey08) { pvw_active = '08'; j = 8;}
					if (preview == xkey16) { pvw_active = '16'; j = 16;}
					if (preview == xkey24) { pvw_active = '24'; j = 24;}
					if (preview == xkey32) { pvw_active = '32'; j = 32;}
					if (preview == xkey40) { pvw_active = '40'; j = 40;}
					if (preview == xkey48) { pvw_active = '48'; j = 48;}
					if (preview == xkey56) { pvw_active = '56'; j = 56;}
					if (preview == xkey64) { pvw_active = '64'; j = 64;}
				DBupdateState('pvw_active',pvw_active,preview,'','','','');
					if (connectedXKeys == 'true'){
						for (i = 8; i < 65; i=i+8){ myXkeys.setBacklight(i, '0000ff')}; //blue light POWER ON all line buttons 
						myXkeys.setBacklight(j, 'red')}; //red light POWER ON selected button
				term("\n"+dateTimeNow()+"\t^#^M^W OBSPVW OK ^ \tKey pressed: \t"+pvw_active+' - '+preview);
		});
		obs.on('StreamStatus', dt => {
			streamS = (`${dt.streaming}`);
			console.log('STREAMING: '+streamS);
		});		
	}

//CONNECT TO AN OBS AUX DEVICE 
	function obsAux_detect(auxAddr,callback){
		obsAux.connect({ address: auxAddr, password: auxpass }).then(() => {
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W AUXCONNEC ^ \tOBS Aux instance connected to: \t"+auxAddr)			
		}).catch((error) => { term("\n"+dateTimeNow()+"\t^#^r^W AUXCONNEC ^ \tNo OBS Aux instance actually connected!"); });
		obsAux.on('error', err => { term("\n"+dateTimeNow()+"\t^#^r^W AUXCONNEC ^ \t^No OBS Aux instance actually connected!"); });
		obsAux.on('SwitchScenes', data => {		//OBS AUX PROGRAM (AKA AUX1) SWITCH CHANGE! 
				obsaux_1 = (`${data.sceneName}`);
					if (obsaux_1 == xkey05) { aux1_active = '05'; j = 5;}
					if (obsaux_1 == xkey13) { aux1_active = '13'; j = 13;}
					if (obsaux_1 == xkey21) { aux1_active = '21'; j = 21;}
					if (obsaux_1 == xkey29) { aux1_active = '29'; j = 29;} 
					if (obsaux_1 == xkey37) { aux1_active = '37'; j = 37;}
					if (obsaux_1 == xkey45) { aux1_active = '45'; j = 45;} 
					if (obsaux_1 == xkey53) { aux1_active = '53'; j = 53;}
					if (obsaux_1 == xkey61) { aux1_active = '61'; j = 61;}
				DBupdateState('aux1_active',aux1_active,obsaux_1,'','','','');
					if (connectedXKeys == 'true'){
						for (i = 5; i < 62; i=i+8){ myXkeys.setBacklight(i, '0000ff')}; //blue light POWER ON all line buttons 
						myXkeys.setBacklight(j, 'red')}; //red light POWER ON selected button
				term("\n"+dateTimeNow()+"\t^#^M^W OBS AUX 1 ^ \tKey pressed: \t"+aux1_active+' - '+obsaux_1+"");
		});		
		obsAux.on('PreviewSceneChanged', dt => {			//OBS AUX PREVIEW (AKA AUX2) SWITCH CHANGE! 
				obsaux_2 = (`${dt.sceneName}`);								
					if (obsaux_2 == xkey06) { aux2_active = '06'; j = 6;}
					if (obsaux_2 == xkey14) { aux2_active = '14'; j = 14;}
					if (obsaux_2 == xkey22) { aux2_active = '22'; j = 22;} 
					if (obsaux_2 == xkey30) { aux2_active = '30'; j = 30;} 
					if (obsaux_2 == xkey38) { aux2_active = '38'; j = 38;} 
					if (obsaux_2 == xkey46) { aux2_active = '46'; j = 46;}
					if (obsaux_2 == xkey54) { aux2_active = '54'; j = 54;}
					if (obsaux_2 == xkey62) { aux2_active = '62'; j = 62;}
				DBupdateState('aux2_active',aux2_active,obsaux_2,'','','','');
					if (connectedXKeys == 'true'){
						for (i = 6; i < 63; i=i+8){ myXkeys.setBacklight(i, '0000ff')}; //blue light POWER ON all line buttons 
						myXkeys.setBacklight(j, 'red')}; //red light POWER ON selected button
				term("\n"+dateTimeNow()+"\t^#^M^W OBS AUX 2 ^ \tKey pressed: \t"+aux2_active+' - '+obsaux_2);
		});	
	}
	
// OBS: GET SCENES LIST
	async function obs_List(callback){
		var nlist;
		obsSceneL = '';
			let obsList = await obs.send('GetSceneList').then(() => {
				return obs.send('GetSceneList');
			}).then(data => {
				nlist = (`${data.scenes.length}`);
				data.scenes.forEach(scene => {    
						obsSceneL +=(`${scene.name}`+';');
				});
			}).catch(console.error);
		obsSceneL = obsSceneL.replace('undefined','');
		IOSendData(['web'], 'obslist', obsSceneL);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^g^W OBSCONNEC ^ \tOBS Scenes List Loaded: "+nlist+" Scenes! \t ^ \t"+obsSceneL)
	}
		
// OBS: GET SOURCES EFFECT (NOT FINSIHED YET)
	async function obs_filter(callback){
		var flist;
		var FX = '';
		let obsFilt = await obs.send('GetSourceFilters', { 'sourceName': 'WEBCAM INPUT'  }).then(() => {
			return obs.send('GetSourceFilters', { 'sourceName': 'WEBCAM INPUT'  });
		}).then(data => {
			flist = (`${data.filters.length}`);
			data.filters.forEach(filters => {    
					FX +=(`${filters.name}`+(`${filters.settings}`)+';');
			});
		}).catch(console.error);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^B^W OBSEFFECT ^ \t ^ \t: "+FX)
	}

//Send CCG data retrieved from DB to webapp
	function ccg_retrieve(a, callback){
		IOSendData(['web'], 'ccgconf', a);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tConfig Server transmited to webapp: "+a)
	}	
	
//Send OBS data retrieved from DB to webapp 
	function obs_retrieve(a, b, c, callback){
		IOSendData(['web'], 'obsconf', a, b, c);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tConfig OBS transmited to webapp: "+a+":"+b)	
	}	
	
//Send OBS AUX data retrieved from DB to webapp
	function aux_retrieve(a, b, c, callback){
		IOSendData(['web'], 'auxconf', a, b, c);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tConfig OBS AUX transmited to webapp: "+a+":"+b)
	}	
	
//Send CCG templates data retrieved from DB to webapp
	function temp_retrieve(a, callback){
		IOSendData(['web'], 'tempconf', a);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA^ \tTemplates config transmited to webapp: "+a)
	}	
	
//Send CCG scoring data retrieved from DB to webapp
	function Score_retrieve(a, callback){
		IOSendData(['web'], 'scoredata', a);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tScoring data transmited to webapp: "+a)
	}	
	
//Send xkeys data retrieved from DB to webapp
	function xkeys_retrieve(xKeys, callback){
		IOSendData(['web'], 'xkeys', xKeys);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tXKEY CONFIG transmited to webapp: "+xKeys)
	}	
		
//Send saved titles data retrieved from DB to webapp
	function title_retrieve(titleList, callback){
		IOSendData(['web'], 'titles', titleList);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tSaved Titles transmited to webapp: "+titleList)
	}	
		
//Send saved playlist data retrieved from DB to webapp
	function plist_retrieve(a,b, callback){
		IOSendData(['web'], 'playlist', a, b);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tSaved Playlist "+a+" transmited to webapp: "+b)
	}	

//Send status retrieved from DB to webapp
	function state_retrieve(a, callback){
		IOSendData(['web'], 'status', a);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tStatus transmited to webapp: "+a)
	}	

//Send solo status retrieved from DB to webapp
	function partial_retrieve(a, callback){
		IOSendData(['web'], 'solostatus', a);
		callback(undefined, "\n"+dateTimeNow()+"\t^#^G^b MONGODATA ^ \tPartial Status transmited to webapp: "+a)
	}	

// CCG Get Media List
	async function ccg_cls(cgsrv, cgscan, callback){
		let info = await CCGgetConf();
		var conf = JSON.stringify(info);
		CH1conf = info.channels[vtr1 - 1].videoMode;
		CH2conf = info.channels[vtr2 - 1].videoMode;
		if (CH1conf == "PAL"){ CH1frameR = 50 } else if ( CH1conf == "NTSC" ){ CH1frameR = 60000 / 1001 } else { 
			var last = CH1conf.substring(CH1conf.length - 4,CH1conf.length); CH1frameR = last /100 } 
		if (CH2conf == "PAL"){ CH2frameR = 50 } else if ( CH2conf == "NTSC" ){ CH2frameR = 60000 / 1001; CH2scan = '2' } else { 
			var last = CH2conf.substring(CH2conf.length - 4,CH2conf.length); CH2frameR = last /100 }
			const mediasList = require('request');
			mediasList('http://'+cgsrv+':'+cgscan+'/cls', { json: true }, (err, res, body) => {
				if (err) { return term("\n"+dateTimeNow()+"\t^#^r^W CASPAR CG ^ \tNo CasparCG server connected with address: "+cgsrv+":"+cgscan+" check your config!") }
				body = body.replace('200 CLS OK','')
				body = body.replace(/ /g,',')
				body = body.replace(/,,/g,',')
				body = body.replace(/",/g,',')
				body = body.replace(/"/g,';')
				IOSendData(['web'], 'ccgcls', body, CH1frameR, CH2frameR);
				callback(undefined, "\n"+dateTimeNow()+"\t^#^y^B CASPAR CG ^ \tConfiguration Loaded - Channel 1: "+CH1frameR+' Fr/s - Channel 2: '+CH2frameR+' Fr/s - Media List Loaded from:\t\t '+cgsrv+':'+cgscan);
			});	
	}

// CCG Get template List
	function ccg_tls(cgsrv, cgscan, callback){
		const tempList = require('request');
		tempList('http://'+cgsrv+':'+cgscan+'/tls', { json: true }, (err, res, body) => {
			if (err) { return term("\n"+dateTimeNow()+"\t^#^r^W CASPAR CG ^ \tNo CasparCG server connected with address: "+cgsrv+":"+cgscan+" check your config!") }
			body = body.replace('200 TLS OK','')
			IOSendData(['web'], 'ccgtls', body); 
			callback(undefined, "\n"+dateTimeNow()+"\t^#^y^B CASPAR CG ^ \tTemplate List Loaded from:\t\t "+cgsrv+':'+cgscan)
		});	
	}
	
//RETURN THE PROMISE DEMAND TO PREVIOUS FUNCTION (ccg_info)
	var CCGgetConf = () => {
		return new Promise((resolve, reject) => {
			CasparCG_Connection.getCasparCGConfig().then((serverInfo) => {
				resolve(serverInfo);
				});
			}).catch(err => { console.log(err) });
	};
	
// CCG CG ADD 
	function ccg_cgMedia(ccgChannel, ccgLayer, template, data, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.cgAdd(ccgChannel, ccgLayer, 1, template, 1, data).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^B CASPAR CG ^ \tMedia Loaded:\t\t[Graphics]\t\tFile: "+ccgChannel+'-'+ccgLayer+' '+template+' '+data)
		} 
	}

// CCG CG UPDATE 
	function ccg_upMedia(ccgChannel, ccgLayer, data, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.cgUpdate(ccgChannel, ccgLayer, 1, data).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Updated:\t\t[Graphics]\t\tFile: "+ccgChannel+'-'+ccgLayer+' '+data)
		}
	}

// CCG CG STOP 
	function ccg_nocgMedia(ccgChannel, ccgLayer, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.cgStop(ccgChannel, ccgLayer, 1).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Stopped:\t\t[Graphics]\t\tFile: "+ccgChannel+'-'+ccgLayer)
		}
	}

// CCG Load Media 
	function ccg_LoadMedia(ccgChannel, ccgLayer, file, options, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.load(ccgChannel, ccgLayer, file, options).catch(console.error);
			// var calling = 'ADD '+ccgChannel+' STREAM rtp://192.168.0.155:1234 -codec:v libx264 -tune:v zerolatency -b:v 200k -filter:v scale=320:180 -preset:v ultrafast -crf:v 5 -b:a 128k -format rtp_mpegts';
			// var command = new AMCP.CustomCommand(calling);
			// CasparCG_Connection.do(command).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Loaded:\t\t[Video]\t\tFile: "+ccgChannel+'-'+ccgLayer+' '+file+' '+options)
		}
	}

// CCG Load Media in background with auto option (playlist)
	function ccg_LoadbgMedia(ccgChannel, ccgLayer, file, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.loadbgAuto(ccgChannel, ccgLayer, file).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Loaded in Background:\t\t[Video]\t\tFile: "+ccgChannel+'-'+ccgLayer+' '+file+' AUTO')
		}
	}

// CCG Play Media
	function ccg_PlayMedia(ccgChannel, ccgLayer, file, options, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.play(ccgChannel, ccgLayer, file, options).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Played:\t\t[Video]\t\tFile: "+ccgChannel+'-'+ccgLayer+' '+file+' '+options)
		}
	}

// CCG Call Media
	function ccg_CallMedia(ccgChannel, ccgLayer, options, callback){
		if(CasparCG_Connection != undefined){
			// var calling = 'CALL '+ccgChannel+'-'+ccgLayer+' SEEK '+options;
			// var command = new AMCP.CustomCommand(calling);
			// CasparCG_Connection.do(command).catch(console.error);		
			CasparCG_Connection.call(ccgChannel, ccgLayer, options).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia seeked:\t\t[Video]\t\ "+options)
		}
	}

// CCG AUX ABANDONED
	// function ccg_Aux1(ccgChannel, ccgLayer, ndiDevice, callback){
		// if(CasparCG_Connection != undefined){
			// var calling = 'PLAY '+ccgChannel+'-'+ccgLayer+' '+ndiDevice;
			// var command = new AMCP.CustomCommand(calling);
			// CasparCG_Connection.do(command).catch(console.error);
			// callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tDevice NDI loaded:\t "+calling)
		// }
	// }

// CCG Pause Media
	function ccg_PauseMedia(ccgChannel, ccgLayer, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.pause(ccgChannel, ccgLayer).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Paused:\t\t[Video]\t\tFile: "+ccgChannel+'-'+ccgLayer)
		}
	}

// CCG Resume Media
	function ccg_ResumeMedia(ccgChannel, ccgLayer, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.resume(ccgChannel, ccgLayer).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Resumed:\t\t[Video]\t\tFile: "+ccgChannel+'-'+ccgLayer)
		}
	}

// CCG Stop Media
	function ccg_StopMedia(ccgChannel, ccgLayer, callback){
		if(CasparCG_Connection != undefined){
			CasparCG_Connection.stop(ccgChannel, ccgLayer).catch(console.error);
			// var calling = 'REMOVE  '+ccgChannel+' STREAM rtp://192.168.0.155:1234 -codec:v libx264 -tune:v zerolatency -b:v 200k -filter:v scale=320:180 -preset:v ultrafast -crf:v 5 -b:a 128k -format rtp_mpegts';
			// var command = new AMCP.CustomCommand(calling);
			// CasparCG_Connection.do(command).catch(console.error);
			callback(undefined, "\n"+dateTimeNow()+"\t^#^M^W CASPAR CG ^ \tMedia Stopped:\t\t[Video]\t\tFile: "+ccgChannel+'-'+ccgLayer)
		}
	}

// CASPARCG CONNECTOR
	function ccgConnector(a, b, callback){	
		if(nCasp != 0) {
			CasparCG_Connection.disconnect();
			oscSocket.close(); 								// CCG OSC SOCKET CLOSING IF ALLREADY USED			
		}
			CasparCG_Connection = new CasparCG({		// CASPARCG SETUP NEW CONNECTION
				host: a,
				port: b,
				autoConnect: false,
				onError: function(err){
					console.log(err);         
				},
				onConnectionChanged: function(ccgConnectionChanged){                
					if(ccgConnectionChanged == true){
					  callback('connected');
					}
					if(ccgConnectionChanged == false){
					  callback('disconnected');
					}     
				}
			});
			CasparCG_Connection.connect();			// CASPARCG SETUP CONNECT
			callback(undefined, "\n"+dateTimeNow()+"\t^#^y^B CASPAR CG ^ \tTrying to connect to CasparCG Server with address:\t"+a+':'+b); 
	}
// OSC Client
	function ccgConnectOSC(b){
		oscSocket = udpConnection.createSocket("udp4", function(msg, info) {
		  var error, error1;
		  try {
			oscMessages = oscClient.fromBuffer(msg);						// CASPARCG - GET OSC
			oscMessages.elements.forEach(function(oscMessage){				
				if(oscMessage.address == '/channel/' + vtr1 + '/stage/layer/' + lvtr1 + '/foreground/producer'){	// CHECK IF VIDEO PRODUCER IS PRESENT IN CH1
					var videoPresent = false;
						if(oscMessage.args[0].value != 'empty'){ videoPresent = true; }
						else { videoPresent = false; }
						if(videoPresent != timecodeVars.videoPresent){		// CHECK IF VIDEO STATUS HAS CHANGED IN CH1
							timecodeVars.videoPresent = videoPresent;    					
							IOSendData(['web'], 'timing', timecodeVars);	// SEND TO WEBAPP
						}
				}  
				if(oscMessage.address == '/channel/' + vtr1 + '/stage/layer/' + lvtr1 + '/foreground/file/time'){	// GET TIMING IN CH1
					var currentTime = Number(oscMessage.args[0].value.toFixed(3));
					var currentDuration = Number(oscMessage.args[1].value.toFixed(3));				
					if(currentTime != timecodeVars.currentTime || currentDuration != timecodeVars.currentDuration){	// CHECK IF TIME HAS CHANGED IN CH1
						calculateTime(currentTime, currentDuration);                 
					} 
				} 
				if(oscMessage.address == '/channel/' + vtr2 + '/stage/layer/' + lvtr2 + '/foreground/producer'){	// CHECK IF VIDEO PRODUCER IS PRESENT IN CH2
					var video2Present = false;
						if(oscMessage.args[0].value != 'empty'){ video2Present = true; }
						else { video2Present = false; }
						if(video2Present != timecode2Vars.video2Present){	// CHECK IF VIDEO STATUS HAS CHANGED IN CH2
							timecode2Vars.video2Present = video2Present;    					
							IOSendData(['web'], 'timing2', timecode2Vars);	// SEND TO WEBAPP                           
						}
				}  
				if(oscMessage.address == '/channel/' + vtr2 + '/stage/layer/' + lvtr2 + '/foreground/file/time'){	// GET TIMING IN CH2
					var current2Time = Number(oscMessage.args[0].value.toFixed(3));
					var current2Duration = Number(oscMessage.args[1].value.toFixed(3));
					if(current2Time != timecode2Vars.current2Time || current2Duration != timecode2Vars.current2Duration){	// CHECK IF TIME HAS CHANGED IN CH2
						calculate2Time(current2Time, current2Duration);                   
					}
				}  
			});
		  } catch (error1) { error = error1; }			// CASPARCG - CATCH ERROR
		});
		oscSocket.bind(b);								// CCG OSC SOCKET LAUNCH BINDING
	}

// TIMER CHANNEL 1
	function calculateTime(currentTime, currentDuration, callback){
		timecodeVars.currentTime = currentTime;								// Raw Time
		timecodeVars.currentDuration = currentDuration;
		timecodeVars.currentTimeConverted = msToTime(currentTime * 1000,CH1frameR);	// Time To TC
		timecodeVars.currentDurationConverted = msToTime(currentDuration * 1000,CH1frameR);
		timecodeVars.currentCountDown = currentDuration - currentTime;		// Calculate Countdown
		timecodeVars.currentCountDown = timecodeVars.currentCountDown.toFixed(3);
		timecodeVars.currentCountDownConverted = msToTime(timecodeVars.currentCountDown * 1000,CH1frameR);
		timecodeVars.currentProgressPercent = ((currentTime / currentDuration) * 100).toFixed(1);	// Calculate Progress
		IOSendData(['web'], 'timing', timecodeVars);		// SEND TO WEB
	}

// TIMER CHANNEL 2
	function calculate2Time(current2Time, current2Duration, callback){
		timecode2Vars.current2Time = current2Time;
		timecode2Vars.current2Duration = current2Duration;
		timecode2Vars.current2TimeConverted = msToTime(current2Time * 1000,CH2frameR);
		timecode2Vars.current2DurationConverted = msToTime(current2Duration * 1000,CH2frameR);
		timecode2Vars.current2CountDown = current2Duration - current2Time;
		timecode2Vars.current2CountDown = timecode2Vars.current2CountDown.toFixed(3);
		timecode2Vars.current2CountDownConverted = msToTime(timecode2Vars.current2CountDown * 1000,CH2frameR);
		timecode2Vars.current2ProgressPercent = ((current2Time / current2Duration) * 100).toFixed(1);
		IOSendData(['web'], 'timing2', timecode2Vars); 
	}

// MILLISECONDS to TIMECODE
	function msToTime(duration,FrameRate) {
		var msPerFrame = 1000 / FrameRate; // 
		var frames = parseInt((duration%1000)/msPerFrame),
			seconds = parseInt((duration/1000)%60),
			minutes = parseInt((duration/(1000*60))%60),
			hours = parseInt((duration/(1000*60*60))%24);
		frames = (frames < 10) ? "0" + frames : frames;
		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;	  
		return hours + ":" + minutes + ":" + seconds + ":" + frames;
	}

// DATE TIME NOW
	function dateTimeNow(){
		var MyDate = new Date();
		var MyDateString;
		MyDate.setDate(MyDate.getDate());
		MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + (' 0' + MyDate.getDate()).slice(-2) + ' ' + (' 0' + MyDate.getHours()).slice(-2) + ':' + (' 0' + MyDate.getMinutes()).slice(-2) + ':' + (' 0' + MyDate.getSeconds()).slice(-2);
		return MyDateString;
	}
  
// DATE NOW
	function dateNow(){
		var MyDate = new Date();
		var MyDateString;
		MyDate.setDate(MyDate.getDate());
		MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + (' 0' + MyDate.getDate()).slice(-2);
		return MyDateString;
	}
  