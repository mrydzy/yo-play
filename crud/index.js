'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var paramHelper = require('./parametersHelper')
var promptHelper = require('./promptHelper')

var _copyTemplate = function (source, destination, that, params) {
  that.fs.copyTpl(
    that.templatePath(source),
    that.destinationPath(destination),
    params
  );
};

var _appendToFile = function(path, content, that) {
  that.conflicter.force = true;
  var file = that.readFileAsString(path);
  that.write(path, file + '\n' + content);
}

var _replaceConstants = function(entity, packageName, entry) {
  return entry.replace('entity', entity.toLowerCase()).replace('Entity', entity).replace('package', packageName);
}

var _createRoutes = function (entity, packageName) {
  var routes = _replaceConstants(entity, packageName, "GET        /entity        package.controllers.EntityController.list() \n");
  routes += _replaceConstants(entity, packageName, "GET        /entity/:id    package.controllers.EntityController.read(id: Int) \n");
  routes += _replaceConstants(entity, packageName, "DELETE     /entity/:id    package.controllers.EntityController.delete(id: Int) \n");
  routes += _replaceConstants(entity, packageName, "POST       /entity        package.controllers.EntityController.create() \n");
  routes += _replaceConstants(entity, packageName, "PUT        /entity        package.controllers.EntityController.update() \n");

  return routes;
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
      'Hola! Let\'s get your simple ' + chalk.red('CRUD') + ' done!'
    ));

    var prompts = [{
      type: 'input',
      name: 'crudEntity',
      message: 'What is your entity name',
      default: "User"
    }];

    this.prompt(prompts, function (props) {
      this.entity = props.crudEntity.replace(/ /g, '');
      this.projectPackage = this.config.get('package');
      this.projectPackagePath = this.projectPackage.replace(/\./g, '\/');
      this.fields = [];
      promptHelper.ask(this, done, this.fields);
    }.bind(this));

  },

  writing: {
    copyTemplates: function () {
      var modelsPath = 'app/' + this.projectPackagePath + '/models/Entity.scala';
      var controllersPath = 'app/' + this.projectPackagePath + '/controllers/EntityController.scala';
      var actorsPath = 'app/' + this.projectPackagePath + '/actors/EntityActor.scala';

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
          parametersList: paramHelper.getParametersList(this.fields),
          fieldsDefinition: paramHelper.getFieldsDefinition(this.fields),
          fieldNames: paramHelper.getFieldNames(this.fields)
        }
      );
    },
    modifyFiles: function() {
      var routesPath =this.destinationPath('conf/routes');
      _appendToFile(routesPath, _createRoutes(this.entity, this.projectPackage), this);
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
