var router = require('express').Router(); 
const jwt = require('jsonwebtoken'); 
const fs = require('fs');
const path = require('path');
var NorrUser = require('./../models/NorrUser');


router.post('/login', (req,res)=>{
	NorrUser.findOne({email:req.body.email,password:req.body.password})
	.select('-password -userRole -email')
	.exec( function (err,foundUser) {
		// body...
			if(err){
				res.sendStatus(500);
			}else if(foundUser===null){
				res.sendStatus(403);
			}else{
				console.log(`The user ${foundUser.firstName}  ${foundUser.lastName}, has just signed in `);
				 
				jwt.sign({user:foundUser},'secretkey', (err, token)=>{
					res.json({token:token,user:foundUser});
				})
			} 
	}) 
});

router.post('/create-new-user/',(req,res)=>{
	console.log(res.body);
	try{
		NorrUser.create(req.body, (err, labUser)=>{
			res.json(labUser);
		})
	}catch(exception){
		res.sendStatus(500);		
	} 
});
router.get('/',(req,res)=>{
	NorrUser.findById(req.query.userId).then(user =>{
		res.json(user)
	}).catch( err =>{
		res.sendStatus(403)
	})
})

router.get('/user-media/:userId/:videoId',(req,res)=>{
	const path = 'norr-asset/v-asset/BelattarQuenelleZemmour.mp4'
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.header.range
	
	if(range){
	
	}else{
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4'
		}
		
		res.writeHead(200,head)
		fs.createReadStream(path).pipe(res)
	}
});

router.get('/user-media/vmor/',(req,res)=>{
	const path = 'norr-asset/v-asset/BelattarQuenelleZemmour.vtt'
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.header.range
	
	if(range){
	
	}else{
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'text/vtt'
		}
		
		res.writeHead(200,head)
		fs.createReadStream(path).pipe(res)
	}
});

module.exports = router;


 