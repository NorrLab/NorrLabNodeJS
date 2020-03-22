var mongoose = require('mongoose');

var NorrReplyVideoCommentSchema = new mongoose.Schema({   
	replyUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	}, 
	replyDate:Date,
	videoCommentReply:String,
	videoId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrTradeVideo'
	},
	videoCommentId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrTradeVideoComment'
	}
})

var NorrReplyVideoComment = mongoose.model('NorrReplyVideoComment', NorrReplyVideoCommentSchema);
exports = module.exports = NorrReplyVideoComment;
