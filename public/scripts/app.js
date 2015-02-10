window.App = Ember.Application.create({

});

App.Router.map(function () {

});

App.ApplicationRoute = Ember.Route.extend({

});

App.ApplicationController = Ember.Controller.extend({

});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<p>TimeCop - Hello World</p>\n");
  
});