var _ = require('underscore'),
	$ = require('jquery'),
	Backbone = require('backbone'),
	Handlebars = require('handlebars');

Backbone.$ = $;
var Marionette = require('backbone.marionette');
jQuery = $;
var Semantic = require('../../public/vendor/semantic/javascript/semantic.js');
var serializeObject = require('../../public/vendor/jquery.serializeObject.min.js');
Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(template) {
	return App.Templates[template];
};

Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(template) {
	return template.replace('#', '');
};

var App = new Backbone.Marionette.Application();

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