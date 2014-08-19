var Backbone = require('app/library/BackboneShim');

var ContactModel = Backbone.Model.extend({
    urlRoot: "/api/contact"
});

module.exports = ContactModel;