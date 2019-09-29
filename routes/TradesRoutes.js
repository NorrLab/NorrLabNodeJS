var router = require('express').Router(); 
const jwt = require('jsonwebtoken');
 var Trade = require('./../models/Trade');
 var NorrUser = require('./../models/NorrUser');


router.post('/login', (req,res) =>{
	 
	var user = {
		"id":1,
		"name":"Emile",
		"age":23
	}
	
	jwt.sign({user:user},'secretkey', (err, token)=>{
		res.json({token:token});
	}) 
}); 

router.get('/all-trades/', (req,res) =>{  
	
	

	NorrUser.findById(req.query.userId).then(user =>{
		//If the User get the right then 
		 
		Trade.find({}).populate('tradeUser').then( trades =>{ 
			res.json({
				"message":"trades found",
				"data":trades,
				"access":(user!==null)?true:false
			});
		}); 
	}).catch(err =>{
		console.log("all-trades")
		Trade.find({}).populate('tradeUser').then( trades =>{ 
			res.json({
				"message":"trades found",
				"data":trades,
				"access":false
			});
		}); 
	}) 
});

router.post('/update-specific-trade/:tardeId', (req,res) =>{  
	 
		/*Trade.findOneAndUpdate({_id:req.params.tardeId}, req.body, function (err, trade) { 
			if(trade.status ==='Closed' || trade.status ===''){
				res.sendStatus(403);
			}else{
				res.json(trade);

			}
		})  */
		Trade.findById( req.params.tardeId, function (err, trade) { 
			if(trade.status ==='Closed' ){
				res.sendStatus(403);
			}else{
				Trade.updateOne(trade, req.body, function (err, updatedTrade) {//req.params.tardeId
					// body...
					res.json(updatedTrade);
				} ) 
			}
		})
});


router.get('/get-specific-trade/:tardeId', (req,res) =>{  
	
	NorrUser.findById(req.query.userId).then(user =>{
		if(user==null){
			res.sendStatus(403)
		}else{
			Trade.findById(req.params.tardeId).then( trade =>{
				res.json({
					"message":"trade found",
					"data":trade
				});
			});
		}
	}).catch(err =>{
		res.sendStatus(403)
	}) 
});

router.get('/watch-specific-trade/',(req,res) =>{
	NorrUser.findById(req.query.userId).then(norrUser =>{
		Trade.findById(req.query.id).then( trade => {
			NorrUser.findById(trade.tradeUser).populate('userTrades').then(userFound =>{
				res.json({
					user:userFound,
					trade:trade
				})
			}).catch(err=>{
				console.log(err)
				res.sendStatus(500)
			})
		 }).catch( err =>{
			 console.log(err)
			res.sendStatus(500)
			})
		}).catch( err =>{
				res.sendStatus(403)
			}) 
});

router.get('/watch-specific-trade-access/',(req,res) =>{
 	 NorrUser.findById(req.query.userId).then( (err,user) => {
	 	res.json(user); 
	 }).catch(err =>{
	 	res.sendStatus(403)
	 })  
});
 

router.post('/create-trade/', verifyToken,(req,res)=>{
	/*jwt.verify(req.token,'secretkey',(err,data)=>{
		var newTrade = new Trade();
		if(err){
		console.error('ERRO',err.stack);
		}else{
			newTrade.description =  req.body.description;
			newTrade.entry=  req.body.entry;
			newTrade.exit= req.body.exit;
			newTrade.product= req.body.product;
			newTrade.margin= req.body.margin;
			newTrade.type= req.body.type;
			newTrade.creationDate = new Date(); 
			newTrade.status = req.body.status; 
			newTrade.profit= req.body.profit;
			newTrade.exitDate=req.body.exitDate;
			newTrade.entryDate=req.body.entryDate;
			newTrade.broker=req.body.broker;
 			newTrade.pictureUrl = req.body.pictureUrl;
 			newTrade.save();
			res.json(newTrade);
		}
	})*/

	NorrUser.findById(req.query.userId).then( user=>{
		req.body.tradeUser = user._id;
		Trade.create(req.body).then(trade=>{ 
			user.userTrades.push(trade.id); 
			NorrUser.updateOne({"_id":user._id},user).then(user=>{
				res.json(user);
			}).catch(err =>{
				console.error(err)
			})
		}).catch(err =>{
			console.error(err)
		})
	}).catch(err =>{
		res.json(403)
	})
});

function verifyToken(req, res, next){

	const bearerHeader = req.headers['authorization']; 

	if(typeof bearerHeader !== 'undefined'){ 
		 req.token = bearerHeader.split(' ')[1];
		 next();
	}else{
		 res.sendStatus(403);
		//res.render('./../public/app/partials/erros/accessDenied.html',{});
		 
		next();
	}
}

module.exports = router;