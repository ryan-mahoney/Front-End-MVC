var BlogController = {
    index: function () {
        var collection = new BlogCollection({
            model: new BlogModel({})
        });
        collection.fetch().done(function () {
            App.mainRegion.show(new BlogIndexListView({
                collection: collection
            }));
        });
    },
    show: function (id) {
        var model = new BlogModel({});
        model.set({id: id});
        model.fetch().done(function () {
            App.mainRegion.show(new BlogShowView({
                model: model
            }));
        });
    },
    edit: function (id) {
        var model = new BlogModel({});
        model.set({id: id});
        model.fetch().done(function () {
            App.mainRegion.show(new BlogEditView({
                model: model
            }));
        });
    },
    add: function () {
        var model = new BlogModel({});
        model.set({title: "New Post"});
        App.mainRegion.show(new BlogEditView({
            model: model
        }));
    }
};

App.module("BlogModule", {
    define: function(BlogModule, App, Backbone, Marionette, $, _) {
        
        var AppRouter = Backbone.Marionette.AppRouter.extend({
            controller: BlogController,

            appRoutes: {
                "blogs": "index",
                "blog/:id": "show",
                "blog/:id/edit": "edit",
                "blog": "add"
            }
        });

        BlogModule.addInitializer(function(options) {
            new AppRouter();
        });

        BlogModule.on("start", function() {
            if (App.getCurrentRoute() === ""){
                window.location.hash = 'blogs';
            }
        });
    }
});