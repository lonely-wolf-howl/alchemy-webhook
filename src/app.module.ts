import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { CustomWebhookModule } from './\bcustom-webhook/custom-webhook.module';

@Module({
  imports: [WebhookModule, CustomWebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
