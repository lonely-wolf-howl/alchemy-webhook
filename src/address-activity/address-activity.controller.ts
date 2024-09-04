import { Controller, Post, Body } from '@nestjs/common';
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

  @Post('register')
  async registerWebhook(@Body() body: any) {
    return await this.addressActivityService.registerWebhook(body);
  }
}
