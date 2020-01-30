var router = require('express').Router(); 
var NorrTradeVideoComment = require('./../models/NorrTradeVideoComment');
var NorrTradeVideo = require('./../models/NorrTradeVideo');
var NorrUserVideoComment = require('./../models/video/NorrUserVideoComment');

//VIDEO COMMENTS
router.get('/comments',(req,res)=>{
		NorrTradeVideoComment.find({videoCommentVideo:req.query.videoId})
		.populate('commentUser')
		.exec( function (comments) {
			// body...
			res.json(comments)
		})
} );

router.post('/comments',(req,res)=>{
		var cmt = new NorrTradeVideoComment();
		cmt.videoCommentDescription = "KKKKKKKKLLLLLMMMM";
		cmt.videoCommentDate = new Date();
		cmt.videoCommentVideo='5e2dda5b648edf262c7ab3ab';
		cmt.videoCommentUser =  '5b86aed300772379e86952cc'

		NorrTradeVideoComment.create(cmt) 
		.then( function (comments) {
			// body...
			res.json(comments)
		})
} );



//VIDEO
router.get('/', (req,res) =>{
	var norrVideo; 
	if(req.query.videoId != "null" && req.query.videoId != undefined){
		norrVideo = NorrTradeVideo.findOne({_id:req.query.videoId});
	}else if(req.query.limite != "null" && req.query.limite != undefined){
		norrVideo = NorrTradeVideo.find()
		.limit( Number(req.query.limite) );
	}else{
		norrVideo = NorrTradeVideo.find();
	}
	norrVideo.populate('videoUser')
	.exec( function (err, video) {
		// body...
		if(err){
			res.sendStatus(500);
		}else if(video==null){
			res.sendStatus(204);
		}else{
			res.json(video)
		}
	})
})

router.post('/', (req,res) =>{
	//req.body = new NorrTradeVideo();
	req.body.videoDate = new Date()
	NorrTradeVideo.create(req.body)
	.then( function (video) {
		 
		res.json(video)
		 
	}, function (err) {
		// body...
		console.log(err)
		res.json(500)
	})
})

router.put('/', (req,res) =>{
	//req.body = new NorrTradeVideo();
	//req.body.videoDate = new Date()

	NorrUserVideoComment.findOne({norrUser:req.body.videoUserLike.norrUser,norrVideo:req.body.videoUserLike.norrVideo}).then((likeVideo) =>{
		if(!likeVideo)
		{
			NorrTradeVideo.update({_id:req.body.video._id},req.body.video)
			.then( function (video) { 
				NorrUserVideoComment.create(req.body.videoUserLike)
				.then(like =>{
					console.log("video liked!")
				})
				res.json(video) 
			}, function (err) {
				// body...
				console.log(err)
				res.json(500)
			});  
		}else{
			res.sendStatus(403);
		}
	})
	
})
module.exports = router;

