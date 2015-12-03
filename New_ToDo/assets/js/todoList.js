$(function () {
  window.App = {
    Models: {},
    Views: {},
    Collection: {}
  };

//Model for Task in ToDo List
  App.Models.Task = Backbone.Model.extend({
  	defaults: {
  	  title: "A New Task Title",
  	  descr: '',
  	  list: 'ToDo List',
  		status: false
  	},
  	toggleDoneStatus: function() {
  		this.save({status: !this.get('status')})
  	},
  	clear: function () {
  		this.destroy();
  	}
  });

//View for Task(Model)
  App.Views.todoView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.template = _.template($('#li_template').html());
      this.model.on('destroy', this.remove, this);
      this.model.on('change', this.render, this);
    },
    events: {
      'mouseenter': 'showHelp',
      'mouseleave': 'hideHelp',
      'mouseleave .li-input': 'hideHelp',
      'mouseenter .li-input': 'hideHelp',
      'click .li-delete': 'deleteTask',
      'click .li-check': 'toggleStatus',
      'dblclick .li-label': 'changeTitle',
      'keypress .li-input': 'saveAndLeaveTitle',
      'blur .li-input': 'leaveEdit'
    },
    render: function () {
      var newLi = this.template(this.model.toJSON());
      this.$el.html(newLi);
      todoFooter.render();
      return this;
    },
    showHelp: function (e) {
      this.$('.li-help').toggleClass('display');
      this.$('.li-help').animate({right: "-10px"}, 300);
    },
    hideHelp: function () {
      this.$('.li-help').animate({right: "-110px"}, 300);
      this.$('.li-help').toggleClass('display');
    },
    deleteTask: function () {
      var newMod = archivedCollection.create(this.model.toJSON());
      newMod.save({status: false, list: "Archive List"})
      this.model.clear();
    },
    toggleStatus: function () {
      this.model.toggleDoneStatus();
    },
    changeTitle: function (e) {
      this.$('.li-label').toggleClass('display');
      this.$('.li-input').toggleClass('display');
      this.$('.li-input').val(this.model.get('title'));
      this.$('.li-input').focus();
    },
    saveAndLeaveTitle: function (e) {
      if (e.keyCode != 13) return;
      var newTitle = this.$('.li-input').val();
      if (e.keyCode == 13 && newTitle.replace(/\s/g, '') == '') return;
      this.model.save({title: newTitle});
      this.$('.li-input').val('');

    },
    leaveEdit: function () {
      this.$('.li-input').val('');
      this.$('.li-input').toggleClass('display');
      this.$('.li-label').toggleClass('display');
      this.render();
    }
  });

//Collection for ToDo List Tasks(Models)
  App.Collection.todoList = Backbone.Collection.extend({
    model: App.Models.Task,
    localStorage: new Store("todoList")
  });

//View for Collection of ToDo List Tasks(Models)
  App.Views.todoViews = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
      this.collection.fetch();
      this.collection.on('add', this.addOneTask, this);
    },
    render: function () {
      this.collection.each(this.addOneTask, this);
      return this;
    },
    addOneTask: function (mod) {
      var newTaskView = new App.Views.todoView({model: mod});
      this.$el.prepend(newTaskView.render().el);
      todoFooter.render();
    }
  });
//View for todoFooter
  App.Views.todoFooter = Backbone.View.extend({
    el: '.todo-footer',
    initialize: function () {
      this.templateFooter = _.template($('#todo_footer_template').html());
      this.collection.on('remove', this.render, this);
    },
    events: {
      'click .todos-delete': 'moveToArchive'
    },
    render: function () {
      if (this.collection.models.length == 0) {
        this.$el.addClass('display');
        return;
      };
      var newFooter = this.templateFooter({left: this.countLeft().length, done: this.countDone().length });
      this.$el.html(newFooter);
      this.$el.removeClass('display')
      return this;
    },
    countLeft: function () {
      return this.collection.where({status: false});
    },
    countDone: function () {
      return this.collection.where({status: true});
    },
    moveToArchive: function() {
      _.each(this.countDone(), function (mod) {
        var newMod = archivedCollection.create(mod.toJSON());
        newMod.save({status: false, list: "Archive List"})
      });
      _.each(this.countDone(), function (mod) { mod.clear() });
      this.render();
    }
  });

//View for new create a new Task
  App.Views.addTask = Backbone.View.extend({
    el: '.todo-header',
    events: {
      'click .add-task-label': 'enterTask',
      'click .add-task-save': 'saveNewTask',
      'keypress #add-task-input': 'saveNewTaskEnter',
      'blur #add-task-input': 'leaveAdd',
    },
    enterTask: function () {
      this.$('.add-task-label').toggleClass('display');
      this.$('.add-task-input').toggleClass('display');
      this.$('#add-task-input').focus();
    },
    saveNewTask: function () {
      var newTitle = this.$('#add-task-input').val();
      if (!newTitle) return;
      this.collection.create({title: newTitle});
      this.$('#add-task-input').val('');
      this.$('#add-task-input').blur();
    },
    saveNewTaskEnter: function (e) {
      if ( e.keyCode !=13 ) return;
      var newTitle = this.$('#add-task-input').val();
      if (e.keyCode == 13 && newTitle.replace(/\s/g, '') == '') return;
      this.$('#add-task-input').val('');
      this.collection.create({title: newTitle});
    },
    leaveAdd: function () {
      if (this.$('#add-task-input').val().replace(/\s/g, '') == '') {
        this.$('.add-task-input').toggleClass('display');
        this.$('.add-task-label').toggleClass('display');
        this.$('#add-task-input').val('');
      };
    }
  })
  window.todoCollection = new App.Collection.todoList([]);
  var todoViewTasks = new App.Views.todoViews({collection: todoCollection});
  var todoFooter = new App.Views.todoFooter({collection: todoCollection});
  var addInput = new App.Views.addTask({collection:todoCollection});
  $('.todo-list').prepend(todoViewTasks.render().el)
});