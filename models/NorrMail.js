var mongoose = require('mongoose');

var NorrMailSchema = new mongoose.Schema({

	message:String,
	read:Boolean,
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	},
	destination:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	},
	commentDate:Date,
})

var NorrMail = mongoose.model('NorrMail', NorrMailSchema);
exports = module.exports=NorrMail;
