import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Provider } from '@Entities/Provider';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class ProviderRepository extends BaseOrmRepository<Provider> {
  constructor(
    @Logger(module) private logger: winston.Logger,
    @Inject('dataSource') private dataSource: DataSource,
  ) {
    super(dataSource, Provider);
  }

  async create(provider: Provider) {
    return await this.repo.save(provider);
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async findById(id: number){
    return this.repo.findOneBy({ id });
  }

  async partialUpdate(id: number, provider: Partial<Provider>){
    return this.repo.createQueryBuilder()
      .update(provider)
      .where({ id })
      .returning(['id', 'name', 'description'])
      .execute();
  }

  async delete(id: number) {
    return this.repo.delete({ id });
  }
}
