var 
	BlogModel = require('Blog/Models/BlogModel');

var BlogCollection = Backbone.Collection.extend({
    model: BlogModel,
    url: "/api/blogs"
});

module.exports = BlogCollection;