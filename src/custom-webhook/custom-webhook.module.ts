import { Module } from '@nestjs/common';
import { CustomWebhookController } from './custom-webhook.controller';
import { CustomWebhookService } from './custom-webhook.service';
import { Config } from 'src/config/config';
import Web3 from 'web3';

@Module({
  controllers: [CustomWebhookController],
  providers: [
    CustomWebhookService,
    {
      provide: 'WEB3',
      useValue: new Web3(Config.getEnvironment().EQBR_WEB3_PROVIDER),
    },
  ],
})
export class CustomWebhookModule {}
