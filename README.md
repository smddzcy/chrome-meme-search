# Chrome Meme Search

[![Build Status](https://travis-ci.org/smddzcy/chrome-meme-search.svg?branch=master)](https://travis-ci.org/smddzcy/chrome-meme-search)
[![Build status](https://ci.appveyor.com/api/projects/status/ybvw6dmuhxoxxtq2/branch/master?svg=true)](https://ci.appveyor.com/project/Samed15956/chrome-meme-search/branch/master)
[![npm](https://img.shields.io/npm/v/chrome-meme-search.svg)](https://www.npmjs.com/package/chrome-meme-search)
[![Dependency Status](https://david-dm.org/smddzcy/chrome-meme-search.svg)](https://david-dm.org/smddzcy/chrome-meme-search)
[![devDependency Status](https://david-dm.org/smddzcy/chrome-meme-search/dev-status.svg)](https://david-dm.org/smddzcy/chrome-meme-search?type=dev)

> A Chrome extension that lets you make spotlight search for memes.

![Meme Search](https://cloud.githubusercontent.com/assets/13895224/26827470/1660254c-4ac6-11e7-9bd1-6550eb1e291f.gif)

## Development

```
# Clone the repo
git clone https://github.com/smddzcy/chrome-meme-search.git

# Install the dependencies
yarn install

# Build files to './dev' and start webpack development server
yarn run dev
```

[Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

## Test

- `test/app`: React components
- `test/e2e`: E2E tests (use [chromedriver](https://www.npmjs.com/package/chromedriver), [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver))

```
# lint
yarn run lint
# test/app
yarn run test
yarn run test -- --watch  # watch files
# test/e2e
yarn run build
yarn run test-e2e
```

## Build

```
# Build files to './build'
yarn run build
```

## LICENSE
[MIT](https://github.com/smddzcy/chrome-meme-search/blob/master/LICENSE)
