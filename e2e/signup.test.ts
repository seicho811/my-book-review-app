import { test, expect } from "@playwright/test";

test("should success sign up with valid values then navigate to home page", async ({
  page,
}) => {
  await page.goto("/signup");
  const email = `test+${Date.now()}@example.com`;
  await page.getByLabel(/name/i).fill("Tomo");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill("Tomo1023");
  await Promise.all([
    page.getByRole("button", { name: /sign up/i }).click(),
    page.waitForURL("/home"),
  ]);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("token")))
    .not.toBeNull;
  await expect(page.getByRole("banner")).toContainText("Tomo");
});
