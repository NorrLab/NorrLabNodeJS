var mongoose = require('mongoose');
const mongoosePaginateCursor = require('mongoose-paginate-cursor');

const mongoosePaginate = require('mongoose-paginate');

var TradeSchema = new mongoose.Schema({
	description : String,
	entry: Number,
	exit: Number,
	entryDate: Date,
	exitDate:Date,
	product:String,
	creationDate : Date,
	margin:Number,
	type:String,
	pictureUrl :String,
	status:String,
	profit:Number,
	broker:String,
	tradesLike:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	}],
	tradesDislike:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	}],
	tradeUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'NorrUser'
	},
	tradeDetail:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'TradeDetail'		
	}
}); 

TradeSchema.virtual('norrUser',{
	ref:'NorrUser',
	localField:'_id',
	foreignField:'trades'
})

TradeSchema.plugin(mongoosePaginate)

var Trade = mongoose.model('Trade', TradeSchema);

module.exports = Trade;