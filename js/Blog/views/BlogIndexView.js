var 
    Backbone = require('app/library/BackboneShim'),
    Marionette = require('app/library/MarionetteShim'),
    $ = require('jquery');

var BlogIndexView = Marionette.ItemView.extend({
    template: "#BlogIndex",
    events: {
        "click .blog-show":          "show",
        "click .blog-add-button":    "add"
    },
    show: function (e) {
        var id = $(e.currentTarget).attr('data-id');
        window.location.hash = 'blog/' + id;
    },
    add: function (e) {
        window.location.hash = 'blog';
    }
});

module.exports = BlogIndexView;