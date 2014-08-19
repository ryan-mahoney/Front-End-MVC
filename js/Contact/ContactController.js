var
	ContactView = require('app/Contact/views/ContactView'),
	ContactModel = require('app/Contact/models/ContactModel'),
	App = require('app/App');

var ContactController = {
    add: function () {
        App.mainRegion.show(new ContactView({
            model: new ContactModel({})
        }));
    }
};

module.exports = ContactController;