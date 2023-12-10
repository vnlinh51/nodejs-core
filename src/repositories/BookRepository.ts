import { Inject, Service } from 'typedi';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Book } from '@Entities/Book';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class BookRepository extends BaseOrmRepository<Book> {
  constructor(
    @Logger(module) private logger: winston.Logger,
    @Inject('dataSource') private dataSource: DataSource,
  ) {
    super(dataSource, Book);
  }

  async create(book: Book) {
    return await this.repo.save(book);
  }
}
