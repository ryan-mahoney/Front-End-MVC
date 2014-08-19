var 
	Backbone = require('app/library/BackboneShim'),
	Marionette = require('app/library/MarionetteShim'),
	BlogIndexView = require('app/Blog/views/BlogIndexView');

var BlogIndexListView = Marionette.CollectionView.extend({
    className: 'blog-list',
    childView: BlogIndexView
});

module.exports = BlogIndexListView;