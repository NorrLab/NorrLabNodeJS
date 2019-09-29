const mongoose = require('mongoose');

var NorrUserSchema = new mongoose.Schema({
	firstName:String,
	lastName:String,
	email:String,
	password:String,
	city:String,
	userRole:String,
	userPictureUrl:String,
	userCreationDate:Date,
	userFollowers:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUserSchema'
	}],
	userComments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUserSchema'
	}],
	userTrades:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Trade'
	}],
	userWins:Number,
	userLosses:Number,
	userProfits:Number,

	userPercentWins:Number,
	userPercentLosses:Number,

}); 
 

var NorrUser = mongoose.model('NorrUser', NorrUserSchema);
module.exports = NorrUser;