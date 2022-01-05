let canvas, ctx;
if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = false;
    });
}
function draw () {
    let time = (function () {
            let midnight = new Date();
            midnight.setHours(0);
            midnight.setMinutes(0);
            midnight.setSeconds(0);
            midnight.setMilliseconds(0);
            return Date.now() - midnight.getTime();
        })(),
        hours = time / (60 * 60 * 1000),
        minutes = hours * 60 % 60,
        seconds = minutes * 60 % 60;
				
        digitalHours = Math.trunc(hours);
        digitalMinutes = Math.trunc(minutes);
        digitalSeconds = Math.trunc(seconds);
        digitalHours = ("0" + digitalHours).slice(-2);
        digitalMinutes = ("0" + digitalMinutes).slice(-2);
        digitalSeconds = ("0" + digitalSeconds).slice(-2);
        digitalClock = (digitalHours + ":" + digitalMinutes + ":" + digitalSeconds)
                
    ctx.clearRect(0, 0, size, size);

    ctx.lineCap = 'round';
    c = {x: size / 2, y: size / 2};


		d = new Date();
		day = '' + d.getDate();
		month = '' + (d.getMonth() + 1);
        year = d.getFullYear();

			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
		calend = year+' - '+month+' - '+day;
    face();
    date();
    digital();
    brandtext();
    // logo();
    secondHand();
  
    function face () {
        // Background
        ctx.beginPath();
        ctx.arc(c.x, c.y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#1a1a1a";
        ctx.fill();

        // Dashes
        ctx.lineWidth = 12;
        for (let i = 0; i < 60; i++) {
            let r = (size -20) / 2,
                l = 0;
            ctx.strokeStyle = 'rgb(100, 35, 35)';
            let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
            v.setMag(r + l);
            ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
            ctx.stroke();  
        }

        // 5 second dashes
        ctx.lineWidth = 12;
        for (let i = 0; i < 12; i++) {
            let r = ((size -20) / 2) -20,
                l = 0;
            ctx.strokeStyle = '#ff0000';

            let v = new Vector(r, Math.PI * 2 * (i / 12) - Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
            v.setMag(r + l);
            ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
            ctx.stroke();
        }
    }

    function digital () { //DIGITAL CLOCK STYLE
        ctx.font = "500 4.5rem clock";
        ctx.fillStyle = "red"
        ctx.textAlign = "center";
        ctx.fillText(digitalClock, size/2, (size/2)+25);
    }
	
    function date () { //DATE
        ctx.font = "400 2rem Helvetica";
        ctx.fillStyle = "white"
        ctx.textAlign = "center";
        ctx.fillText(calend, size/2, (size/3*2)+30);
    }

    function brandtext () {		//INSERT BRANDING TEXT
        ctx.font = "400 3rem Helvetica";
        ctx.fillStyle = "#10ff00"
        ctx.textAlign = "center";
        ctx.fillText("PARIS", size/2, (size/3));
    }
	
    function logo () {		//INSERT LOGO
	var img = document.createElement('img'); 
    img.src = 'https://e-active.tv/wp-content/uploads/2018/01/mandarin.png'; 
	document.getElementById('box').appendChild(img);
    }

    function secondHand () {	//TROTEUSE (aiguille des secondes)
        ctx.lineWidth = 12;
    
        for (let i = 0; i < seconds; i++) {
            let r = (size -20) / 2,
                l = 0;
            ctx.strokeStyle = '#7fff00';
            
            let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
            v.setMag(r + l);
            ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
            ctx.stroke();
        } 
    }  
}

function init () {
    canvas = document.getElementById('clock');
    // width = window.innerWidth * 0.9;
    // height = window.innerHeight / 5 * 4.65;
    // if (width > height) {
        // size = height
    // }
    // else {
        // size = width
    // }
    // size = height
    // console.log(width +"*"+ height)
    // console.log("size: " + size)
    // canvas.width = canvas.height = size;
    // console.log("canvas.width: " + canvas.width)
    // console.log("canvas.height: " + canvas.height)
	size = canvas.width = canvas.height = 400;
    ctx = canvas.getContext('2d');
		
    setInterval(draw, 10); 
}

init();
