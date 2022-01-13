# LiveProd
A platform that blinds together different professional video tools, such as video switchers, video servers, CG servers, industrial keyboards, camcorders… in a unique IP control environment, using Node.js architecture.

LIVEPROD actually includes gateways to CasparCG, OBS Studio, XKeys keyboards, NDI protocol… Mostly cost effective or open sourced materials, as well as Windows, Linux, Android & Apple devices. BlackMagic Atem can easily be integrated too.

UNIVERSAL

	  • LiveProd server side is fully compatible with Ubuntu, Windows & Mac OSX.
  
	  • LiveProd Client side is web based and can be deployed on any device without compatibility issues (Ubuntu, Windows, Mac OSX, Android, Apple, Raspery…).

FLEXIBLE 

LiveProd Client side can be an single global interface for any device, can be fully integrated onto OBS Studio, as well as easily be split into different modules for different users/operators : no issue, as all the commands are sync with node socket.

	  • Modular, Scalable & Sync.
  
	  • Fully Html5 Designed.
  
	  • Javascript + Node Js Commands Engineered.

OPENED & SHARED

LiveProd is a html5 – javascript – CSS script bundle : 

	  • Every web developer can write easily and quickly any new interface, any feature for any needs.
	  
	  • For instance, if you need an E-Sport scoring interface that manage 20 scores realtime displaying, you just have to manage forms on your web pages and link it through the node websocket to your casparCG instance... and of course create the templates with 40 fields. Instead of losing money and time, it will take a few days to make it.

	  • We just recommend to share any development, according to our fair contributing philosophy.

	  • We can offer services : installing, configuring and developing, creating templates... for a standard fee, but you can also do it by yourselves.

CONTENT 

	  • Server side js file, with dependency

	  • Mongodb database backup (configured as a standalone server : all components are set on localhost)

	  • Casparcg config file incl. NDI config (one NDI channel include fill+key, very useful for dve)

	  • web app Client node express html 5 folder

INSTALL

	• install Node.js, MongoDB, MongoDB Database Tools, OBS within plugins (NDI, websocket…) , CasparCG, NDI tools.
	
	• Use the liveprodb archive file to Restore the database with a mongorestore command.
	
	• Start OBS & Caspar CG.
	
	• Go to /public/javascript folder and edit CCGNodeClient.js file, changing line 2 with the IP of your host computer.
	
	• Open a terminal window (cmd or powershell on windows 10), cd to your folder, and type node CCGNodeSrv.js.
	
	• You should be now able to connect on the web UI while typing //localhost/ to your web browser (//localhost/keyboard/ for the single keyboard, //localhost/clock for the clock etc...). 
	
	• Then you can click on the button SetUP and configure your different hosts (OBS and CasparCG instance)... If on the same server, put localhost on every IP address field...

	• To integrate the webapp into OBS Studio, click on View, then Docks, then Custom Browser Docks : just put the IP of the host where you installed LiveProd and you got it.
	
CAREFULL
If you want to install LIVEPROD on an Ubuntu server, be aware that CasparCG Flash templates won’t  be working (but will work with html templates and simple logos displaying).
Also thumbnails are not generated in CasparCG Ubuntu version, and won’t be displayed.

![liveProd_01](https://user-images.githubusercontent.com/33838534/148247564-33cc4483-3994-413e-915b-ff1acc8317aa.PNG)


OBS STUDIO INTEGRATION EXAMPLE

The actual script was writen to remote 2 obs studio instance :

	• The main one is dedicated for directing the show
	
	• The second one was introduced to fill the lack of aux output in obs :
	
		o Program is used as aux1
		
		o Preview is used as aux2
		
		o Both can feed screens inside a tv set
		

This example includes 8 Caspar CG channels/layers that can easily be set up : 

	• 2 vtr that can play and adapt any video whatever format, resolution, framerate…
	
	• 2 bugs box to display any image format fullscreen or not
		simply drag & drop images to the box
		![bugdrag](https://user-images.githubusercontent.com/33838534/149331823-7bf3f83e-e7ee-448b-87ab-19601dbdb6b8.png)
	
	• 4 dve to play caspar cg templates 
	

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

	• Clickable progressbar

	• Realtime timecode elapsed and remaining displayed

3. Playlist mode:

	• Click on playlist button

	• Create your playlist while drag & dropping videos

	• Sort your items onto playlist

	• Click on next or previous buttons

4. Powerfull integrated graphic server:

	• Allow to play casparcg template inside obs using 1 ndi channel (fill+key incl.) Or 2 sdi channels (decklink)

	• Both flash & html5 animated templates

	• Templates can be edited with adobe animate (ex flash) or with any html5 editor

	• Lowerthirds, scrolls, titles… 

	• Any animation can be mixed with any data

5. Simply setup

	• Define ip address & port of obs

	• Most functions, sources, can be setted with drag and drop

	• Affect obs scenes to buttons with drag and drop

	• Affect cg templates while drag & droping template item to dve setup box

6. Physical & virtual panel fully synchonised

	• Xkeys 80 touch industrial builded keyboard

	• Both linked to obs & casparcg through sdk

	• Fully customisable for differents needs
![image](https://user-images.githubusercontent.com/33838534/148431935-34c558c7-292e-45dd-8438-7d45a09b5c31.png)
![Capturebug](https://user-images.githubusercontent.com/33838534/149331773-f68000f4-ef5d-4564-9888-4ad2b4a6cd8e.PNG)
![integ_bug+dve](https://user-images.githubusercontent.com/33838534/149331775-bc88d39d-2b4a-4f5b-8191-42c48a0f6f40.png)
![integrated interface](https://user-images.githubusercontent.com/33838534/149331778-197aa174-1117-4d35-bb37-bd79d9441697.png)
![interfacePlaylist](https://user-images.githubusercontent.com/33838534/149331782-0d1bbaac-6b81-4e44-9b94-d102d1bb405b.png)
![interfaceprogressb](https://user-images.githubusercontent.com/33838534/149331784-bd27aa7f-628d-40b0-9ff2-258d951f8838.png)
![obsdrag](https://user-images.githubusercontent.com/33838534/149331789-e7e073ad-3186-4733-ac9c-2aa5c5b7ffad.png)
![playlist](https://user-images.githubusercontent.com/33838534/149331794-0f1b8ff3-da79-47c2-9452-95614ec556c0.png)
![progressbar](https://user-images.githubusercontent.com/33838534/149331798-51d4b756-5ce9-4ecb-8743-326c2b1c0475.png)
![setup](https://user-images.githubusercontent.com/33838534/149331802-4403cef9-111c-41d5-8c6b-8ba3051ce373.png)
![templatedrag](https://user-images.githubusercontent.com/33838534/149331805-beccbf39-7cac-4e72-b55c-bc3df0d653de.png)
![titles](https://user-images.githubusercontent.com/33838534/149331807-34b6acc2-e13a-4c93-b50a-0f339772924d.PNG)
![video](https://user-images.githubusercontent.com/33838534/149331808-188130d9-a858-4d9a-8450-113d3cfb3d90.PNG)
![videodrag](https://user-images.githubusercontent.com/33838534/149331810-39fa0032-d60e-4530-b837-31a043ec5abb.png)
![titledrag](https://user-images.githubusercontent.com/33838534/149331813-6a32c77a-b191-405f-a8ca-b39595361478.png)
![playlistdrag](https://user-images.githubusercontent.com/33838534/149331817-07f502ea-1b9a-48a6-a0d8-625019f1a943.png)
![playlistsort](https://user-images.githubusercontent.com/33838534/149331820-8a9fc596-fabc-4ca2-a71f-155beea87283.png)

![bug+dve](https://user-images.githubusercontent.com/33838534/149331745-140bce96-ce02-4b86-b945-7370a4a49b6e.PNG)
