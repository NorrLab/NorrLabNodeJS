const soap = require('soap');
var router = require('express').Router(); 

var url = 'http://localhost:8585/ActiviteDuCompteService?wsdl';
var listOfTrades;
router.get('/tradesActivityWsdl', function (req,res) {
	// body...
	soap.createClientAsync(url,'escapeXML').then((client)=>{
		return client.getListOfOperationAsync();
	}).then((result)=>{
		listOfTrades = result;
		console.log(listOfTrades);
		res.send(listOfTrades[0].return);
	})
	
})

module.exports = router;