var mongoose = require('mongoose');

var NorrTradeVideoSchema = new mongoose.Schema({  

	videoUrl:String,
	videoTitle:String,
	videoPoster:String,
	videoDescription:String,
	videoDate:Date,
	videoLikes:Number,
	videoDislikes:Number,
	videoViews:Number,
	videoUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	},
	public:Boolean,
	recordingDate:Date,
	videoLocation:String,
	videoFileName:String

})

var NorrTradeVideo = mongoose.model('NorrTradeVideo', NorrTradeVideoSchema);
exports = module.exports=NorrTradeVideo;


	 
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