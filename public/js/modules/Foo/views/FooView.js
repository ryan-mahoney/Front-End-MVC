var FooView = Backbone.Marionette.ItemView.extend({
	template: "#FooSample",
	events: {
		"click .foo":          "foo"
	},
	foo: function () {
		alert('model value:' + this.model.get('foo'));
	}
});