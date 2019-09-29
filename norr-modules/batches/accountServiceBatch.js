
var schedule = require('node-schedule');
var moment = require('moment');
const _ = require('lodash');
require('log-timestamp')(function () {
	// body...
	return '[ '+[moment(Date.now()).format("DD MM YYYY hh:mm:ss")]+' ]'
});
const readLine = require('readline');
const fs = require('fs');
 
/*
var matchAmount= new RegExp("-\\s[0-9]*,[0-9]{2}$","g");*/

var matchAmount= new RegExp("-\\s[0-9]*,[0-9]{2}$","g");
var matchDate= new RegExp("\\s[0-9]{2}\/[0-9]{2}\/[0-9]{4}","g");
var matchDescription= new RegExp("-\\s[0-9]*,[0-9]{2}$","g");
var rer = new RegExp("/([0-9]{2}\/[0-9]{2}\/[0-9]{4})(.*)(-\s[0-9]+.*,[0-9]{2})/gi");

var transaction={
	"date":null,
	"description":"",
	"amount":0
}

var accountIO = schedule.scheduleJob('* * * * * *', function () {
	// body...
			let rl = readLine.createInterface({
				input: fs.createReadStream(process.env.USERPROFILE+'\\Documents\\GainsLosses_2019\\Losses\\03_2019.log')
			});
 
		
		console.log('Start reading user id:=xx bank datas'); 
		rl.on('line', function (line) { 
			
			 if(rer.test(line.toString())){ 
			 	 
						console.log(Object.values(rer.exec(line))[0]) 
						console.log(Object.values(rer.exec(line))[1])
						
						/* matchDate.test(line);
						console.log("**line: "+line)
						transaction.date=Object.values(matchDate.exec(line))[0];
						//matchDescription.test(line);
						transaction.description=matchDescription.exec(line)[0];
						*/
				 }
			
		});
		
	}); 


module.exports.module 
