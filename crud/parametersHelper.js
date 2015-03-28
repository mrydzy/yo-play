"use strict";

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

module.exports.getParametersList = parametersList;
module.exports.getFieldsDefinition = fieldsDefinition;
module.exports.getFieldNames = fieldNames;
