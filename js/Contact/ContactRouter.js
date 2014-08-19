var
	Backbone = require('app/library/BackboneShim'),
	Marionette = require('app/library/MarionetteShim'),
	ContactController = require('app/Contact/ContactController');

var ContactRouter = Marionette.AppRouter.extend({
    controller: ContactController,
    appRoutes: {
        "contact": "add"
    }
});

module.exports = ContactRouter;