jest.setTimeout(30000);

const puppeteer = require("puppeteer");

describe("Map Marker Interaction", () => {
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

  test("Clicking marker highlights property", async () => {
    await page.goto("http://localhost:3000/properties");

    await page.waitForSelector('[data-testid="map-loaded"]');
    await page.waitForSelector('[data-testid^="map-marker-"]');

    const marker = await page.$('[data-testid^="map-marker-"]');

    // simulate click via JS
    await page.evaluate((el) => el.click(), marker);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const highlighted = await page.$eval(
      '[data-testid^="property-card-"]',
      el => el.style.border.includes("blue")
    );

    expect(highlighted).toBeTruthy();
  });
});