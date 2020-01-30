var mongoose = require('mongoose');

var NorrUserVideoCommentSchema = new mongoose.Schema({  
  
	norrUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	}, 
	norrUserLike:Number,
	norrUserDislike:Number,
	norrVideo:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrTradeVideo'
	}
})

var NorrUserVideoComment = mongoose.model('NorrUserVideoComment', NorrUserVideoCommentSchema);
exports = module.exports = NorrUserVideoComment;
