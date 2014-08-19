var 
	Backbone = require('library/BackboneShim'),
	BlogModel = require('Blog/models/BlogModel');

var BlogCollection = Backbone.Collection.extend({
    model: BlogModel,
    url: "/api/blogs"
});

module.exports = BlogCollection;