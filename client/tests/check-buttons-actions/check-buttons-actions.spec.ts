// @ts-check
import { test, expect } from "@playwright/test";
import { envUrls } from "../utils";

test("has title MomTool", async ({ page }) => {
  await page.goto(envUrls.localhostUrl);
  await expect(page).toHaveTitle(/MomTool/);
});

test("validate uploading file works", async ({ page }) => {
  await page
    .locator('input[name="file"]')
    .setInputFiles("./single-invoce-test.pdf");
  await expect(page.getByRole("button", { name: "העלאה קובץ" })).toBeVisible();
});
