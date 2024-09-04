import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Web3 from 'web3';
import axios from 'axios';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AddressActivityRepository } from './repositories/address-activity.repository';

@Injectable()
export class AddressActivityService implements OnModuleInit {
  private readonly logger = new Logger(AddressActivityService.name);

  onModuleInit() {
    this.logger.debug('blockchain monitoring initialized.');
    this.monitorBlocks();
  }

  constructor(
    @Inject('WEB3')
    private readonly WEB3: Web3,
    @InjectDataSource('connection1')
    private readonly connection1: DataSource,
    private readonly addressActivityRepository: AddressActivityRepository,
  ) {}

  async createAccount() {
    const account: any = this.WEB3.eth.accounts.create();
    return account;
  }

  private monitorBlocks() {
    this.WEB3.eth.subscribe('newBlockHeaders', async (error, blockHeader) => {
      if (error) {
        console.error('error subscribing to new block headers:', error);
        return;
      }

      const block = await this.WEB3.eth.getBlock(blockHeader.hash, true);
      if (block && block.transactions) {
        for (const transaction of block.transactions) {
          await this.checkAndTriggerWebhook(transaction);
        }
      }
    });
  }

  private async checkAndTriggerWebhook(transaction: any) {
    const configs = await this.addressActivityRepository.getMany(
      transaction.from,
      transaction.to,
    );

    for (const config of configs) {
      await this.triggerWebhook(config.webhook_url, transaction);
    }
  }

  private async triggerWebhook(webhookUrl: string, transaction: any) {
    try {
      await axios.post(webhookUrl, transaction, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(
        `webhook triggered with transaction hash: ${transaction.hash}`,
      );
    } catch (error) {
      console.error(`error triggering webhook: ${error.message}`);
    }
  }
}
