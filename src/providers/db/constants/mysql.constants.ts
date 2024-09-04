import { AddressActivity } from 'src/address-activity/entities/address-activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from 'src/config/config';

export const MYSQL = {
  CONNECTION1: {
    ...Config.getEnvironment().DB_1,
    entities: [AddressActivity],
    synchronize: true,
    timezone: 'Z',
  },
};

export const MYSQL_CONNECTION = [
  {
    name: 'connection1',
    connection: MYSQL.CONNECTION1,
  },
];

export const TypeOrmModules = MYSQL_CONNECTION.map((mySqlConnection) =>
  TypeOrmModule.forRootAsync({
    name: mySqlConnection.name,
    useFactory: () => mySqlConnection.connection,
  }),
);
