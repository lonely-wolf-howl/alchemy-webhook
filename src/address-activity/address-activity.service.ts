import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Web3 from 'web3';
import axios from 'axios';
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
    private readonly addressActivityRepository: AddressActivityRepository,
  ) {}

  async registerWebhook(body: any) {
    const { chain, network, webhookUrl, addresses } = body;

    const result = await this.addressActivityRepository.create({
      chain: chain,
      network: network,
      webhook_url: webhookUrl,
      addresses: addresses,
    });
    return { id: result.address_activity_id };
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
    const minimalTransaction = {
      from: transaction.from,
      to: transaction.to,
      value: transaction.value,
      gas: transaction.gas,
      gasPrice: transaction.gasPrice,
      hash: transaction.hash,
      blockNumber: transaction.blockNumber,
      timestamp: transaction.timestamp,
    };

    const configs = await this.addressActivityRepository.getMany(
      transaction.from,
      transaction.to,
    );

    for (const config of configs) {
      await this.triggerWebhook(config.webhook_url, minimalTransaction);
    }
  }

  private async triggerWebhook(webhookUrl: string, transaction: any) {
    try {
      await axios.post(webhookUrl, transaction, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`error triggering webhook: ${error.message}`);
    }
  }
}
