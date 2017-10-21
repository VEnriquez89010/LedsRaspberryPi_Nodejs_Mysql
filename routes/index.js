var express = require('express');
var router = express.Router();
var Host = require('../models/ips');
var getIP = require('ipware')().get_ip;
var Gpio = require('onoff').Gpio;
var LED2 = new Gpio(27,'out');
var LED1 = new Gpio(17,'out');


router.get('/',function(req,res,next){
	res.render('index',{title:'ON/OFF'});
});

router.get('/led/:id/:id2',function(req,res,next){

	var id = req.params.id;   //---Select Led
	var id2 = req.params.id2; //---On/Off

//---Select led ( 1 or 2 )
if(id == '1'){
	//----Turn on led
	if(id2 == '1'){
	   LED1.writeSync(1);
	}else{
	//----Turn off led
	   LED1.writeSync(0);
	}
}else{
	//----Turn on led
	if(id2 == '1'){
	   LED2.writeSync(1);
	}else{
	//----Turn off led
	   LED2.writeSync(0);
	}
};

//---Flag to save on DB
var flag = '';
if(id2 == '0'){
flag = 'OFF';
}else{
flag='ON';
};

//----Obtain ip
var ipInfo = getIP(req);
    var clientIp = ipInfo.clientIp;
    var ip = clientIp.substring(7,21);
    var json= {"host":ip,"led":id,"status":flag};

//----Insert on DB
Host.build(json).save();
res.redirect('/');

});

module.exports =router;
