var BlogModel = Backbone.Model.extend({
	urlRoot: "/api/blog"
});

var BlogCollection = Backbone.Collection.extend({
	model: BlogModel,
	url: "/api/blogs"
});