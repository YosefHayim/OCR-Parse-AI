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

test("validate uploading file button", async () => {
  await expect(await page.getByText("בחר קובץ")).toBeVisible();
  await page.locator('input[type="file"]').setInputFiles(join(__dirname, "./single-invoce-test.pdf"));
  await expect(await page.getByText("single-invoce-test.pdf").nth(0)).toBeVisible();
});

test("Click בחר קובץ and expect loading animation", async () => {
  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles(join(__dirname, "./single-invoce-test.pdf"));
  await page.getByText("העלאה קובץ").nth(1).click();
  await expect(await page.getByText("מעבד נתונים לקובץ")).toBeVisible();
  const loader = await page.locator(".loader");
  await expect(loader).toBeVisible();
  await loader.waitFor({ state: "hidden" });
  await expect(await page.getByText("אפס תוצאות")).toBeVisible();
  await expect(await page.getByText("חשב שוב")).toBeVisible();
  await expect(await page.getByText("סיים ניתוח נתונים בהצלחה single-invoce-test.pdf")).toBeVisible();
});

test("validate recalculate button visible", async () => {
  await expect(await page.getByText("חשב שוב")).toBeVisible();
});

test("validate reset button visible", async () => {
  await page.getByText("אפס תוצאות").click();
  await expect(page.getByText("איפוס התבצע בהצלחה")).toBeVisible();
});

test.afterAll(async () => {
  await browser.close();
});
