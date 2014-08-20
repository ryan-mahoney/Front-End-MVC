var App = new Marionette.Application();

Marionette.TemplateCache.prototype.compileTemplate = function(template) {
	return App.templates[template];
};

Marionette.TemplateCache.prototype.loadTemplate = function(template) {
	return template.replace('#', '');
};

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
	//get an api_token
	App.start();
});

module.exports = App;