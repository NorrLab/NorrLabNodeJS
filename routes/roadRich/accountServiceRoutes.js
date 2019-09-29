
var router = require('express').Router(); 
var schedule = require('node-schedule');
var moment = require('moment');
require('log-timestamp')(function () {
	// body...
	return '[ '+[moment(Date.now()).format("DD MM YYYY hh:mm:ss")]+' ]'
});
	
var amount=0;
router.get('/user-richroad/:tardeId', (req,res) =>{  
	
 
	res.json({"amount":amount});
});

module.exports = router;
