var 
    BlogCollection = require('Blog/Models/BlogCollection'),
    BlogModel = require('Blog/Models/BlogModel'),
    BlogIndexListView = require('Blog/Views/BlogIndexListView'),
    BlogShowView = require('Blog/Views/BlogShowView'),
    BlogEditView = require('Blog/Views/BlogEditView'),
    App = require('App');

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

module.exports = BlogController;