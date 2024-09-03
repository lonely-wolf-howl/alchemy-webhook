import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Body() payload: any) {
    console.log('alchemy webhook payload:', payload);
  }
}
