import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReceiverInput: Locator;
  transferAccountInput: Locator;
  transferAmountInput: Locator;
  executeTransferButton: Locator;
  actionCloseButton: Locator;
  messageText: Locator;

  constructor(private page: Page) {
    this.transferReceiverInput = page.getByTestId('transfer_receiver');
    this.transferAccountInput = page.getByTestId('form_account_to');
    this.transferAmountInput = page.getByTestId('form_amount');
    this.executeTransferButton = page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.actionCloseButton = page.getByTestId('close-button');
    this.messageText = page.locator('#show_messages');
  }
}
