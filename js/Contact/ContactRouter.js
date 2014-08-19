var
	Backbone = require('library/BackboneShim'),
	Marionette = require('library/MarionetteShim'),
	ContactController = require('Contact/ContactController');

var ContactRouter = Marionette.AppRouter.extend({
    controller: ContactController,
    appRoutes: {
        "contact": "add"
    }
});

module.exports = ContactRouter;