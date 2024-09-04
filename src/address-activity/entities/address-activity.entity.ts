import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddressActivity {
  @PrimaryGeneratedColumn('uuid')
  address_activity_id: string;

  @Column()
  chain: string;

  @Column()
  network: string;

  @Column()
  webhook_url: string;

  @Column('simple-array')
  addresses: string[];
}
