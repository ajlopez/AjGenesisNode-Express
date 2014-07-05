#!/usr/bin/env node
var debug = require('debug')('${project.name}');

var mongodb = require('../libs/mongodb');
var app = require('../app');
app.set('port', process.env.PORT || 3000);

<#  entities.forEach(function(entity) { #>
var ${entity.name} = require('../services/${entity.name}');
<#  }); #>

var db = mongodb.openDatabase('mycompany', 'localhost', 27017, function (err, data) {
    if (err) {
        debug(err);
        return;
    }
    
<#  entities.forEach(function(entity) { #>
    ${entity.name}.initialize(db);
<#  }); #>
    
    var server = app.listen(app.get('port'), function() {
      debug('Express server listening on port ' + server.address().port);
    });    
});


