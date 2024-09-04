import { plainToClass, Type } from 'class-transformer';
import { IsIn, IsNumber, IsString } from 'class-validator';
import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static getEnvironment() {
    return {
      ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
      ALCHEMY_WEBHOOK_URL: process.env.ALCHEMY_WEBHOOK_URL,
      WEBHOOK_AUTH_TOKEN: process.env.WEBHOOK_AUTH_TOKEN,
      WEB3_PROVIDER: process.env.WEB3_PROVIDER,
      ETHEREUM_ADDRESS: process.env.ETHEREUM_ADDRESS,

      DB_1: plainToClass(DatabaseConfig, {
        type: 'mysql',
        host: 'localhost',
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: 'webhook',
        port: 3306,
      }),
    };
  }
}

export class DatabaseConfig {
  @IsIn(['mysql', 'postgres'])
  type: 'mysql' | 'postgres';

  @IsString()
  host: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsNumber()
  @Type(() => Number)
  port: number;
}
