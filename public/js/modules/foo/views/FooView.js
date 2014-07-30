var FooView = Backbone.Marionette.ItemView.extend({
	template: "#sample",
	events: {
		"click .foo":          "foo"
	},
	foo: function () {
		alert('model value:' + this.model.get('foo'));
	}
});