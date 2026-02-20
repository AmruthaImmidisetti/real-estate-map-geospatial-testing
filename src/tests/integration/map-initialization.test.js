const puppeteer = require("puppeteer");
jest.setTimeout(30000);
describe("Map Initialization Test", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Map loads successfully", async () => {
    await page.goto("http://localhost:3000/properties");

    await page.waitForSelector('[data-testid="map-container"]');

    const exists = await page.$('[data-testid="map-container"]');
    expect(exists).not.toBeNull();
  });
});