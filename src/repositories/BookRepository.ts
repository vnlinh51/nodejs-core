import { Inject, Service } from 'typedi';
import { DataSource, DeepPartial } from 'typeorm';
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

  async findById(id: number){
    return this.repo.findOneBy({ id });
  }

  async partialUpdate(id: number, book: DeepPartial<Book>){
    return this.repo.createQueryBuilder()
      .update(book)
      .where({ id })
      .returning(['id', 'name', 'author'])
      .execute();
  }

  async delete(id: number) {
    return this.repo.delete({ id });
  }
}
