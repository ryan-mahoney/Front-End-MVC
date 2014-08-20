var
	ContactView = require('Contact/Views/ContactView'),
	ContactModel = require('Contact/Models/ContactModel'),
	App = require('App');

var ContactController = {
    add: function () {
        App.mainRegion.show(new ContactView({
            model: new ContactModel({})
        }));
    }
};

module.exports = ContactController;