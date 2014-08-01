var ContactController = {
    add: function () {
        App.mainRegion.show(new ContactView({
            model: new ContactModel({})
        }));
    }
};

App.module("ContactModule", {
    define: function(ContactModule, App, Backbone, Marionette, $, _) {
        var AppRouter = Backbone.Marionette.AppRouter.extend({
            controller: ContactController,
            appRoutes: {
                "contact": "add"
            }
        });

        ContactModule.addInitializer(function(options) {
            new AppRouter();
        });
    }
});