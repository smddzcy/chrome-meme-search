# Meme Search

> A Chrome extension that lets you make spotlight search for memes.

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
