# LiveProd

A platform that binds together different professional video tools, such as video switchers, video servers, CG servers, industrial keyboards, camcorders… in a unique IP control environment, using Node.js architecture.
LIVEPROD actually includes gateways to CasparCG, OBS Studio, XKeys keyboards, NDI protocol… Mostly cost effective or open sourced materials, as well as Windows, Linux, Android & Apple devices. BlackMagic Atem can easily be integrated too. LiveProd uses several Javascript library such as casparcg-connection & xkeys from SuperFly.tv or obs-websocket-js.

![LiveProd1 min](https://user-images.githubusercontent.com/33838534/157013656-bab8dda7-3d13-4a45-88df-67af5c408d34.png)

UNIVERSAL

	  • LiveProd server side is fully compatible with Ubuntu, Windows & Mac OSX.
  
	  • LiveProd Client side is web based and can be deployed on any device without compatibility issues (Ubuntu, Windows, Mac OSX, Android, Apple, Raspery…).

FLEXIBLE 

LiveProd Client side can be used as a single global interface for any device, can be fully integrated onto OBS Studio, as well as easily be split into different modules for different users/operators : without any issue, as all the commands are sync with node socket.

	  • Modular & Scalable.

	  • Sync & secure (any operation is saved onto mongoDb database)
  
	  • Fully Html5 Designed.
  
	  • Javascript + Node Js Commands Engineered.
	 
DESIGNABLE

As LiveProd uses web techno (html5, javascript & css), it is totally free to design : Please find (in "Public/stylesheets/" folder) an uploaded alternative css that shows another presentation of the keyboard close to BMD Atem Design. 

	  • The file "LiveProdStyle.css" is the standard one relative to the picture you can see below.
	  
	  • The file "LiveProdStyleAtem.css" is the Atem style modified one.
	  
	  • The file "LiveProdKeyboardStyle.css" is an Atem style modified for the page that only displays the keyboard.

OPENED & SHARED

LiveProd is a html5 – javascript – CSS script bundle : 

	  • Every web developer can write easily and quickly any new interface, any feature for any needs.
	  
	  • For instance, if you need an E-Sport scoring interface that manage 20 scores realtime displaying, you just have to manage forms on your web pages and link it through the node websocket to your casparCG instance... and of course create the templates with 40 fields. Instead of losing money and time, it will take a few days to make it.

	  • We just recommend to share any development, according to our fair contributing philosophy.

	  • We can offer services : installing, configuring and developing, creating templates... for a standard fee, but you can also do it by yourselves.

REMOTABLE

As LiveProd is a nodejs application, that communicates with tools using websocket commands, it is totally possible to use it to control distant devices over the internet.

	  • You can easily use LiveProd to command OBS and CCG over the internet, while setting up a port redirection, a vpn or a ssl tunnel.
	  
	  • While controling OBS, you can stream OBS multiview over the internet, setting up a ffmpeg udp stream on distant server for instance:
		o Windows screen stream cmd: "ffmpeg -f dshow -i video="UScreenCapture" -framerate 5 -video_size 1366x768 -i :0.0 -f pulse -i default -c:v libx264 -b:v 600k -maxrate 800k -bufsize 50k -g 60 -vf format=yuv420p -an -tune zerolatency -f mpegts udp://your_ip:your_port"
		o OSX screen stream cmd: "ffmpeg -f avfoundation -i "<screen device index>:<audio device index>" -framerate 5 -video_size 1366x768 -i :0.0 -f pulse -i default -c:v libx264 -b:v 600k -maxrate 800k -bufsize 50k -g 60 -vf format=yuv420p -an -tune zerolatency -f mpegts udp://your_ip:your_port"
		o Ubuntu screen stream cmd: "ffmpeg -f x11grab -framerate 5 -video_size 1366x768 -i :0.0 -f pulse -i default -c:v libx264 -b:v 600k -maxrate 800k -bufsize 50k -g 60 -vf format=yuv420p -an -tune zerolatency -f mpegts udp://your_ip:your_port"		
		o On the controling device, just use simple cmd: ffplay udp://your_ip:your_port"
		
CONTENT 

	  • Server side js file, with dependency

	  • Mongodb database backup (configured as a standalone server : all components are set on localhost)

	  • Casparcg config file incl. NDI config (2 NDI channel include fill+key, very useful for dve)

	  • web app Client node express html 5 folder

INSTALL

	• install Node.js, MongoDB, MongoDB Database Tools, OBS within plugins (NDI, websocket…) , CasparCG, NDI tools.
	
	• Use the liveprodb archive folder to Restore the database with a mongorestore command (you may need to sudo while using ubuntu)
	
	• Modify the CasparCG config file with your own specs then Start CasparCG server & scanner.
	
	• Start OBS and add the scenes & sources to complete CasparCG configuration (Bugs & DVE would be sources added to all camera scenes...)
	
	• Go to /public/javascript folder and edit CCGNodeClient.js file, changing line 2 with the IP of your host computer.
	
	• Open a terminal window (cmd or powershell on windows 10), cd to your folder, and type 'node LiveProdSrv.js'.
	
	• You should be now able to connect on the web UI while typing //localhost/ to your web browser (//localhost/keyboard/ for the single keyboard, //localhost/clock for the clock etc...). 
	
	• Then you can click on the button SetUP and configure your different hosts (OBS and CasparCG instance)... If on the same server, put localhost on every IP address field...

	• To integrate the webapp into OBS Studio, click on View, then Docks, then Custom Browser Docks : just put the IP of the host where you installed LiveProd and you got it.
	
CAREFULL
If you want to install LIVEPROD on an Ubuntu server, be aware that CasparCG Flash templates won’t  be working (but will work with html templates and simple logos displaying).
Also thumbnails are not generated in CasparCG Ubuntu version, and won’t be displayed.
You might also have to install libusb (sudo apt install libusb-dev) & libudev (sudo apt install libudev-dev) then in LiveProd folder (cd LiveProd) manually install xkeys (npm install --save xkeys).


OBS STUDIO INTEGRATION EXAMPLE

<img src="https://user-images.githubusercontent.com/33838534/165948136-09900fa0-1a3a-4c4c-9c3d-94500e5f6ad9.gif" width="100%">

![2022-04-29-14-50-52](https://user-images.githubusercontent.com/33838534/165957252-18ebd9d5-88ca-4949-8a28-b4f2a8d5ac7b.gif)


The actual script was writen to remote 2 obs studio instance :

	• The main one is dedicated for directing the show
	
	• The second one was introduced to fill the lack of aux output in obs :
	
		o Program is used as aux1
		
		o Preview is used as aux2
		
		o Both can feed screens inside a tv set
	

This example includes 8 Caspar CG channels/layers that can easily be set up : 

2 vtr that can play and adapt any video whatever format, resolution, framerate : simply drag & drop from the videos list to the VTR box !
![videodrag](https://user-images.githubusercontent.com/33838534/149331810-39fa0032-d60e-4530-b837-31a043ec5abb.png)

bugs box to display any image format fullscreen or not : simply drag & drop from the images list to the BUG box !
![bugdrag](https://user-images.githubusercontent.com/33838534/149331823-7bf3f83e-e7ee-448b-87ab-19601dbdb6b8.png)

4 dve to play caspar cg templates :  simply drag & drop the right name & title from the title list to the DVE box !
![titledrag](https://user-images.githubusercontent.com/33838534/149331813-6a32c77a-b191-405f-a8ca-b39595361478.png)	

1. Integrated interface:

	• Fully open sourced

	• Modular & scalable plugin

	• Fully html5 designed

	• Javascript + node js commands engineered

	• Add pro players & dve to obs

	• Each module can be displayed separately

2. Pro players:

	• 2 channels… or more…

	• Add video to a player with drag & drop

	• Clickable progressbar ![progressbar](https://user-images.githubusercontent.com/33838534/149331798-51d4b756-5ce9-4ecb-8743-326c2b1c0475.png)
	• Realtime timecode elapsed and remaining displayed


3. Playlist mode:

	• Click on playlist button![interfacePlaylist](https://user-images.githubusercontent.com/33838534/149331782-0d1bbaac-6b81-4e44-9b94-d102d1bb405b.png)
	• Create your playlist while drag & dropping videos ![playlistdrag](https://user-images.githubusercontent.com/33838534/149331817-07f502ea-1b9a-48a6-a0d8-625019f1a943.png)
	• Sort your items onto playlist ![playlistsort](https://user-images.githubusercontent.com/33838534/149331820-8a9fc596-fabc-4ca2-a71f-155beea87283.png)
	• Click on next or previous buttons

4. Powerfull integrated graphic server:

	• Allow to play casparcg template inside obs using 1 ndi channel (fill+key incl.) Or 2 sdi channels (decklink) ![bug+dve](https://user-images.githubusercontent.com/33838534/149331745-140bce96-ce02-4b86-b945-7370a4a49b6e.PNG)
	
	• Both flash & html5 animated templates![integ_bug+dve](https://user-images.githubusercontent.com/33838534/149331775-bc88d39d-2b4a-4f5b-8191-42c48a0f6f40.png)
	
	• Templates can be edited with adobe animate (ex flash) or with any html5 editor

	• Lowerthirds, scrolls, titles… ![video](https://user-images.githubusercontent.com/33838534/149331808-188130d9-a858-4d9a-8450-113d3cfb3d90.PNG)
	• CSV files can be export or inport to the titles list, you also can add any entry, you can sort the title list whith drag & drop, then press the drag button will allow you to drag & drop to any DVE : ![image](https://user-images.githubusercontent.com/33838534/149986211-cf35e53c-c617-46d3-81ec-d32060655668.png)
	
	• Any animation can be mixed with any data

5. Simple but powerfull setup

	• Define ip address & port of OBS main & aux instance, ip, ports, channels, layers of CasparCG![setup](https://user-images.githubusercontent.com/33838534/149331802-4403cef9-111c-41d5-8c6b-8ba3051ce373.png)
	• Most functions, sources, can be setted with drag and drop
	
	• Affect obs scenes to buttons with drag and drop ![obsdrag](https://user-images.githubusercontent.com/33838534/149331789-e7e073ad-3186-4733-ac9c-2aa5c5b7ffad.png)
	• Affect cg templates while drag & droping template item to dve setup box![templatedrag](https://user-images.githubusercontent.com/33838534/149331805-beccbf39-7cac-4e72-b55c-bc3df0d653de.png)


6. Physical & virtual panel fully synchonised

	• Xkeys 80 touch industrial builded keyboard ![xkeys](https://user-images.githubusercontent.com/33838534/149340530-4b16dc23-48fa-419b-b29d-9b65469825de.jpg)
	• Both linked to obs & casparcg through sdk ![virtualkeyboard](https://user-images.githubusercontent.com/33838534/149344923-6b781489-3407-4b35-a291-d0b48fc29480.PNG)
	
	• The alternative Atem style design ![image](https://user-images.githubusercontent.com/33838534/150516473-2e65171b-eaf0-48a3-8797-bd050cccb061.png)
	
	• Fully customisable for differents needs	
![integrated interface](https://user-images.githubusercontent.com/33838534/149331778-197aa174-1117-4d35-bb37-bd79d9441697.png)

