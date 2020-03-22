var router = require('express').Router(); 
var NorrTradeVideoComment = require('./../models/NorrTradeVideoComment');
var NorrTradeVideo = require('./../models/NorrTradeVideo');
var NorrUserVideoComment = require('./../models/video/NorrUserVideoComment');
var NorrUserVideoViewDay = require('./../models/video/NorrUserVideoViewDay');

var NorrReplyVideoComment = require('./../models/reply/NorrReplyVideoComment');
var NorrUser = require('./../models/NorrUser');
var NorrTradeVideoTag = require('./../models/NorrTradeVideoTag');

//imports multer

var multer = require('multer');


/*=================================================*
*
*Video COMMENTS
*
*=================================================*/

router.post('/reply/:commentId',(req,res) =>{
	NorrUserVideoComment.findOne({"norrUser":req.body.replyUser,"norrVideo":req.body.videoId}).
	then( comment =>{
		NorrReplyVideoComment.create(req.body)
		.then(created =>{
			res.status(200).json(created)
		}).catch( err =>{
			console.log(err); 
			res.status(500).json({})
			})
	}).catch( err =>{
		console.log(err);
		res.status(500).json({})
	}) 
} )


router.get('/reply/:commentId',(req,res)=>{
		NorrReplyVideoComment.find({"videoCommentId":req.params.commentId})
		.populate('replyUser')
		.then( function (reply) {
			if(reply	== null) {
 				res.sendStatus(404)
			}else{
				res.status(200).json(reply)	
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


exports = module.exports = router;
