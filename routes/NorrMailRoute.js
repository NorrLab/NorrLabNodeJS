var router = require('express').Router();
var NorrTradeVideoComment = require('./../models/NorrTradeVideoComment');
var NorrTradeVideo = require('./../models/NorrTradeVideo');
var NorrUserVideoComment = require('./../models/video/NorrUserVideoComment');
var NorrUserVideoViewDay = require('./../models/video/NorrUserVideoViewDay');

var NorrReplyVideoComment = require('./../models/reply/NorrReplyVideoComment');
var NorrUser = require('./../models/NorrUser');
var NorrMail = require('./../models/NorrMail');

//imports multer
var multer = require('multer');

router.post('/',(req,res) =>{
	NorrMail.create(req.body)
    .then(function(message){
        res.status(200).json(message);
    },function(err){
        res.status(500).json(message);
    })
} )

router.get('/:userId',(req,res) =>{
	NorrMail.find({$or:[{"destination":req.params.userId},{"author":req.params.userId}]})
    .then(function(message){
        res.status(200).json(message);
    },function(err){
    	console.log(message);
        res.status(500).json("Internal Server Error");
    })
} )


router.get('/:authorId/:targetId',(req,res) =>{
	NorrMail.find({$or:[{"destination":req.params.targetId,"author":req.params.authorId},{"destination":req.params.authorId,"author":req.params.targetId}]})
    .then(function(message){
        res.status(200).json(message);
    },function(err){
    	console.log(message);
        res.status(500).json("Internal Server Error");
    })
} )

module.exports = router;

