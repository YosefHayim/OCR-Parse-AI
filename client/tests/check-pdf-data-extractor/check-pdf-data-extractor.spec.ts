import { test, expect, chromium, Page, Browser, BrowserContext } from "@playwright/test";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let page: Page;
let browser: Browser;
let context: BrowserContext;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto("/");
});

test("upload file", async () => {
  await expect(page.getByText("בחר קובץ")).toBeVisible();
  await page.locator('input[type="file"]').setInputFiles(join(__dirname, "./single-invoce-test.pdf"));
  await page.getByText("העלאה קובץ").nth(1).click();
  const loader = await page.locator(".loader");
  await expect(loader).toBeVisible();
});

test("verify data is accurate releated to the pdf data", async () => {
  await page.locator(".loader").waitFor({ state: "hidden" });
  await expect(await page.getByText("1909")).toBeVisible();
  await expect(await page.getByText("11364")).toBeVisible();
});

test("recalculate data to same file", async () => {
  await page.getByText("חשב שוב").click();
  const loader = await page.locator(".loader");
  await expect(loader).toBeVisible();
  await loader.waitFor({ state: "hidden" });
  await expect(await page.getByText("1909")).toBeVisible();
  await expect(await page.getByText("11364")).toBeVisible();
});

test.afterAll(async () => {
  await browser.close();
});
