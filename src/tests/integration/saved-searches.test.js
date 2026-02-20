const puppeteer = require("puppeteer");
jest.setTimeout(30000);
describe("Saved Searches", () => {
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

  test("Saved search page loads", async () => {
    await page.goto("http://localhost:3000/saved-searches");

    const body = await page.$("body");
    expect(body).not.toBeNull();
  });
});