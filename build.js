#!/usr/bin/env node

var handlebars = require('handlebars');
var fs = require('fs');
var glob = require('glob');

function readFile(path) {
  return fs.readFileSync(`${path}`).toString();
}

function compile(source) {
  return handlebars.compile(source);
}

function renderPage(pageName) {
  var data = require('./site.json');

  var layoutTmpl = compile(readFile('views/layout.html'));
  var pageTmpl = compile(readFile(`views/${pageName}.html`));

  var pageBody = pageTmpl(data.pages[pageName]);

  var body = layoutTmpl({content: pageBody});

  var path = pageName === 'index' ? 'build' : `build/${pageName}`;
  if (path !== 'build') {
    fs.mkdirSync(path);
  }
  fs.writeFileSync(`${path}/index.html`, body);
}

function renderSite() {
  glob('views/*.html', {}, function (err, files) {
    for (var i = 0, len = files.length; i < len; i++) {
      var path = files[i];
      var pageName = path.split('/')[1].replace('.html', '');

      if (pageName === 'layout' || pageName.indexOf('_') === 0) {
        // Ignore partials.
        continue;
      }

      renderPage(pageName);
    }
  });

}

// Load partials
glob('views/_*.html', {}, function (err, files) {
  for (var i = 0, len = files.length; i < len; i++) {
    var path = files[i];
    var partialKey = path.split('/')[1].replace(/^_/, '').replace('.html', '');

    var source = readFile(path);
    handlebars.registerPartial(partialKey, source);
  }

  renderSite();
});
