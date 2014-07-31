var BlogIndexView = Backbone.Marionette.ItemView.extend({
    template: "#BlogIndex",
    events: {
        "click .blog-show":          "show"
    },
    show: function (ev) {
        var id = $(ev.currentTarget).attr('data-id');
        window.location.hash = 'blog/' + id;
    }
});

var BlogIndexListView = Backbone.Marionette.CollectionView.extend({
    className: 'blog-list',
    childView: BlogIndexView
});