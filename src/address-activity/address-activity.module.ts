import { Module } from '@nestjs/common';
import { AddressActivityController } from './address-activity.controller';
import { AddressActivityService } from './address-activity.service';
import { Config } from 'src/config/config';
import Web3 from 'web3';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressActivity } from './entities/address-activity.entity';
import { AddressActivityRepository } from './repositories/address-activity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressActivity], 'connection1')],
  controllers: [AddressActivityController],
  providers: [
    AddressActivityService,
    {
      provide: 'WEB3',
      useValue: new Web3(Config.getEnvironment().WEB3_PROVIDER),
    },
    AddressActivityRepository,
  ],
})
export class AddressActivityModule {}
