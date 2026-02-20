jest.setTimeout(30000);

const puppeteer = require("puppeteer");

describe("Geospatial Boundary", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) await browser.close();
  });

  test("Map loads for boundary drawing", async () => {
    await page.goto("http://localhost:3000/properties");
    await page.waitForSelector('[data-testid="map-loaded"]');

    const exists = await page.$('[data-testid="map-loaded"]');
    expect(exists).not.toBeNull();
  });
});