# site-generator

Super simple static site generator using Handlebars.

## Getting started

### Installation

```
$ npm install
```

### Make a website

Create the following directories:

- assets
- views

Assets stores your images, styles, scripts, fonts, etc.
Views contains your site templates.

Start by adding a layout.html in the views directory (this file is required):

```
# views/layout.html
<html>
  <head>
    <title>{{title}}</title>
  </head>
  <body>
    <h1>{{title}}</h1>
    {{{content}}}
  </body>
</html>
```

Now create your homepage template:

```
# views/index.html
<div class="homepage">
  <h2>{{title}}</h2>
</div>
```

Now build the site and preview it in your browser:

```
$ ./build.sh
$ cd build
$ python -m SimpleHTTPServer
```

Open [http://localhost:8000/](http://localhost:8000/) in your
browser to see your website.

Yay!
