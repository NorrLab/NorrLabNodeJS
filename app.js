const express= require('express');
const multer= require('multer'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
//require(__dirname+'\\norr-modules\\batches\\accountServiceBatch.js');
var cors = require('cors');
var path = require('path');

// Requires multiparty 
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();
var fs = require("fs");
var storage = multer.diskStorage({
  destination: './document-libraries/users',
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
  }
})

var mulertUpload = multer({
  dest: './document-libraries/users'  
}) 
const FileUploadController = require('./controllers/FileUploadController');

mongoose.connect('mongodb://localhost:27017/norrlab',{ useNewUrlParser: true })
.catch( function(reason){
	console.log('NorrLab Eroor', reason)
});

require('./models/Trade');

require('./models/NorrUser');

var app = express(); 

var upload = multer({ storage: storage })

// use it before all route definitions
app.use(cors()); 

app.use(function(req, res, next) {
 // res.header("Access-Control-Allow-Origin", "192.168.1.10:8069");
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/norrlab-angularjs-2018', express.static(__dirname+'/node_modules/angular')); 
app.use('/norrlab-jquery-2018', express.static(__dirname+'/node_modules/jquery/dist')); 
app.use('/norrlab-ng-file-upload-2018', express.static(__dirname+'/node_modules/ng-file-upload/dist')); 
app.use('/norrlab-angular-route-2018', express.static(__dirname+'/node_modules/angular-route')); 
app.use('/norrlab-angular-aria-2018', express.static(__dirname+'/node_modules/angular-aria')); 
app.use('/norrlab-angular-material-2018', express.static(__dirname+'/node_modules/angular-material/')); 
app.use('/norrlab-angular-animate-2018', express.static(__dirname+'/node_modules/angular-animate')); 
app.use('/norrlab-angular-ui-notification-2018', express.static(__dirname+'/node_modules/angular-ui-notification/dist')); 
app.use('/norrlab-angular-local-storage-2018', express.static(__dirname+'/node_modules/angular-local-storage/dist')); 
app.use('/norrlab-angular-daterangepicker-2018/js', express.static(__dirname+'/node_modules/angular-daterangepicker/js')); 
app.use('/norrlab-angular-daterangepicker-2018/coffee', express.static(__dirname+'/node_modules/angular-daterangepicker/coffee')); 
app.use('/norrlab-daterangepicker-2018', express.static(__dirname+'/node_modules/daterangepicker'));

app.use('/norrlab-users-2018', express.static(__dirname+'/document-libraries/users')); 
app.use('/norrlab-users-video-2018', express.static(__dirname+'/norr-asset/v-asset')); 

 
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', require('./routes/TradesRoutes'));  
app.use('/norr-user', require('./routes/NorrUserRoutes'));
app.use('/norr-video', require('./routes/NorrTradeVideo'));             
app.use('/comment',require('./routes/NorrCommentRoute'));
app.use('/tradeswsdl',require('./routes/ws/tradesactivity/TradeActivity.js'));//
app.use('/mail-service',require('./routes/NorrMailRoute.js'));//

//Learning how to serve video from server.
app.use('norrlab-videos', require('./routes/NorrUserRoutes'));

app.use(express.static(__dirname + '/public')); 
 
 
app.get('/', function(req, res){
	console.log('ezad'); 
});

app.post('/norrlab-users-2018', mulertUpload.single('file'),  function(req, res) {
  console.log("done"); 
  res.json(req.file.filename);

});

var server = app.listen('369', function () {//origine:=369
	// body... 
	var host = server.address().address ;
	var port = server.address().port;
	console.log(`NorrLab started at http: ${host}:${port}`);
})