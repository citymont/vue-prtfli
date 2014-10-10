'use strict';

/*
	Router
	init()
 */

var page = require('page');

var initRouter = function(app) {
	
	page.base('');
	page('/', function() { app.currentView = 'view2'; app.pageActive = "_root"; } );
	page('/home', function() { app.currentView = 'view2'; app.pageActive = "_root"; } );
	page('/page/:id', function(ctx) {app.currentView = 'view1'; app.pageActive = ctx.params.id;  });
	page();

}

module.exports = {
	init: initRouter
};