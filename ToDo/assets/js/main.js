$(function () {
  window.App = {
    Models: {},
    Views: {},
    Collection: {}
  };
  //Model for single task
  App.Models.Task = Backbone.Model.extend({
    defaults: {
        title: "A New Task Title",
        status: false
    }
  });

  //View for single Model(task)
  App.Views.Task = Backbone.View.extend({
    tagName: "li",
    initialize: function () {
      this.template = _.template($('#li_template').html());
    },
    render: function () {
    	var t_templ = this.template(this.model.toJSON());
    	this.$el.html(t_templ);
    	return this;

    }

  });

  //View for Collection of tasks(Model)
  App.Views.Tasks = Backbone.View.extend({
  	tagName: "ul",
    initialize: function () {
      this.collection.on('add', this.addNew, this)
    },
    render: function () {
      // >>>> СЮДА
      // this.collection.each(this.addNew, this);
      return this;
    },
    addNew: function (mod) {
      var new_task = new App.Views.Task({model:mod})
      this.$el.append(new_task.render().el)
    }

  });

  //Collection of tasks(Model)
  App.Collection.Task = Backbone.Collection.extend({
  	model: App.Models.Task
  });

  App.Views.addTask = Backbone.View.extend({
    el: '#add_new',
    events: {
        'keypress': 'submit'
    },
    submit: function (e) {
      if (e.keyCode !=13) return;
      var text = this.$el.val();
      if(!text) return;
      this.collection.add({title: text});
      this.$el.val('');
    }

  });
window.taskCol = new App.Collection.Task([]);
var viewTasks = new App.Views.Tasks({collection: taskCol});
var addTask = new App.Views.addTask({collection:taskCol});
$('#list').append(viewTasks.render().el);
});