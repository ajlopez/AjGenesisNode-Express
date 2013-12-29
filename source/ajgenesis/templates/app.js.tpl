
/**
 * Module dependencies.
 */

var express = require('express')
  , engine = require('ejs-locals')
  , http = require('http')
  , path = require('path');
  
var routes = require('./routes/index');

<#  entities.forEach(function(entity) { #>var ${entity.name} = require('./routes/${entity.name}'};
<#  }); #>
var db = mongorepo.openDatabase('${project.name}', '${mongodb.host}', ${mongodb.port});
customers.initialize(db); 

var app = express();

app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

<#  entities.forEach(function(entity) { #>
app.get('/${entity.name}', ${entity.name}.index);
app.get('/${entity.name}/new', ${entity.name}.create);
app.post('/${entity.name}/new', ${entity.name}.insert);
app.get('/${entity.name}/:id', ${entity.name}.view);
app.get('/${entity.name}/:id/edit', ${entity.name}.edit);
app.post('/${entity.name}/:id/edit', ${entity.name}.update);
app.get('/${entity.name}/:id/remove', ${entity.name}.remove);
<#  }); #>

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
