var mongoose = require('mongoose');

var NorrLabTradeActionSchema = new mongoose.Schema({ 
			daily:{
				pictureUrl:String,
				description:String
			},
			hourly:{
				pictureUrl:String,
				description:String
			},
			actionType:String
})

var NorrLabTradeAction = mongoose.model('NorrLabTradeAction',NorrLabTradeActionSchema);
exports = module.exports=NorrLabTradeAction;