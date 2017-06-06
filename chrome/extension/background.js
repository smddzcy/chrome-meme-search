const bluebird = require('bluebird');
const { get } = require('axios');

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'browserAction'
]);

require('./background/inject');

// Listen for search message
const buildUrl = (tags = '', page = 1, count = 9) =>
  `http://memeful.com/web/ajax/posts?count=${count}&page=${page}&tags=${tags}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.searchTerm && request.page) {
    get(buildUrl(request.searchTerm, request.page))
      .then((response) => {
        sendResponse({ data: response.data.data });
      })
      .catch((err) => {
        console.log(err);
        sendResponse({ err });
      });
  } else {
    sendResponse({ });
  }

  // return true to make it async, according to the documentation of addListener
  return true;
});
