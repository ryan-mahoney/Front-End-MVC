var
    App = require('app/App'),
    ContactRouter = require('app/Contact/ContactRouter');


App.module("ContactModule", {
    define: function(ContactModule, App, Backbone, Marionette, $, _) {
        ContactModule.addInitializer(function(options) {
            new ContactRouter();
        });
    }
});