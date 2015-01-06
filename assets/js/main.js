'use strict';

/*!
 * vue page
 *
 * MIT licensed
 * Copyright (C) 2014 Thibaut Villemont, http://moderntree.net
 */


var Vue = require('vue'),
	request = require('superagent'),
	bonzo = require('bonzo'),
	bean = require('bean'),
	routerPage = require('./router'),
	components = require('./components');

	//Vue.config({debug: false, silent: false});


var App = (function () {
	
	var $app = document.getElementById('app'),
	    $body = document.body,
	    data;

    return {

        init: function() {

        	components.init();
        	this.start();
 		this.effectEnded();

        },

        start: function() {

        	var parent = this;

        	request
        		.get('/assets/data/data.json') // fetch json with ajax
				.end(function(res){
					$body.style.display = 'block';
					parent.data = res.body;
					parent.startVueModels(res,Vue,parent.rooterCb); // on end, start VueModels
				});
        	
        },

		rooterCb : function (app){

			routerPage.init(app);
		},

		startVueModels : function(res,Vue,callback) {

			/* declare app VM */

			var app = new Vue({
			    el: '#app',
			    data: this.data
			    /*components: { // local component
			        view1: {
						template: '<h1>{{model.title}}</h1><p>{{model.content}}</p>',
						created: function () {
							//var data = this.$data;
					    }
					}
			    }*/
			});

			/* watch when pageActive change and "update" view */

			app.$watch('pageActive', function (value, mutation) {

				if (app.pageActive=="_root") {
					App.effectClass();
				} else {

					if (this.pages[app.pageActive]) {
					
					this.pages.model.title = this.pages[app.pageActive].title;
					this.pages.model.content = this.pages[app.pageActive].content;
					App.effectClass();

					} else {
						/* Not found */
						document.getElementsByTagName('body')[0].innerHTML = 'Not found!';
					}

				}
				

			})

			/* declare menu VM */

			var menu = new Vue({
			    el: '#menu',
			    data: App.clone(this.data),
			    methods: {
			    	transition : function (e) {
			    		//click menu bold
			    	}
			    }
			})

			/* Delete model node from menu.data object */
			
			menu.pages.$delete('model');
			
			/* Callback */

			callback(app);
			
		},

		clone : function (obj){
		        
		    var copy = JSON.parse(JSON.stringify(obj));
		    return copy;

		},

		effectEnded: function() {

			bean.on($app, 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', App.effectHandler);
		
		},

		effectHandler: function(){

			if(bonzo($app).hasClass('fadeIn')) { 
				bonzo($app).removeClass('animated fadeIn');
			}

		},
		effectClass: function() {
			if(bonzo($app).hasClass('animated')) { 
				bonzo($app).removeClass('animated fadeIn'); 
			} 
			else { 
				bonzo($app).addClass('animated fadeIn'); 
			}
		}
    };

})();

/* Start App */

App.init();


