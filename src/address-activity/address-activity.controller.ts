import { Controller, Post, Body, Get } from '@nestjs/common';
import { AddressActivityService } from './address-activity.service';

@Controller('address-activity')
export class AddressActivityController {
  constructor(
    private readonly addressActivityService: AddressActivityService,
  ) {}

  @Post()
  async handleWebhook(@Body() payload: any) {
    console.log(payload);
  }

  @Get()
  async ping() {
    return 'pong';
  }

  @Post('account')
  async createAccount() {
    return await this.addressActivityService.createAccount();
  }

  @Post('register')
  async registerWebhook(@Body() body: any) {
    return await this.addressActivityService.registerWebhook(body);
  }
}
