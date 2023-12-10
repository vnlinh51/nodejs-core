import { Inject, Service } from 'typedi';
import { DataSource, DeepPartial, EntityRepository, Repository } from 'typeorm';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Author } from '@Entities/Author';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class AuthorRepository extends BaseOrmRepository<Author> {
  constructor(
    @Logger(module) private logger: winston.Logger,
    @Inject('dataSource') private dataSource: DataSource,
  ) {
    super(dataSource, Author);
  }

  async create(author: Author) {
    return await this.repo.save(author);
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }
}
