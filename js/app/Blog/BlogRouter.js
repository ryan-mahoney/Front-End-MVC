var
	BlogController = require('Blog/BlogController');

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