import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static getEnvironment() {
    return {
      WHISPER_A_PROVIDER: process.env.WHISPER_A_PROVIDER,
      WHISPER_B_PROVIDER: process.env.WHISPER_B_PROVIDER,
    };
  }
}
