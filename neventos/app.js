var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var error = require('./middlewares/error');

app = express();

//pasta views é a rais do html
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('neventos'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//raiz dos arquivos/paginas estaticos é public
app.use(express.static(__dirname + '/public'));

//routes usa a informação do controller que usa a informação do models
load('models')
  .then('controllers')
  .then('routes')
  .into(app);

//middlewares
app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, () => {
  console.log("Aplicação funcionando");
});