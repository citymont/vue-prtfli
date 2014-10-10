'use strict';

/*
	Components
	init()
 */

var Vue = require('vue');

var init = function() {

	Vue.component('view1', {
		template: '<h1>{{model.title}}</h1><p>{{model.content}}</p>',
		created: function () {
			//var data = this.$data;
	    }
	})
	Vue.component('view2', {
		template: '<h1>{{homeTitre}}</h1>{{homeContent}}',
		created: function () {
			//var data = this.$data;
	    }
	})
}


module.exports = {
	init: init
};