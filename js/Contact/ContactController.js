var
	ContactView = require('Contact/views/ContactView'),
	ContactModel = require('Contact/models/ContactModel'),
	App = require('App.js');

var ContactController = {
    add: function () {
        App.mainRegion.show(new ContactView({
            model: new ContactModel({})
        }));
    }
};

module.exports = ContactController;