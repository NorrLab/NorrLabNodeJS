var mongoose = require('mongoose');
var NorrLabTradeAction = require('./NorrLabTradeAction');
//var cascadingRelations = require('cascading-relations');

var TradeDetailSchema = new mongoose.Schema({
		entry:{
			type: mongoose.Schema.Types.ObjectId,
			ref:'NorrLabTradeAction'
		},
		management:{
			type: mongoose.Schema.Types.ObjectId,
			ref:'NorrLabTradeAction'
		},
		norrlabTrade:{
			type: mongoose.Schema.Types.ObjectId,
			ref:'Trade'
		}
})

//TradeDetailSchema.plugin(cascadingRelations);

var TradeDetail = mongoose.model('TradeDetail',TradeDetailSchema);
exports = module.exports=TradeDetail;