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
test("check copy results button", async () => {
  await page.locator(`[aria-label="העתק את תוצאות"]`).click();
  await expect(page.getByText("כל התוצאות הועתקו")).toBeVisible();
});

test("check copy single quantity button", async () => {
  await page.locator(`[aria-label="העתק כמות פריטים"]`).click();
  await expect(page.getByText("כמות פריטים הועתקו")).toBeVisible();
});

test("check copy single total amount button", async () => {
  await page.locator(`[aria-label="העתק סכום כולל"]`).click();
  await expect(page.getByText("סך תשלום הועתקו")).toBeVisible();
});
test.afterAll(async () => {
  await browser.close();
});
