import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static getEnvironment() {
    return {
      EQBR_WEB3_PROVIDER: process.env.EQBR_WEB3_PROVIDER,
    };
  }
}
