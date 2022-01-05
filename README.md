# LiveProd
A platform that blinds together different professional video tools, such as video switchers, video servers, CG servers, industrial keyboards, camcorders… in a unique IP environment, using Node.js architecture.

LIVEPROD actually includes gateways to CasparCG, OBS Studio, XKeys keyboards, NDI protocol… Mostly cost effective or open sourced materials, as well as Windows, Linux, Android & Apple devices. BlackMagic Atem can easily be integrated too.

UNIVERSAL
LiveProd server side is fully compatible with Ubuntu, Windows & Mac OSX. LiveProd Client side is web based and can be deployed on any device without compatibility issues (Ubuntu, Windows, Mac OSX, Android, Apple, Raspery…).

FLEXIBILITY 
LiveProd Client side can be an single global interface for any device, can be fully integrated onto OBS Studio, as well as easily be split into different tools for different users/operators : no issue, as all the commands are sync by node.
•	Modular & Scalable
•	Fully Html5 Designed
•	Javascript + Node Js Commands Engineered

OPENED & SHARED
LiveProd is a html5 – javascript – CSS script bundle : it means, every web developer can write easily and quickly any new interface, any feature for any needs. 
For instance, if you need an E-Sport scoring interface that manage 20 scores realtime displaying, you just have to manage forms on your web pages and link it through the node websocket to your casparCG instance... and of course create the templates with 40 fields. Instead of losing money and time, it will take a few days to make it.
We just recommend to share any development, according to our fair contributing philosophy.
We can offer services : installing, configuring and developing, creating templates... for a standard fee, but you can also do it by yourselves.

CONTENT 
Server side js file, with dependency
Mongodb database backup (configured as a standalone server : all components are set on localhost)
Casparcg config file incl. NDI config (one NDI channel include fill+key, very useful for dve)
web app Client node express html 5 folder

INSTALL
install Node.js, MongoDB, MongoDB Database Tools, OBS within plugins (NDI, websocket…) , CasparCG, NDI tools.
Use the liveprodb archive file to Restore the database with a mongorestore command.
Start OBS & Caspar CG
go to /public/javascript folder and edit CCGNodeClient.js file, changing line 2 with the IP of your host computer.
Open a terminal window (cmd or powershell on windows 10), cd to your folder, and type node CCGNodeSrv.js.
You should be now able to connect on the web UI while typing //localhost/ to your web browser (//localhost/keyboard/ for the single keyboard, //localhost/clock for the clock etc...)

CAREFULL
If you want to install LIVEPROD on an Ubuntu server, be aware that CasparCG Flash templates won’t  be working (but will work with html templates and simple logos displaying).
Also thumbnails are not generated in CasparCG Ubuntu version, and won’t be displayed.

![liveProd_01](https://user-images.githubusercontent.com/33838534/148247564-33cc4483-3994-413e-915b-ff1acc8317aa.PNG)
