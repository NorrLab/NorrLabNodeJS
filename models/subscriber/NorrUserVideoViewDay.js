var mongoose = require('mongoose');

var NorrLabViewVideoSchema = new mongoose.Schema({  

	count:Number,
	viewedDate:Date, 
	videoId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrTradeVideo'
	}
})

var NorrUserVideoViewDay = mongoose.model('NorrUserVideoViewDay', NorrLabViewVideoSchema);
exports = module.exports = NorrUserVideoViewDay;
