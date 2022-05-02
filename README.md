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

![2022-04-29-14-50-52](https://user-images.githubusercontent.com/33838534/165957252-18ebd9d5-88ca-4949-8a28-b4f2a8d5ac7b.gif)

The actual script was writen to remote 2 obs studio instance :

	• The main one is dedicated for directing the show
	
	• The second one was introduced to fill the lack of aux output in obs :
	
		o Program is used as aux1
		
		o Preview is used as aux2
		
		o Both can feed screens inside a tv set
	

This example includes 8 Caspar CG channels/layers that can easily be set up : 

2 vtr that can play and adapt any video whatever format, resolution, framerate : simply drag & drop from the videos list to the VTR box. Also double-clicking on a video will load it to VTR 1 player.
![2022-04-29 15-59-13](https://user-images.githubusercontent.com/33838534/165959543-c6e35061-6c91-45fd-b9b6-9abb224684c6.gif)

bugs box to display any image format fullscreen or not : simply drag & drop from the images list to the BUG box. Also double-clicking on an image will load it to BUG 1 box.
![2022-04-29 16-28-52](https://user-images.githubusercontent.com/33838534/165966376-ef8b4493-1596-4c2e-a765-66e6052f3cfd.gif)

4 dve to play caspar cg templates :  simply drag & drop the right name & title from the title list to the DVE box. Also double-clicking on a title will load it to DVE 1 box.
![2022-04-29 16-44-46](https://user-images.githubusercontent.com/33838534/165968084-e7b81cd5-5a8f-4071-b1bd-e9517c97ecf3.gif)

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
	![2022-04-29 16-51-43_1](https://user-images.githubusercontent.com/33838534/165969883-13b46d23-44be-4825-9f1e-de36e5cf3d15.gif)

	• Realtime timecode elapsed and remaining displayed


3. Playlist mode:

	• Click on playlist button
	![2022-04-29 17-02-19](https://user-images.githubusercontent.com/33838534/165971377-8fd2f65b-c195-48d2-846f-30ccbd9f8a22.gif)

	• Create your playlist while drag & dropping videos
	
	• Sort your items onto playlist
	![2022-04-29 17-05-07](https://user-images.githubusercontent.com/33838534/165971806-0fc69a03-54f7-498d-a1a4-2f305c1a3efc.gif)

	• Manage your playlist as you like while deleting any item
	![2022-04-29 17-07-28](https://user-images.githubusercontent.com/33838534/165972515-2d0807d5-0b20-4267-a8eb-550e390a009f.gif)

	• Click on next or previous buttons
	![2022-04-29 17-12-10](https://user-images.githubusercontent.com/33838534/165973285-62196209-5b35-4d9a-bfab-abc31e0ab7d7.gif)

4. Powerfull integrated graphic server:

	• Allow to play casparcg template inside obs using 1 ndi channel (fill+key incl.) Or 2 sdi channels (decklink) ![2022-05-02 12-31-33](https://user-images.githubusercontent.com/33838534/166221647-727313c8-d938-49d6-809d-96b875b2a076.gif)

	
	• Both flash & html5 animated templates
	
	• Templates can be edited with adobe animate (ex flash) or with any html5 editor

	• Lowerthirds, scrolls, titles…

	• Excel files (xlsx, xls, csv) can be export or import to the titles list, you also can add, edit or delete any entry, sort the title list, then press drag & drop to any DVE :![2022-05-02 12-52-51](https://user-images.githubusercontent.com/33838534/166223525-4d0aac60-7b70-4b07-8a76-f5dc7655431c.gif)

	• Any animation can be mixed with any data

5. Simple but powerfull setup

	• Define ip address & port of OBS main & aux instance, ip, ports, channels, layers of CasparCG ![2022-05-02 12-58-49](https://user-images.githubusercontent.com/33838534/166224250-f0d38a38-fbeb-46c7-b3c1-54672ceff46c.gif)

	• Most functions, sources, can be setted with drag and drop
	
	• Affect obs scenes to buttons with drag and drop ![2022-05-02 13-06-20](https://user-images.githubusercontent.com/33838534/166224858-adf2bd99-cdad-417b-9ec9-f85eaf56f826.gif)

	• Affect cg templates while drag & droping template item to dve setup box ![2022-05-02 13-06-38](https://user-images.githubusercontent.com/33838534/166224882-14a8c087-ecb6-4f65-be09-1714ab98f0a2.gif)



6. Physical & virtual panel fully synchonised

	• Xkeys 80 touch industrial builded keyboard ![xkeys](https://user-images.githubusercontent.com/33838534/149340530-4b16dc23-48fa-419b-b29d-9b65469825de.jpg)
	• Both linked to obs & casparcg through sdk ![virtualkeyboard](https://user-images.githubusercontent.com/33838534/149344923-6b781489-3407-4b35-a291-d0b48fc29480.PNG)
	
	• The alternative Atem style design ![image](https://user-images.githubusercontent.com/33838534/150516473-2e65171b-eaf0-48a3-8797-bd050cccb061.png)
	
	• Fully customisable for differents needs	
![integrated interface](https://user-images.githubusercontent.com/33838534/149331778-197aa174-1117-4d35-bb37-bd79d9441697.png)

