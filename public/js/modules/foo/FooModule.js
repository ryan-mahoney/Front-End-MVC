var FooController = {
	home: function () {
		console.log('home');
		var model = new FooModel({
			foo: "FooBar!"
		});
		var view = new FooView({
			model: model
		});
		App.mainRegion.show(view);
	},
	bar: function () {
		console.log('bar');
		var model = new FooModel({
			foo: "FooBar!"
		});
		var view = new FooView({
			model: model
		});
		App.mainRegion.show(view);
	},
	bash: function (id) {
		console.log('bar: ' + id);
	}
};

App.module("FooModule", {
	define: function(FooModule, App, Backbone, Marionette, $, _) {
    	
		var AppRouter = Backbone.Marionette.AppRouter.extend({
			controller: FooController,

			appRoutes: {
				"foo": "bar",
				"bash/:id": "bash"
			}
		});

		FooModule.addInitializer(function(options) {
		    new AppRouter();
		});

		FooModule.on("start", function() {
			FooController.home();
			if (App.getCurrentRoute() === ""){
	    		FooController.home();
	    	}
		});
	}
});