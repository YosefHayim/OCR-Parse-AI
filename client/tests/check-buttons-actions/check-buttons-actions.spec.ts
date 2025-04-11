// @ts-check
import { test, expect } from "@playwright/test";

test("website launching at main url", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Pdf-Ocr-Data-Proccessing");
});

test("validate uploading file button", async ({ page }) => {
  await page
    .locator('input[name="file"]')
    .setInputFiles("./single-invoce-test.pdf");
  await expect(page.getByRole("button", { name: "העלאה קובץ" })).toBeVisible();
});

// test("validate recalculate button works", async ({ page }) => {});

// test("validate reset button works", async ({ page }) => {});

// test("validate uploading another file works", async ({ page }) => {});
