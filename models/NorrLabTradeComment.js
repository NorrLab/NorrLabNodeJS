var mongoose = require('mongoose');

var NorrLabTradeCommentSchema = new mongoose.Schema({  

	comment:String,
	commentDate:Date,
	commentUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	},
	commentTrade:{
			type: mongoose.Schema.Types.ObjectId,
			ref:'Trade'
		}
})

var NorrLabTradeComment = mongoose.model('NorrLabTradeComment', NorrLabTradeCommentSchema);
exports = module.exports=NorrLabTradeComment;


	 
