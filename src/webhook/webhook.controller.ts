import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Body() payload: any) {
    console.log(payload);

    for (const activity of payload.event.activity) {
      console.log(activity);
      /*
      {
        blockNum: '0xdf34a3',
        hash: '0x7a4a39da2a3fa1fc2ef88fd1eaea070286ed2aba21e0419dcfb6d5c5d9f02a72',
        fromAddress: '0x503828976d22510aad0201ac7ec88293211d23da',
        toAddress: '0xbe3f4b43db5eb49d1f48f53443b9abce45da3b79',
        value: 293.092129,
        erc721TokenId: null,
        erc1155Metadata: null,
        asset: 'USDC',
        category: 'token',
        rawContract: {
          rawValue: '0x0000000000000000000000000000000000000000000000000000000011783b21',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          decimals: 6
        },
        typeTraceAddress: null,
        log: {
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            '0x000000000000000000000000503828976d22510aad0201ac7ec88293211d23da',
            '0x000000000000000000000000be3f4b43db5eb49d1f48f53443b9abce45da3b79'
          ],
          data: '0x0000000000000000000000000000000000000000000000000000000011783b21',
          blockNumber: '0xdf34a3',
          transactionHash: '0x7a4a39da2a3fa1fc2ef88fd1eaea070286ed2aba21e0419dcfb6d5c5d9f02a72',
          transactionIndex: '0x46',
          blockHash: '0xa99ec54413bd3db3f9bdb0c1ad3ab1400ee0ecefb47803e17f9d33bc4d0a1e91',
          logIndex: '0x6e',
          removed: false
        }
      }
      */
    }
  }
}
