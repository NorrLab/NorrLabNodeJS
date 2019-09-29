const express= require('express');
const multer= require('multer'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 


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

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', require('./routes/TradesRoutes'));  
app.use('/norr-user', require('./routes/NorrUserRoutes')); 


app.use(express.static(__dirname + '/public')); 
 
 
app.get('/', function(req, res){
	console.log('ezad'); 
});

app.post('/norrlab-users-2018', mulertUpload.single('file'),  function(req, res) {
  console.log("done"); 
  res.json(req.file.filename);

});

var server = app.listen('8398', function () {
	// body... 
	var host = server.address().address ;
	var port = server.address().port;
	console.log(`NorrLab started at http: ${host}:${port}`);
})