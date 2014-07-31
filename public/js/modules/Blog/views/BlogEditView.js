var BlogEditView = Backbone.Marionette.ItemView.extend({
    template: "#BlogEdit",
    className: 'blog-edit',
    events: {
        "click .blog-submit":           "submit",
        "submit #blog-form":            "submit"
    },
    submit: function (e) {
        e.preventDefault();
        this.model.set($('#blog-form').serializeObject());
        this.model.save();
        window.location.hash = '#blog/' + this.model.get('id');
    }
});