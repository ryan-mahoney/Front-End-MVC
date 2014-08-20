var 
	BlogIndexView = require('Blog/Views/BlogIndexView');

var BlogIndexListView = Marionette.CollectionView.extend({
    className: 'blog-list',
    childView: BlogIndexView
});

module.exports = BlogIndexListView;