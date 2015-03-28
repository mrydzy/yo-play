"use strict";

var questions = [
  {
    type: "input",
    name: "field",
    message: "How should I call new field?"
  }, {
    type: "list",
    name: "type",
    message: "Select type",
    choices: ["Int", "String"]
  }, {
    type: "confirm",
    name: "addAnother",
    message: "Do you want to add another field?",
    default: true
  }
];

var recursivePrompt = function (that, done, fields) {
  that.prompt( questions, function( answers ) {
    fields.push( {name : answers.field, type: answers.type } );
    if ( answers.addAnother ) {
      recursivePrompt(that, done, fields);
    } else {
      done();
    }
  }.bind(that));
}

var parametersList = function(fields) {
  var list = "";
  var fieldsCount = fields.length
  for (var i = 0; i < fieldsCount - 1; i++) {
    list += fields[i].name + " : " + fields[i].type + ", ";
  }
  list += fields[fieldsCount - 1].name + " : " + fields[fieldsCount - 1].type;
  return list;
}

var fieldsDefinition = function(fields) {
  var list = "";
  var fieldsCount = fields.length
  for (var i = 0; i < fieldsCount; i++) {
    list += "def " + fields[i].name + " = column[" + fields[i].type + "](\"" + fields[i].name + "\", O.NotNull)\n  ";
  }
  return list;
}

var fieldNames = function(fields) {
  var list = "";
  var fieldsCount = fields.length
  for (var i = 0; i < fieldsCount - 1; i++) {
    list += fields[i].name + ", ";
  }
  list += fields[fieldsCount - 1].name;
  return list;
}


module.exports.ask = recursivePrompt;
module.exports.getParametersList = parametersList;
module.exports.getFieldsDefinition = fieldsDefinition;
module.exports.getFieldNames = fieldNames;
