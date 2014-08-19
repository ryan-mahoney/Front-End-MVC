var 
	Backbone = require('app/library/BackboneShim'),
	BlogModel = require('app/Blog/models/BlogModel');

var BlogCollection = Backbone.Collection.extend({
    model: BlogModel,
    url: "/api/blogs"
});

module.exports = BlogCollection;