import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReceiver: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  executeTransferButton: Locator;
  confirmationMessage: Locator;

  constructor(private page: Page) {
    this.transferReceiver = page.getByTestId('transfer_receiver');
    this.transferAccount = page.getByTestId('form_account_to');
    this.transferAmount = page.getByTestId('form_amount');
    this.executeTransferButton = page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.confirmationMessage = page.locator('#show_messages');
  }
}
