var ContactView = Marionette.ItemView.extend({
    template: "#Contact",
    className: 'contact',
    events: {
        "submit #contact-form":            "submit"
    },
    submit: function (e) {
        e.preventDefault();
        $('#contact-form').addClass('loading');
        var model = this.model;
        var data = Backbone.Syphon.serialize(this);
        if (data.id === '') {
            delete data.id;
        }
        model.set(data);
        model.save().done(function () {
            $('#contact-form')[0].reset();
            $('#contact-form').removeClass('loading');
            $('.contact-modal').modal('show');
        });
    }
});

module.exports = ContactView;