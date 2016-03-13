require('babel-register');

var config = require('./config');

var mongoose = require('mongoose');
var Bookmark = require('./models/bookmark');

var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');

var connection = mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB.');
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/bookmarks', function(req, res, next) {
  var folder = 'root';

  Bookmark.find()
    .where('folder').equals(folder)
    .exec(function(err, bookmarks) {
    if (err) return next(err);
    res.send(bookmarks);
  });
});

app.post('/api/bookmarks', function(req, res, next) {
  var name = req.body.name;
  var url = req.body.url;
  var folder = req.body.folder;

  var bookmark = new Bookmark({
    name: name,
    url: url,
    folder: folder
  });

  bookmark.save(function(err) {
    if (err) return next(err);
    res.send({ message: name + ' has been added successfully.' });
  });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
