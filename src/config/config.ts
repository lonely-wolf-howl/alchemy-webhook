import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static getEnvironment() {
    return {
      WHISPER_A_PROVIDER: process.env.WHISPER_A_PROVIDER,
      WHISPER_B_PROVIDER: process.env.WHISPER_B_PROVIDER,

      WHISPER_A_API_KEY: process.env.WHISPER_A_API_KEY,
      WHISPER_B_API_KEY: process.env.WHISPER_B_API_KEY,

      WEBHOOK_AUTH_TOKEN: process.env.WEBHOOK_AUTH_TOKEN,

      ADDRESS: process.env.ADDRESS,
    };
  }
}
