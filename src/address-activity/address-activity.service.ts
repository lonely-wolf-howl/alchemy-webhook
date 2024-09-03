import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Config } from 'src/config/config';
import Web3 from 'web3';
import axios from 'axios';

const WHISPER_A_API_KEY = Config.getEnvironment().WHISPER_A_API_KEY;
const WHISPER_B_API_KEY = Config.getEnvironment().WHISPER_B_API_KEY;

const webhookConfigs = {
  [WHISPER_A_API_KEY]: {
    webhookUrl: 'http://127.0.0.1:3000',
    authToken: Config.getEnvironment().WEBHOOK_AUTH_TOKEN,
  },
  [WHISPER_B_API_KEY]: {
    webhookUrl: 'http://127.0.0.1:3000',
    authToken: Config.getEnvironment().WEBHOOK_AUTH_TOKEN,
  },
};

@Injectable()
export class AddressActivityService implements OnModuleInit {
  private readonly logger = new Logger(AddressActivityService.name);

  onModuleInit() {
    this.logger.debug('blockchain monitoring initialized.');
    this.monitorBlocks(this.whisperA, WHISPER_A_API_KEY);
    this.monitorBlocks(this.whisperB, WHISPER_B_API_KEY);
  }

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

  private monitorBlocks(web3: Web3, apiKey: string) {
    web3.eth.subscribe('newBlockHeaders', async (error, blockHeader) => {
      if (error) {
        this.logger.error('error subscribing to new block headers:', error);
        return;
      }

      try {
        const block = await web3.eth.getBlock(blockHeader.hash, true);

        if (block && block.transactions) {
          block.transactions.forEach((transaction) => {
            if (transaction.from === Config.getEnvironment().ADDRESS) {
              this.logger.log(
                `detected in block ${block.number}: ${JSON.stringify(transaction)}`,
              );
              this.triggerWebhook(apiKey, transaction);
            }
          });
        }
      } catch (error) {
        this.logger.error('error fetching block:', error.message);
      }
    });
  }

  private async triggerWebhook(apiKey: string, transaction: any) {
    const config = webhookConfigs[apiKey];

    try {
      const response = await axios.post(config.webhookUrl, transaction, {
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': config.authToken,
        },
      });
      this.logger.log(
        `webhook triggered for API key ${apiKey}: ${response.data}`,
      );
    } catch (error) {
      this.logger.error(
        `error triggering webhook for API key ${apiKey}: ${error.message}`,
      );
    }
  }

  async webhookWhisperA() {
    console.log('WHISPER A');
    return;
  }
}
