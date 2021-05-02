const path = require('path');
const hbs = require('ejs');
const bodyParser = require('body-parser');

const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

//var key_rajaongkir = "c3095aff2b7487c569b16ae5f047b650"; // akun 2
var key_rajaongkir = "42cfdd8f36675e7233d754fcde2bc14b"; // akun 1
//var key_rajaongkir = "870882e64fca9597a47971f82bebe87b"; // akun 3


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
server.listen(process.env.PORT || 3000, () => console.log('server on port 3000'));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets',express.static(__dirname + '/public'));
app.use('/main',express.static(__dirname + '/'));

app.get('/api', function(req, res) {

	var request = require("request");
	var data;
	var options = {
	  	method: 'GET',
	  	url: 'https://api.rajaongkir.com/starter/city',
	  
	  	headers: {key: key_rajaongkir}
	};

	function data_ongkir(callback){
		request(options, function data_ongkir(error, res, body) {
			if (error) throw new Error(error);
			data = JSON.parse(body)
			callback(data.rajaongkir.results);

			console.log(data.rajaongkir.results);
		});
	}

	data_ongkir(function(data){
		res.render('api_ui',{
			rajaongkir:data,
		});
	})
})