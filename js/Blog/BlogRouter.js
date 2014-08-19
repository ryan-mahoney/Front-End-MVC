var
	Backbone = require('app/library/BackboneShim'),
	Marionette = require('app/library/MarionetteShim'),
	BlogController = require('app/Blog/BlogController');

var BlogRouter = Marionette.AppRouter.extend({
    controller: BlogController,
    appRoutes: {
        "blogs": "index",
        "blog/:id": "show",
        "blog/:id/edit": "edit",
        "blog": "add"
    }
});

module.exports = BlogRouter;