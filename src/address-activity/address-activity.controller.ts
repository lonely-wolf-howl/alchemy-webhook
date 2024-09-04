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

  @Post('account')
  async createAccount() {
    return await this.addressActivityService.createAccount();
  }

  @Post('register')
  async registerWebhook(@Body() body: any) {
    return await this.addressActivityService.registerWebhook(body);
  }
}
