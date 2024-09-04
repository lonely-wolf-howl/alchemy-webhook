import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressActivity } from '../entities/address-activity.entity';

@Injectable()
export class AddressActivityRepository {
  constructor(
    @InjectRepository(AddressActivity, 'connection1')
    private readonly addressActivityRepository: Repository<AddressActivity>,
  ) {}

  async create(
    data: Partial<AddressActivity>,
    transaction?: EntityManager,
  ): Promise<AddressActivity> {
    if (transaction) {
      return transaction.getRepository(AddressActivity).save(data);
    }
    return this.addressActivityRepository.save(data);
  }

  async getMany(from: string, to: string): Promise<AddressActivity[]> {
    return this.addressActivityRepository.find({
      where: [{ addresses: from }, { addresses: to }],
    });
  }
}
