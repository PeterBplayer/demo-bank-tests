import { Locator, Page } from '@playwright/test';

export class HomePage {
  userName: Locator;
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButton: Locator;
  transferConfirmationMessage: Locator;
  topUpReceiver: Locator;
  topUpAmount: Locator;
  topUpAgreementCheckbox: Locator;
  topUpButton: Locator;
  moneyBalance: Locator;

  constructor(private page: Page) {
    this.userName = this.page.getByTestId('user-name');
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.transferConfirmationMessage = this.page.locator('#show_messages');
    this.topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement',
    );
    this.topUpButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.moneyBalance = this.page.locator('#money_value');
  }
}
