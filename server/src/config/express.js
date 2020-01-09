const express = require('express');
const app = express();

const path = require('path');

dirs = {
  views: {
    errors: '../app/views/errors/'
  }
}

app.set('clientPath', path.join(__dirname, '../../../client')); 
app.use(express.static(app.get('clientPath'))); 

app.use(function(req, res, next) {
  let options = {
    root: path.join(__dirname, dirs.views.errors)
  }

  return res.status(404).sendFile('error404.html', options, 
    function(err) {
      if (err) {
        next(err);
      }
    }
  ); 
});

app.use(function(error, req, res, next) {
  console.log(error);

  let options = {
    root: path.join(__dirname, dirs.views.errors)
  }

  return res.status(500).sendFile('error500.html', options, 
    function(err) {
      if (err) {
        console.log(err);
        next(err);
      }
    }
  ); 
}); 

module.exports = app;