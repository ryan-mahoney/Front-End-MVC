var Backbone = require('app/library/BackboneShim');

var BlogModel = Backbone.Model.extend({
    urlRoot: "/api/blog"
});

module.exports = BlogModel;