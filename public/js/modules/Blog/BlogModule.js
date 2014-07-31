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
    show: function (blogId) {
        var model = new BlogModel({});
        model.fetch().done(function () {
            App.mainRegion.show(new BlogShowView({
                model: model
            }));
        });
    }
};

App.module("BlogModule", {
    define: function(BlogModule, App, Backbone, Marionette, $, _) {
        
        var AppRouter = Backbone.Marionette.AppRouter.extend({
            controller: BlogController,

            appRoutes: {
                "index": "index",
                "show/:blogId": "show"
            }
        });

        BlogModule.addInitializer(function(options) {
            new AppRouter();
        });

        BlogModule.on("start", function() {
            BlogController.index();
            if (App.getCurrentRoute() === ""){
                BlogController.home();
            }
        });
    }
});