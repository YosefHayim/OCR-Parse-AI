// @ts-check
// @ts-check
import { test, expect } from "@playwright/test";

test("check upload button", async ({ page }) => {
  await page
    .locator('input[name="file"]')
    .setInputFiles("./single-invoce-test.pdf");
  await expect(page.getByRole("button", { name: "העלאה קובץ" })).toBeVisible();
  await page.getByRole("button", { name: "העלאה קובץ" }).click();
});

test("Verify loading animation and proccessing pdf file to server", async ({
  page,
}) => {
  await expect(
    page.getByText("מעבד נתונים לקובץ single invoce test.pdf"),
  ).toBeVisible();

  await expect(
    page.getByText("תוצאות של הקובץ single invoce test.pdf"),
  ).toBeVisible();

  await expect(page.locator(".loader")).toBeVisible();
});
