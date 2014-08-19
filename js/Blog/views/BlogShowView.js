var
	Backbone = require('app/library/BackboneShim'),
    Marionette = require('app/library/MarionetteShim'),
	$ = require('jquery');

var BlogShowView = Marionette.ItemView.extend({
    template: "#BlogShow",
    className: 'blog-single',
    events: {
        "click .blog-edit-button":          "blogEdit"
    },
    blogEdit: function (e) {
    	var id = $(e.currentTarget).attr('data-id');
        window.location.hash = 'blog/' + id + '/edit';
    }
});

module.exports = BlogShowView;