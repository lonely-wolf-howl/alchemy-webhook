import { Inject, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class CustomWebhookService {
  constructor(
    @Inject('WEB3')
    private readonly web3: Web3,
  ) {}

  async createAccount() {
    const account: any = this.web3.eth.accounts.create();
    return account;
  }
}
