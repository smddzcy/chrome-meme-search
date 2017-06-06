import chromedriver from 'chromedriver';
import webdriver from 'selenium-webdriver';

/**
 * Creates a promisified timeout.
 *
 * @param  {Number} time Timeout duration
 * @return {Promise}     A promise that'll be resolved in `time` milliseconds
 */
export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

let crdvIsStarted = false;
export function startChromeDriver() {
  if (crdvIsStarted) return Promise.resolve();
  chromedriver.start();
  process.on('exit', chromedriver.stop);
  crdvIsStarted = true;
  return delay(1000);
}

/**
 * Builds a Selenium WebDriver instance with the extension path `xPath`.
 *
 * @param  {String} extPath Path to the extension to load
 * @return {Object}         Selenium WebDriver instance
 */
export function buildWebDriver(extPath) {
  return new webdriver.Builder()
    .usingServer('http://localhost:9515')
    .withCapabilities({
      chromeOptions: {
        args: [`load-extension=${extPath}`]
      }
    })
    .forBrowser('chrome')
    .build();
}
