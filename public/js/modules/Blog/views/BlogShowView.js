var BlogShowView = Backbone.Marionette.ItemView.extend({
    template: "#BlogShow",
    className: 'blog-single',
    events: {
        "click .blog-title":          "titleEdit"
    },
    titleEdit: function (ev) {
        var $title = $(ev.currentTarget);
        console.log($title.html());
    }
});