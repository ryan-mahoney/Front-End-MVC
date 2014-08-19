var
    App = require('App'),
    ContactRouter = require('Contact/ContactRouter');


App.module("ContactModule", {
    define: function(ContactModule, App, Backbone, Marionette, $, _) {
        ContactModule.addInitializer(function(options) {
            new ContactRouter();
        });
    }
});