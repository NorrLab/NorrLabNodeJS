var mongoose = require('mongoose');

var NorrTradeVideoCommentSchema = new mongoose.Schema({  
  
	videoCommentDescription:String,
	videoCommentDate:Date, 
	videoCommentUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	},
	videoCommentVideo:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrTradeVideo'
	}
})

var NorrTradeVideoComment = mongoose.model('NorrTradeVideoComment', NorrTradeVideoCommentSchema);
exports = module.exports=NorrTradeVideoComment;


	 
/*
videoId=1; 
videoUrl = "http://192.168.1.10:369/norrlab-users-video-2018/test.mp4";
videoTitle = "Desire - The First Step toward Riches | Think and Grow Rich";
videoPoster = "http://192.168.1.10:369/norrlab-users-video-2018/test.jpg"; 
videoDate = "29 Dec 2019";
videoDescription = " Dissid Retrouvez toutes les interventions  Dissid Retrouvez toutes les interventions";
	  		
videoLikes = {"minus":65,"bonus":987,"userId":0}; 
videoViews = "326.000"; 


*/