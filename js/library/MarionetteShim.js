var 
	_ = require('underscore'),
	Backbone = require('app/library/BackboneShim'),
	Marionette = require('backbone.marionette'),
	Templates = require('app/library/Templates');

Marionette.TemplateCache.prototype.compileTemplate = function(template) {
	console.log('A:' + template);
	console.log(Templates);
	return Templates[template];
};

Marionette.TemplateCache.prototype.loadTemplate = function(template) {
	console.log('B:' + template);
	return template.replace('#', '');
};

module.exports = Marionette; 