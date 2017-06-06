import path from 'path';
import { By } from 'selenium-webdriver';
import { expect } from 'chai';
import { startChromeDriver, buildWebDriver } from '../func';

describe('inject page', function test() {
  let driver;
  this.timeout(15000);

  before(async () => {
    await startChromeDriver();
    const extPath = path.resolve('build');
    driver = buildWebDriver(extPath);
    // Open a random site
    await driver.get('https://google.com');
  });

  after(async () => driver.quit());

  it('should open Google', async () => {
    const title = await driver.getTitle();
    expect(title).to.equal('Google');
  });

  it('should render inject app', async () => {
    await driver.wait(
      () => driver.findElements(By.id('meme-search-frame'))
        .then(elems => elems.length > 0),
      10000,
      'Inject app not found'
    );
  });

  it('should open the search bar with Ctrl + M keypress', async () => {
    // TODO: Implement
    expect(true).to.equal(true);
  });
});
