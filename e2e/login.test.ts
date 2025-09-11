import { test, expect } from "@playwright/test";

const API_BASE = "https://railway.bookreview.techtrain.dev";

async function mockAuthApis(page: import('@playwright/test').Page, opts?: {
  token?: string;
  user?: { name: string; iconUrl?: string };
  books?: Array<{
    id: string;
    title: string;
    url: string;
    detail: string;
    review: string;
    reviewer: string;
    isMine: boolean;
  }>;
}) {
  const token = opts?.token ?? "t-123";
  const user = opts?.user ?? { name: "E2E User" };
  const books =
    opts?.books ??
    [
      {
        id: "b1",
        title: "Mock Book 1",
        url: "https://example.com/1",
        detail: "detail",
        review: "great",
        reviewer: user.name,
        isMine: true,
      },
    ];

  // POST /signin -> returns token
  await page.route(`${API_BASE}/signin`, async (route, request) => {
    if (request.method() !== "POST") return route.fallback();
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ token }),
    });
  });

  // GET /users -> returns user info
  await page.route(`${API_BASE}/users`, async (route, request) => {
    if (request.method() !== "GET") return route.fallback();
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(user),
    });
  });

  // GET /books?offset=*
  await page.route(new RegExp(`${API_BASE.replace(/[-/\\.^$*+?()[\]{}|]/g, "\\$&")}/books.*`), async (route, request) => {
    if (request.method() !== "GET") return route.fallback();
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(books),
    });
  });
}

test("should show error message when any fields is empty", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: /login/i }).click();
  expect(page.getByRole("alert")).toHaveCount(2);
});

test("should login with no error messages when fields with valid values", async ({
  page,
}) => {
  await mockAuthApis(page, { user: { name: "Tester" } });

  await page.goto("/login");

  await page.getByLabel(/email/i).fill(`test+${Date.now()}@example.com`);
  await page.getByLabel(/password/i).fill("playwright");

  await Promise.all([
    page.waitForURL("**/home"),
    page.getByRole("button", { name: /login/i }).click(),
  ]);

  // Verify token stored as a proxy for successful auth flow
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("token")))
    .not.toBeNull();
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
