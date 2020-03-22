var router = require('express').Router(); 
var NorrTradeVideoComment = require('./../models/NorrTradeVideoComment');
var NorrTradeVideo = require('./../models/NorrTradeVideo');
var NorrUserVideoComment = require('./../models/video/NorrUserVideoComment');
var NorrUserVideoViewDay = require('./../models/video/NorrUserVideoViewDay');
var NorrUser = require('./../models/NorrUser');
var NorrTradeVideoTag = require('./../models/NorrTradeVideoTag');

//imports multer

var multer = require('multer');


//VIDEO COMMENTS


var fack = [{
_id:"any",
description:"string",
commentType:1,
commentUser:"any",
commentComment:"any"
},{
_id:"any",
description:"string",
commentType:3,
commentUser:"any",
commentComment:"any"
},{
_id:"any",
description:"string",
commentType:2,
commentUser:"any",
commentComment:"any"
}

]


/*=================================================*
*
*Video COMMENTS
*
*=================================================*/

router.get('/comment/reply/:commentId',(req,res) =>{
	NorrUserVideoComment.findOne({norrUser:req.body.videoUserLike.norrUser,norrVideo:req.body.videoUserLike.norrVideo}).
	then( comment =>{
		
	}).catch( err =>{
		console.log(err)
	})
	return res.status(200).json(fack)
} )


router.get('/comments',(req,res)=>{
		NorrTradeVideoComment.find({"videoCommentVideo":req.query.videoId})
		.populate('videoCommentUser')
		.sort({"videoCommentDate":-1})
		.then( function (comments) {
			if(comments	== null) {

					res.sendStatus(404)
			}else{

			// body...
			res.json(comments)	
			}
		})
} );

router.post('/comments',(req,res)=>{
		var cmt = req.body;
		 
		cmt.videoCommentDate = new Date(); 

		NorrTradeVideoComment.create(cmt) 
		.then( function (comments) {
			// body...
			res.json(comments)
		})
} );

/*=================================================*
*
*Video analytics
*
*=================================================*/
router.post('/analytics',(req,res)=>{
	NorrUserVideoViewDay.create(req.body)
	.then( function (viewVideo) {
		// body...
		res.status(200).json(viewVideo);
	},function (err) {
		// body...
		res.sendStatus(400);
	} ).catch( err =>{
		console.log(err)
	})
})

router.get('/analytics/:videoId',(req,res)=>{
	NorrUserVideoViewDay.find({"videoId":req.params.videoId})
	.then( function (viewVideo) {
		// body...
		res.status(200).json(viewVideo);
	},function (err) {
		// body...
		res.sendStatus(400);
	} ).catch( err =>{
		console.log(err)
	})
})

router.get('/analytics',(req,res)=>{
	NorrUserVideoViewDay.find({})
	.then( function (viewVideo) {
		// body...
		res.status(200).json(viewVideo);
	},function (err) {
		// body...
		res.sendStatus(400);
	} ).catch( err =>{
		console.log(err)
	})
})


/*=================================================*
*
*Video tags
*
*=================================================*/
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





/*=================================================*
*
*Video VIDEO
*
*=================================================*/
//
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
//get videos by user
/*userId
currentPage
chunk
criteria*/
var norrLabVideos={
				message:String,
				data:[],
				access:Boolean,
				totalCount:Number
			}

router.get('/:userId',(req,res) =>{
	NorrTradeVideo.countDocuments({"videoUser": req.query.userId}).then((totalCount)=>{
		var currentPage= Number(req.query.currentPage)
		var chunk= Number(req.query.chunk)
		var criteria= Number(req.query.criteria) 

		var skip = Number(chunk*currentPage);
		if(skip => totalCount)
			skip = 0;

		NorrTradeVideo.find({"videoUser":  req.query.userId})
		.skip(skip)
		.limit(chunk)
		.sort({videoDate:-1})
		.exec((err,videos) =>{ 
			norrLabVideos.data = videos;
			norrLabVideos.totalCount = totalCount;
			norrLabVideos.restedTotalCount = Math.ceil(totalCount / chunk);
			res.status(200).json(norrLabVideos)
		}) 
	}).catch(err =>{
			console.log(err);
			res.status(500).json({"error":"internal server error while getting video"})
		}) 
} )

var store = multer.diskStorage({
	destination:function (req,file,cb) {
		// body...
		cb(null,'./norr-asset/v-asset')
	},
	filename:function (req,file,cb) {
		// body...
		_videoFileName=file.originalname;
		_videoName = Date.now()+'-'+Math.random().toString(36).substring(7).toUpperCase();
		cb(null,_videoName)
	}
});

var upload = multer({storage:store});

var _videoName;
var _videoFileName;

router.post('/create-video/:userId', upload.single('fileInputVideo'), (req,res) =>{
	//req.body = new NorrTradeVideo(); 
	res.status(200).json({
		upload:upload
	})
	
})

router.post('/:userId', (req,res) =>{
	//req.body = new NorrTradeVideo();  
	try{
		req.body.videoDate = new Date();
		req.body._id = undefined;
		req.body.videoName = _videoName;
		req.body.videoUrl ='/norrlab-users-video-2018/'+_videoName;
		req.body.videoUser = req.params.userId;
		req.body.videoFileName = _videoFileName;
		req.body.videoTitle = _videoFileName;
		NorrUser.find({"_id":req.params.userId})
		.then(user =>{
			NorrTradeVideo.create(req.body)
			.then( function (video) {
				 
				res.json(video)
				 
			}, function (err) { 
				console.log(err)
				res.status(500).json({
					error:`Error creating video ${err.name}`
				})
			})
		})
	}catch(ex){
		console.log(ex);
		res.status(500).json({
			error:'server error'
		})
	}
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

router.delete('/delete/:videoId', (req,res) =>{
	NorrTradeVideo.deleteOne({"_id":req.params.videoId})
	.then( rtn =>{
		res.status(200).json({
			response:`${rtn} `
		})
	})
})

router.delete('/delete-express/', (req,res) =>{
	NorrTradeVideo.deleteMany({"videoUser":req.query.userId})
	.then( rtn =>{
		res.status(200).json({
			response:rtn
		})
	})
})

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

