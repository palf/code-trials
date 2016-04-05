import browserify from 'browserify';
import babelify from 'babelify';
import fm from 'front-matter';
import template from 'lodash.template';
import Markdown from 'markdown-it';
import hljs from 'highlight.js';
import fs from './fs';

const postcss = require('postcss')([
  require('postcss-nested')(),
  require('cssnext')(),
  require('autoprefixer-core')([
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24',
    'Explorer >= 8',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 6'
  ]),
  require('cssnano')()
]);

const markdown = new Markdown({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (_) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (_) {}

    return ''; // use external default escaping
  }
});

const md = async (source, data) => {
  const layout = template(await fs.readFile('./base/index.html'));
  const content = fm(source);
  Object.assign(content.attributes, data);
  const body = markdown.render(content.body);
  return layout(Object.assign(content.attributes, { body }));
};

const css = async (source, options) => {
  options = options || {};
  const result = await postcss.process(source, {
    from: 'base/css/main.css',
    to: 'base/css/main.min.css',
    map: !!options.map
  });
  return result.css;
};

const js = async (options) => new Promise((resolve, reject) => {
  options = options || {};
  browserify('src/main.js', {
    debug: !!options.debug,
    transform: [babelify]
  }).bundle((err, buffer) => {
    if (err) {
      reject(err);
    } else {
      resolve(buffer.toString('utf8'));
    }
  });
});

export default { md, css, js };
