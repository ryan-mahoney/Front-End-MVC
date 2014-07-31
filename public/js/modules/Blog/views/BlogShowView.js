var BlogShowView = Backbone.Marionette.ItemView.extend({
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