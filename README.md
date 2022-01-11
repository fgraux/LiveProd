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

