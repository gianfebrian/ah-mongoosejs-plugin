var mongoose = require('mongoose'),
  fs = require('fs'),
  path = require('path');

module.exports = {
  loadPriority: 1000,
  startPriority: 1000,
  stopPriority: 1000,

  initialize: function(api, next) {
    var config = api.config.mongoose;
    api.mongoose = mongoose;
    api.documents = api.documents || {};

    var dir = path.normalize(config.model_path);
    fs.readdirSync(dir).forEach(function(file) {
      var nameParts = file.split("/");
      var name = nameParts[(nameParts.length - 1)].split(".")[0];
      api.documents[name] = require(dir + '/' + file);
    });
    next();
  },

  start: function(api, next) {
    mongoose.connect(config.mongoose.connection_string, null, next);
  },

  stop: function(api, next) {
    mongoose.disconnect(next); 
  }
};
