$(function () {
//View for Task(Model) in Archive List
  App.Views.archivedView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.template = _.template($('#li_template').html());
      this.model.on('destroy', this.remove, this);
      this.model.on('change', this.render, this);
    },
    events: {
      'click .li-check': 'toggleStatus',
      'mouseenter': 'showInToDo',
      'mouseleave': 'hideInToDo',
      'click .li-in-todo': 'moveInToDo'
    },
    render: function () {
      var newLi = this.template(this.model.toJSON());
      this.$el.html(newLi);
      archivedFooter.render();
      this.$('.li-label').addClass('text-decor')
      return this;
    },
    showInToDo: function () {
      this.$('.li-in-todo').toggleClass('display');
      this.$('.li-in-todo').animate({right: "-10px"}, 300);
    },
    hideInToDo: function () {
      this.$('.li-in-todo').animate({right: "-110px"}, 300);
      this.$('.li-in-todo').toggleClass('display');
    },
    toggleStatus: function () {
    	this.model.toggleDoneStatus();
    },
    moveInToDo: function () {
      var newMod = todoCollection.create(this.model.toJSON());
      newMod.save({status: false, list: "ToDo List"})
      this.model.clear();
    }
  });

//Colletion for Archived Tasks(Models)
  App.Collection.archivedList = Backbone.Collection.extend({
  	model: App.Models.Task,
  	localStorage: new Store("archivedList")
  });

//Veiw for collection of Archived Tasks
  App.Views.archivedViews = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
      this.collection.fetch();
      this.collection.on('add', this.addNewTask, this);
    },
    render: function () {
    	this.$el.html('');
    	this.collection.each(this.addNewTask, this);
    	return this;
    },
    addNewTask: function (mod) {
      var newArchivedView = new App.Views.archivedView({model: mod});
      this.$el.prepend(newArchivedView.render().el);
      archivedFooter.render();
    }
  });

//View for Archive List Footer
  App.Views.archivedFooter = Backbone.View.extend({
    el: '.archived-footer',
    initialize: function () {
    	this.template = _.template($('#archived_footer_template').html());
    	this.collection.on('remove', this.render, this);
    },
    events: {
      'click .todos-delete': 'deleteSelected',
      'click .archived-del-all': 'deleteAll'
    },
    render: function () {
      if (this.collection.models.length == 0) {
        this.$el.addClass('display');
        return;
      };
      var newFooter = this.template({count: this.collection.models.length, done: this.countDone().length });
      this.$el.html(newFooter);
      this.$el.removeClass('display')
      return this;
    },
    countDone: function () {
      return this.collection.where({status: true});
    },
    deleteSelected: function () {
    	_.each(this.countDone(), function (mod) { mod.clear() })
    },
    deleteAll: function () {
    	_.each(this.collection.models, function() { this.collection.models[0].clear() }, this)
    }
  });

//View for Search Task
  App.Views.searchTask = Backbone.View.extend({
    el: '.archived-header',
  	events: {
      'click .search-task-label': 'showSearchInput',
  	  'blur #search-task-input': 'leaveSearch'
  	},
  	showSearchInput: function () {
      this.$('.search-task-label').toggleClass('display');
      this.$('.search-task-input').toggleClass('display');
      this.$('#search-task-input').focus();
  	},
  	leaveSearch: function () {
  	  this.$('.search-task-input').toggleClass('display');
  	  this.$('.search-task-label').toggleClass('display');
      this.$('#search-task-input').val('');
  	}
  })

window.archivedCollection = new App.Collection.archivedList([]);
var archivedViewTasks = new App.Views.archivedViews({collection: archivedCollection});
var archivedFooter = new App.Views.archivedFooter({collection: archivedCollection});
var searchView = new App.Views.searchTask({collection: archivedCollection});
$('.archived-list').prepend(archivedViewTasks.render().el)
});