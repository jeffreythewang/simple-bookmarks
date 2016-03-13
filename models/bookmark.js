var mongoose = require('mongoose');

var bookmarkSchema = new mongoose.Schema({
  name: String,
  url: String,
  folder: String
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
