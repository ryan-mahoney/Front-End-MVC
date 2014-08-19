var 
	Backbone = require('library/BackboneShim'),
	Marionette = require('library/MarionetteShim'),
	BlogIndexView = require('Blog/views/BlogIndexView');

var BlogIndexListView = Marionette.CollectionView.extend({
    className: 'blog-list',
    childView: BlogIndexView
});

module.exports = BlogIndexListView;