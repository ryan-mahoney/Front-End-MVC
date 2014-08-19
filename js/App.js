var 
	Backbone = require('./library/BackboneShim'),
	Marionette = require('./library/MarionetteShim'),
	$ = require('jquery');

//jQuery = $;
//var Semantic = require('../public/vendor/semantic/javascript/semantic.js');
//var serializeObject = require('../public/vendor/jquery.serializeObject.min.js');


var App = new Marionette.Application();

App.addRegions({
	mainRegion: '#content',
	headerRegion: '#header',
	footerRegion: '#footer'
});

App.getCurrentRoute = function() {
	return Backbone.history.fragment || '';
};

App.on("start", function() {
	if (Backbone.history) {
    	Backbone.history.start();
  	}
});

$(document).ready(function () {
	App.start();
});

module.exports = App;