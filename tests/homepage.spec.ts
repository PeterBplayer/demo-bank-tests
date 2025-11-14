import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/homepage.page';

test.describe('Homepage tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('');

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange

    const receiverID = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    const homepage = new HomePage(page);
    await homepage.transferReceiverInput.selectOption(receiverID);
    await homepage.transferAmountInput.fill(transferAmount);
    await homepage.transferTitleInput.fill(transferTitle);
    await homepage.transferButton.click();
    await homepage.actionCloseButton.click();

    //Assert
    await expect(homepage.messageText).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange

    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //Act
    const homepage = new HomePage(page);
    await homepage.topUpReceiverInput.selectOption(topUpReceiver);
    await homepage.topUpAmountInput.fill(topUpAmount);
    await homepage.topUpAgreementCheckbox.click();
    await homepage.topUpButton.click();

    await homepage.actionCloseButton.click();

    //Assert

    await expect(homepage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    //Arrange

    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act

    const homepage = new HomePage(page);
    await homepage.topUpReceiverInput.selectOption(topUpReceiver);
    await homepage.topUpAmountInput.fill(topUpAmount);
    await homepage.topUpAgreementCheckbox.click();
    await homepage.topUpButton.click();

    await homepage.actionCloseButton.click();
    //Assert

    await expect(homepage.moneyBalanceText).toHaveText(`${expectedBalance}`);
  });
});
