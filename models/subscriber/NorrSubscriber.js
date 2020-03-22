var mongoose = require('mongoose');

var NorrSubscriberSchema = new mongoose.Schema({  
  
	norrUserFollowed: {
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	},
	norrUserFollowing: {
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	}, 
	subqcriptionDate: Date
})

var NorrSubscriber = mongoose.model('NorrSubscriber', NorrSubscriberSchema);
exports = module.exports = NorrSubscriber;
