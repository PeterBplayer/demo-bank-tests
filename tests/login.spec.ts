import { test, expect } from "@playwright/test";

test.describe("Login to Demobank", () => {

  test("successful login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId('login-input').fill("tester69");
    await page.getByTestId('password-input').fill("hjof8547");
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with short credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId('login-input').fill("tester");
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("unsuccessful login with short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId('login-input').fill("tester69");
    await page.getByTestId('password-input').fill("haslo");
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
  
});
