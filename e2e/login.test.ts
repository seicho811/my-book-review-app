import { test, expect } from "@playwright/test";

test("should show error message when any fields is empty", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: /login/i }).click();
  expect(page.getByRole("alert")).toHaveCount(2);
});

test("should login with no error messages when fields with valid values", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/login");

  await page.getByLabel(/email/i).fill("aaa@a.com");
  await page.getByLabel(/password/i).fill("11111");
  await page.getByRole("button", { name: /login/i }).click();

  // await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page).toHaveURL("http://localhost:5173/home");
});

test("should not login when fileds are no-filled ", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: /login/i }).click();
  await expect(page.getByRole("alert")).toHaveCount(2);
  await expect(page).toHaveURL("/login");
});

test("should navigate to sign up page when clicking sign up link on login page", async ({
  page,
}) => {
  await page.goto("/login");
  await page.getByRole("link", { name: /register/i }).click();
  await expect(page).toHaveURL("/signup");
});
