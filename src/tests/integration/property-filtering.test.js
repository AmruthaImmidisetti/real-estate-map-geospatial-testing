const puppeteer = require("puppeteer");
jest.setTimeout(30000);
describe("Property Filtering", () => {
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

  test("Search filters visible", async () => {
    await page.goto("http://localhost:3000/search");

    await page.waitForSelector('[data-testid="search-radius-slider"]');

    const slider = await page.$('[data-testid="search-radius-slider"]');
    expect(slider).not.toBeNull();
  });
});