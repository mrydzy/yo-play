'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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

var _formatRoute = function (entity, route) {
  return route.replace('entity', entity.toLowerCase()).replace('Entity', entity);
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
      done();
    }.bind(this));
  },



  writing: {
    app: function () {
      var modelsPath = 'app/' + this.projectPackagePath + '/models/Entity.scala';
      var controllersPath = 'app/' + this.projectPackagePath + '/controllers/EntityController.scala';
      var routesPath =this.destinationPath('conf/routes');
      if (this.fs.exists)

      _copyTemplate('EntityController.scala', controllersPath.replace('Entity', this.entity), this,
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
          entityTag: "\"" +this.entity.toUpperCase() + "\""
        }
      );

      var listEntity = "GET        /entity        package.controllers.EntityController.list() \n";
      var postEntity = "POST       /entity        package.controllers.EntityController.add() \n";

      var routes = _formatRoute(this.entity, listEntity)
        + _formatRoute(this.entity, postEntity);
      _append(routesPath, routes, this);
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
