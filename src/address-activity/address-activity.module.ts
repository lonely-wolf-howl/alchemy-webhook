import { Module } from '@nestjs/common';
import { AddressActivityController } from './address-activity.controller';
import { AddressActivityService } from './address-activity.service';
import { Config } from 'src/config/config';
import Web3 from 'web3';

@Module({
  controllers: [AddressActivityController],
  providers: [
    AddressActivityService,
    {
      provide: 'WEB3A',
      useValue: new Web3(Config.getEnvironment().WHISPER_A_PROVIDER),
    },
    {
      provide: 'WEB3B',
      useValue: new Web3(Config.getEnvironment().WHISPER_B_PROVIDER),
    },
  ],
})
export class AddressActivityModule {}
