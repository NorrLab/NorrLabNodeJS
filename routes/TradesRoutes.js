var router = require('express').Router(); 
const jwt = require('jsonwebtoken');
var Trade = require('./../models/Trade');
var NorrUser = require('./../models/NorrUser');
var TradeDetail = require('./../models/TradeDetail');
var NorrLabTradeAction = require('./../models/NorrLabTradeAction');
var NorrLabTradeComment = require('./../models/NorrLabTradeComment');

var norrLabTrades={
				message:String,
				data:[],
				access:Boolean,
				totalCount:Number
			}

 var sortedElementOrder= function(el){
 		if(el === undefined || el === null)
 			return {};
 		if(el === "Most Liked")
 			return {creationDate: +1};
 		if(el ==="Newest First")
 			return {creationDate: -1};
 		if(el ==="Most Pofits")
 			return {profit: -1};
 		else
 			return {};
}


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
			norrLabTrades.message="trades found";

			norrLabTrades.data = trades;
			norrLabTrades.access= (user!==null)?true:false;
			norrLabTrades.test = "ok"
			res.json(norrLabTrades);
		}); 
	}).catch(err =>{
		console.log("all-trades")
		Trade.find({}).populate('tradeUser').then( trades =>{ 
			res.json({
				"message":"trades found",
				"data":trades,
				"access":false,

			});
		}); 
	}) 
});

router.get('/free-trade', (req,res)=>{ 
	try{
		Trade.countDocuments().then((totalCount)=>{
			Trade.findOne({_id:req.query.tradeId}).populate('tradeUser')
			.populate({
				path:'tradeDetail',
				populate:{
					path:'entry',
					model:'NorrLabTradeAction' 
				}

			}).populate({
				path:'tradeDetail',
				populate:{
					path:'management',
					model:'NorrLabTradeAction'

				} 
			}).then( trade =>{ 
				res.json(trade);
			}).catch(err =>{
				console.log(err);
				res.sendStatus(500)
			})
			
		})
	}catch(error){
		console.log(error)
	}
});

//reade treadDetail
router.get('/free-trade-detail', (req,res)=>{ 
	try{
		 TradeDetail.findOne({_id:req.query.tradeId}).populate('tradeUser').populate('tradeDetail').then( trade =>{ 
				if(trade == null){

				 	res.status(204).json(trade);
				}
				res.json(trade);
			}).catch(err =>{
				console.log(err)
				res.sendStatus(500)
			}) 
	}catch(error){
		console.log(error)
	}
});

//create treadDetail
router.post('/free-trade-detail', (req,res)=>{ 
	try{ 
		/*norrLabDetail.entry = req.body.entry;
		norrLabDetail.management = req.body.management;*/
		NorrLabTradeAction.create(req.body.management)
		.then(management =>{
			NorrLabTradeAction.create(req.body.entry)
			.then(entry =>{
							req.body.entry = entry;
							req.body.management = management;

							TradeDetail.create(req.body).then( tradeDetail =>{ //req.body
								res.json(tradeDetail);
							}).catch(err =>{
								console.log(err);
								res.sendStatus(500) 
							}) 
						})
		})

	}catch(error){
		console.log(error)
	}
});

router.get('/free-trade-comment', (req,res) =>{
	try{
		NorrLabTradeComment.find({commentTrade:req.query.tradeId})
		.populate('commentUser')
		.then(comments =>{
			res.status(200).json(comments);
		})
	}catch(error){
		console.log(error)
	}
});

router.post('/free-trade-comment', (req,res) =>{
	req.body.commentDate = new Date();
	try{
		NorrLabTradeComment.create(req.body)
		.then(comment =>{
			res.json(comment);
		})
	}catch(error){
		console.log(error)
	}
});

router.get('/free-trades', (req,res)=>{ 
	try{
		Trade.countDocuments().then((totalCount)=>{
			var skipValue =Number(req.query.pageNumber) > 0 ? Math.ceil( Number(req.query.pageNumber) + Number(req.query.nbPerPage) +1) : 0;// (Number(req.query.pageNumber) > 0 ? ( ( Number(req.query.pageNumber) - 1 ) * Number(req.query.nbPerPage) ) : 0);
			Trade.find()
             .skip( skipValue )
             .sort(sortedElementOrder(req.query.criteria))
             .limit( Number(req.query.nbPerPage) ).populate('tradeUser').then( trades =>{
             	norrLabTrades.message="trades found";

				norrLabTrades.data = trades;
				norrLabTrades.access=false;
				norrLabTrades.totalCount = totalCount
				norrLabTrades.restedTotalCount = Math.ceil(totalCount / req.query.nbPerPage)

				res.json(norrLabTrades);
			}).catch(err =>{
				console.log(err)
			})
		})
	}catch(error){
		console.log(error)
	}
});

router.post('/update-specific-trade/:tardeId', (req,res) =>{  
	 
		/*Trade.findOneAndUpdate({_id:req.query.tardeId}, req.body, function (err, trade) { 
			if(trade.status ==='Closed' || trade.status ===''){
				res.sendStatus(403);
			}else{
				res.json(trade);

			}
		})  */
		Trade.findById( req.query.tardeId, function (err, trade) { 
			if(trade.status ==='Closed' ){
				res.sendStatus(403);
			}else{
				Trade.updateOne(trade, req.body, function (err, updatedTrade) {//req.query.tardeId
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
			Trade.findById(req.query.tardeId).then( trade =>{
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
				console.log(err)
			})
		}).catch(err =>{
			console.error(err);
		
		})
	}).catch(err =>{
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