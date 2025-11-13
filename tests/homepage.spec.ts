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
    await homepage.transferReceiver.selectOption(receiverID);
    await homepage.transferAmount.fill(transferAmount);
    await homepage.transferTitle.fill(transferTitle);
    await homepage.transferButton.click();

    await page.getByTestId('close-button').click();

    //Assert
    await expect(homepage.confirmationMessage).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange

    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //Act
    const homepage = new HomePage(page);
    await homepage.topUpReceiver.selectOption(topUpReceiver);
    await homepage.topUpAmount.fill(topUpAmount);
    await homepage.topUpAgreementCheckbox.click();
    await homepage.topUpButton.click();

    await page.getByTestId('close-button').click();

    //Assert

    await expect(homepage.confirmationMessage).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    //Arrange

    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act

    const homepage = new HomePage(page);
    await homepage.topUpReceiver.selectOption(topUpReceiver);
    await homepage.topUpAmount.fill(topUpAmount);
    await homepage.topUpAgreementCheckbox.click();
    await homepage.topUpButton.click();

    await page.getByTestId('close-button').click();
    //Assert

    await expect(homepage.moneyBalance).toHaveText(`${expectedBalance}`);
  });
});
