'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var _copyFile = function (source, destination, that) {
    that.fs.copy(
      that.templatePath(source),
      that.destinationPath(destination)
    );
};

var _copyTemplate = function (source, destination, that, params) {
  that.fs.copyTpl(
    that.templatePath(source),
    that.destinationPath(destination),
    params
  );
};

var _copyExactFile = function (copyFile, that) {
    _copyFile(copyFile, copyFile, that);
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the finest' + chalk.red('PlayCrud') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectPackage',
      message: 'What is your project package ex. com.mycompany',
      default: "com.sample"
    }];

    this.prompt(prompts, function (props) {
      this.projectPackage = props.projectPackage;
      this.projectPackagePath = this.projectPackage.replace(/\./g, '\/');
      done();
    }.bind(this));
  },



  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectStaticFiles: function () {
      var projectPath = 'project/';
      var imgPath = 'public/images/';
      var viewsPath = 'app/views/';

      _copyExactFile('activator', this);
      _copyExactFile('activator.bat', this);
      _copyExactFile('activator-launch-1.3.2.jar', this);

      _copyExactFile(projectPath + 'build.properties', this);

      _copyExactFile(projectPath + 'plugins.sbt', this);
      _copyExactFile(projectPath + 'sbt-ui.sbt', this);
      _copyExactFile(imgPath + 'favicon.png', this);

      _copyExactFile('README.md', this);
      _copyExactFile('LICENSE', this);
      _copyExactFile('build.sbt', this);

      _copyExactFile('app/utils/Global.scala', this);

      _copyExactFile(viewsPath + 'index.scala.html', this);
      _copyExactFile(viewsPath + 'main.scala.html', this);
    },

    projectConfigurableFiles: function () {
      var controllersPath = 'app/' + this.projectPackagePath + '/controllers';
      var configPath = 'conf/';

      _copyTemplate('app/controllers/MainController.scala', controllersPath + '/MainController.scala', this, { package : this.projectPackage});
      _copyTemplate('conf/application.conf', configPath + '/application.conf', this, { package : this.projectPackage});
      _copyTemplate('conf/routes', configPath + '/routes', this, { package : this.projectPackage});
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  config: function() {
    this.config.set('package', this.projectPackage);
  }
});
