import { Controller, Post, Body } from '@nestjs/common';
import { AddressActivityService } from './address-activity.service';

@Controller('address-activity')
export class AddressActivityController {
  constructor(
    private readonly addressActivityService: AddressActivityService,
  ) {}

  @Post()
  handleWebhook(@Body() payload: any) {
    console.log(payload);
  }

  @Post('whisper-a')
  async createAccountWhisperA() {
    return await this.addressActivityService.createAccountWhisperA();
  }

  @Post('whisper-b')
  async createAccountWhisperB() {
    return await this.addressActivityService.createAccountWhisperB();
  }

  @Post('')
  async webhookWhisperA() {
    return await this.addressActivityService.webhookWhisperA();
  }
}
