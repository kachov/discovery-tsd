/* eslint-disable no-unused-vars */
'use strict';

const got = require('got');
const TypeGenerator = require('./generator');

async function createTypes(api, version) {
  const json = await fetch(api, version);
  return render(json);
}

async function fetch(url, query) {
  const response = await got(url, {
    json: false,
    query
  });
  const fixedBody = response.body.replaceAll('::', '_');
  return JSON.parse(fixedBody);
}

function render(json, options) {
  return new TypeGenerator(json, options).render();
}

module.exports = createTypes;
module.exports.createTypes = createTypes;
module.exports.fetch = fetch;
module.exports.render = render;
