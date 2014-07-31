var BlogIndexView = Backbone.Marionette.ItemView.extend({
    template: "#BlogIndex",
    events: {
        "click .blog-show":          "show"
    },
    show: function (ev) {
        var id = $(ev.currentTarget).attr('data-id');
        BlogController.show(id);
    }
});

var BlogIndexListView = Backbone.Marionette.CollectionView.extend({
    className: 'test',
    childView: BlogIndexView
});