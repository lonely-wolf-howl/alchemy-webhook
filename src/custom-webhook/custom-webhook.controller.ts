import { Controller, Post, Body } from '@nestjs/common';
import { CustomWebhookService } from './custom-webhook.service';

@Controller('custom-webhook')
export class CustomWebhookController {
  constructor(private readonly customWebhookService: CustomWebhookService) {}

  @Post()
  handleWebhook(@Body() payload: any) {
    console.log(payload);
  }

  @Post('account')
  async createAccount() {
    return await this.customWebhookService.createAccount();
  }
}
