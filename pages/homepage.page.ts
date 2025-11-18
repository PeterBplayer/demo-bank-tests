import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class HomePage {
  userNameText: Locator;
  sideMenu: SideMenuComponent;

  transferReceiverInput: Locator;
  transferAmountInput: Locator;
  transferTitleInput: Locator;
  transferButton: Locator;

  topUpReceiverInput: Locator;
  topUpAmountInput: Locator;
  topUpAgreementCheckbox: Locator;
  topUpButton: Locator;
  moneyBalanceText: Locator;

  actionCloseButton: Locator;

  messageText: Locator;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);

    this.userNameText = this.page.getByTestId('user-name');

    this.transferReceiverInput = this.page.locator(
      '#widget_1_transfer_receiver',
    );
    this.transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    this.transferTitleInput = this.page.locator('#widget_1_transfer_title');
    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });

    this.topUpReceiverInput = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmountInput = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement',
    );
    this.topUpButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });

    this.moneyBalanceText = this.page.locator('#money_value');

    this.actionCloseButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');
  }

  async quickMoneyTransfer(
    receiverID: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiverInput.selectOption(receiverID);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async mobileTopUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topUpReceiverInput.selectOption(topUpReceiver);
    await this.topUpAmountInput.fill(topUpAmount);
    await this.topUpAgreementCheckbox.click();

    await this.topUpButton.click();
    await this.actionCloseButton.click();
  }
}
