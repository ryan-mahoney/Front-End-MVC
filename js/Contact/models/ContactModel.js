var Backbone = require('library/BackboneShim');

var ContactModel = Backbone.Model.extend({
    urlRoot: "/api/contact"
});

module.exports = ContactModel;