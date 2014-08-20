var
	ContactController = require('Contact/ContactController');

var ContactRouter = Marionette.AppRouter.extend({
    controller: ContactController,
    appRoutes: {
        "contact": "add"
    }
});

module.exports = ContactRouter;