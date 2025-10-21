import { test, expect } from '@playwright/test';

test.describe('Homepage tests', () => {
  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'tester69';
    const userPassword = 'hjof8547';

    const receiverID = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();

    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'tester69';
    const userPassword = 'hjof8547';

    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    //Assert
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
