// @ts-check
import { test, expect, chromium } from "@playwright/test";

let page;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("/");
});

test("check copy results button", async () => {
  
});

test("check copy single quantity button", async () => {});

test("check copy single total amount button", async () => {});
