jest.setTimeout(30000);
const puppeteer = require("puppeteer");

describe("Location Autocomplete", () => {
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

  test("Location suggestions appear", async () => {
    await page.goto("http://localhost:3000/search");

    await page.type(
      '[data-testid="location-autocomplete"]',
      "San"
    );

    await page.waitForSelector(
      '[data-testid^="autocomplete-suggestion-"]'
    );

    const suggestions = await page.$$(
      '[data-testid^="autocomplete-suggestion-"]'
    );

    expect(suggestions.length).toBeGreaterThan(0);
  });
});