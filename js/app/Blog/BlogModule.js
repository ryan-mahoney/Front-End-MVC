var
    BlogController = require('Blog/BlogController'),
    BlogRouter = require('Blog/BlogRouter'),
    App = require('App');

App.module("BlogModule", {
    define: function(BlogModule, App, Backbone, Marionette, $, _) {
        
        BlogModule.addInitializer(function(options) {
            new BlogRouter();
        });

        BlogModule.on("start", function() {
            if (App.getCurrentRoute() === ""){
                window.location.hash = 'blogs';
            }
        });
    }
});