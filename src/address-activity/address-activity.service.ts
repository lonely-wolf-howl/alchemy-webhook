import { Inject, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class AddressActivityService {
  constructor(
    @Inject('WEB3A')
    private readonly whisperA: Web3,
    @Inject('WEB3B')
    private readonly whisperB: Web3,
  ) {}

  async createAccountWhisperA() {
    const account: any = this.whisperA.eth.accounts.create();
    return account;
  }

  async createAccountWhisperB() {
    const account: any = this.whisperB.eth.accounts.create();
    return account;
  }
}
