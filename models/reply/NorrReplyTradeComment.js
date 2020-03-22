var mongoose = require('mongoose');

var NorrReplyTradeCommentSchema = new mongoose.Schema({  

	count:Number,
	viewedDate:Date, 
	videoId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrTradeVideo'
	}
})

var NorrReplyTradeComment = mongoose.model('NorrReplyTradeComment', NorrReplyTradeCommentSchema);
exports = module.exports = NorrReplyTradeComment;
