var mongoose = require('mongoose');
 

var NorrTradeVideoTagSchema = new mongoose.Schema({  

	name:String, 
	videoId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrTradeVideo'
	}
})

var NorrTradeVideoTag = mongoose.model('NorrTradeVideoTag', NorrTradeVideoTagSchema);
exports = module.exports=NorrTradeVideoTag;
