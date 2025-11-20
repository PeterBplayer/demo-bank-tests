import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { HomePage } from '../pages/homepage.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('');

    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const homePage = new HomePage(page);
    await homePage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test('simple payment', { tag: '@payment' }, async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7891 2345 6789 4567 89899';
    const transferAmount = '333';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    //Act
    await paymentPage.makeTransfer(
      transferReceiver,
      transferAccount,
      transferAmount,
    );

    //Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
