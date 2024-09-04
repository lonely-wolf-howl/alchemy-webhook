import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { AddressActivityModule } from './address-activity/address-activity.module';
import { MysqlModule } from './providers/db/mysql.module';

@Module({
  imports: [MysqlModule, WebhookModule, AddressActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
