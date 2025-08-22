import { test, expect } from "@playwright/test";

test("should success sign up with valid values then navigate to home page", async ({
  page,
}) => {
  await page.goto("/signup");
  await page.getByLabel(/name/i).fill("Tomo");
  await page.getByLabel(/email/i).fill("Tomo@tomo.com");
  await page.getByLabel(/password/i).fill("Tomo1023");
  await page.getByRole("button", { name: /sign up/i }).click();
  await expect(page).toHaveURL("/home");
});
