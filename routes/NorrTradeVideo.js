var router = require('express').Router(); 
var NorrTradeVideoComment = require('./../models/NorrTradeVideoComment');
var NorrTradeVideo = require('./../models/NorrTradeVideo');
var NorrUserVideoComment = require('./../models/video/NorrUserVideoComment');
var NorrUser = require('./../models/NorrUser');
var NorrTradeVideoTag = require('./../models/NorrTradeVideoTag');
//VIDEO COMMENTS
router.get('/comments',(req,res)=>{
		NorrTradeVideoComment.find({"videoCommentVideo":req.query.videoId})
		.populate('videoCommentUser')
		.then( function (comments) {
			if(comments	== null) {

					res.sendStatus(404)
			}else{

			// body...
			res.json(comments)	
			}
		})
} );

router.post('/tags',(req,res)=>{
	var videoId = req.body[0].videoId; 
	
	NorrTradeVideoTag.deleteMany({"videoId": videoId})
	.then( function (deleted) {
		// body...
		console.log(deleted)
		NorrTradeVideoTag.create(req.body)
			.then( function (tag) {
				 res.status(200).json(tag);
			},function (err) {
				console.log(err)
				 res.status(400);
			}).catch(ex =>{
				console.log(ex)
		})
	})
})

router.get('/tags/:videoId',(req,res)=>{
	NorrTradeVideoTag.find({"videoId":req.params.videoId})
	.then( function (tags) {
		 res.status(200).json(tags);
	},function (err) {
		console.log(err)
		 res.status(400);
	}).catch(ex =>{
		console.log(ex)
	})
})


router.post('/comments',(req,res)=>{
		var cmt = req.body;
		 
		cmt.videoCommentDate = new Date();
		//cmt.videoCommentVideo='5e2dda5b648edf262c7ab3ab';
		//cmt.videoCommentUser =  '5b86aed300772379e86952cc'

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

router.put('/video-views', (req,res) =>{
	//req.body = new NorrTradeVideo(); 
	NorrTradeVideo.updateOne({"_id":req.body._id}, {$set:{"videoViews":req.body.videoViews} })
	.then( function (video) {
		 
		res.json(200);
		 
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

router.patch('/:userId', (req,res) =>{  

		NorrTradeVideo.update({"videoUser":req.params.userId, "_id":req.body._id},req.body)
		.then(videos =>{
			res.status(200).json(videos)
		}).catch(err=>{
			console.log(err)
			res.sendStatus(500);
		} )  
	
})

router.get('/:userId/videos',(req,res) =>{ 
	
	NorrTradeVideo.find({"videoUser":req.params.userId})
	.then(videos =>{
		res.status(200).json(videos)
	}).catch(err=>{
		console.log(err)
		res.sendStatus(500);
	} ) 
} )

router.get('/:userId/videos/:videoId',(req,res) =>{ 
	
	NorrTradeVideo.findOne({"videoUser":req.params.userId,"_id":req.params.videoId})
	.then(video =>{
		res.status(200).json(video);
	}).catch(err=>{
		console.log(err);
		res.sendStatus(500);
	}) 

} )

router.put('/:userId/videos/:videoId',(req,res) =>{ 
	
	NorrTradeVideo.updateOne({"videoUser":req.params.userId,"_id":req.params.videoId},req.body)
	.then(video =>{
		res.status(200).json(video);
	}).catch(err=>{
		console.log(err);
		res.sendStatus(500);
	}) 

} )

module.exports = router;

