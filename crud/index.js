'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var helper = require('./helper')

var _copyTemplate = function (source, destination, that, params) {
  that.fs.copyTpl(
    that.templatePath(source),
    that.destinationPath(destination),
    params
  );
};

var _append = function(path, content, that) {
  that.conflicter.force = true;
  var file = that.readFileAsString(path);
  that.write(path, file + '\n' + content);
}

var _replaceConstants = function(entity, packageName, entry) {
  return entry.replace('entity', entity.toLowerCase()).replace('Entity', entity).replace('package', packageName);
}

var _formatRoute = function (entity, packageName, routes) {

  var routesString = ""
  routes.forEach(function (entry) {
    routesString += _replaceConstants(entity, packageName, entry)
  });

  return routesString
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the finest' + chalk.red('PlayCrud') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'crudEntity',
      message: 'What is your entity name',
      default: "User"
    }];

    this.prompt(prompts, function (props) {
      this.entity = props.crudEntity.capitalize();
      this.projectPackage = this.config.get('package');
      this.projectPackagePath = this.projectPackage.replace(/\./g, '\/');
      this.fields = [];
      helper.ask(this, done, this.fields);
    }.bind(this));

  },



  writing: {
    app: function () {
      var modelsPath = 'app/' + this.projectPackagePath + '/models/Entity.scala';
      var controllersPath = 'app/' + this.projectPackagePath + '/controllers/EntityController.scala';
      var actorsPath = 'app/' + this.projectPackagePath + '/actors/EntityActor.scala';
      var routesPath =this.destinationPath('conf/routes');

      _copyTemplate('EntityController.scala', controllersPath.replace('Entity', this.entity), this,
        {
          package : this.projectPackage,
          entity: this.entity,
          entityVar: this.entity.toLowerCase()
        }
      );

      _copyTemplate('EntityActor.scala', actorsPath.replace('Entity', this.entity), this,
        {
          package : this.projectPackage,
          entity: this.entity,
          entityVar: this.entity.toLowerCase()
        }
      );

      _copyTemplate('Entity.scala', modelsPath.replace('Entity', this.entity), this,
        {
          package : this.projectPackage,
          entity: this.entity,
          entityTag: "\"" +this.entity.toUpperCase() + "\"",
          parametersList: helper.getParametersList(this.fields),
          fieldsDefinition: helper.getFieldsDefinition(this.fields),
          fieldNames: helper.getFieldNames(this.fields)
        }
      );

      var routes = []
      routes.push("GET        /entity        package.controllers.EntityController.list() \n");
      routes.push("GET        /entity/:id    package.controllers.EntityController.read(id: Int) \n");
      routes.push("DELETE     /entity/:id    package.controllers.EntityController.delete(id: Int) \n");
      routes.push("POST       /entity        package.controllers.EntityController.create() \n");
      routes.push("PUT        /entity        package.controllers.EntityController.update() \n");

      var routesString = _formatRoute(this.entity, this.projectPackage, routes);
      _append(routesPath, routesString, this);
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  config: function() {
  }
});
