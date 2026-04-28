import { test, expect, request } from '@playwright/test';

test("API + UI E2E", async ({ page }) => {

  // 🔹 Step 1: API Login
  const apiContext = await request.newContext({
    baseURL: process.env.BASE_URL
  });

  const loginRes = await apiContext.post("/api/ecom/auth/login", {
    data: {
      userEmail: "testjoy@gmail.com",
      userPassword: "Abc1@345"
    }
  });

  const loginBody = await loginRes.json();
  const token = loginBody.token;

  // 🔹 Step 2: Create Order via API
  const orderRes = await apiContext.post("/api/ecom/order/create-order", {
    data: {
      orders: [{
        country: "India",
        productOrderedId: "6960ea76c941646b7a8b3dd5"
      }]
    },
    headers: {
      Authorization: token
    }
  });

  const orderBody = await orderRes.json();
  const orderId = orderBody.orders[0];

  // 🔹 Step 3: Inject token into browser
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  // 🔹 Step 4: Open UI directly (no login UI)
  await page.goto("/client");

  // 🔹 Step 5: Verify order in UI
  await page.locator("[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  await expect(rows.filter({ hasText: orderId })).toBeVisible();
});