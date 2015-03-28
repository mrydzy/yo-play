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
    if (answers.field == "id") {
      that.log("Hey, I already generated id (Int) for you. I will not add another one.")
    } else {
      fields.push( {name : answers.field, type: answers.type } );
    }
    if ( answers.addAnother ) {
      recursivePrompt(that, done, fields);
    } else {
      done();
    }
  }.bind(that));
}

module.exports.ask = recursivePrompt;
