import { Inject, Service } from 'typedi';
import { DataSource, In } from 'typeorm';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Book } from '@Entities/Book';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

import { FilterBookInput } from '@Services/types/FilterBookInput';

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

  async partialUpdate(id: number, book: Partial<Book>){
    return this.repo.createQueryBuilder()
      .update(book)
      .where({ id })
      .returning(['id', 'name', 'author', 'provider'])
      .execute();
  }

  async delete(id: number) {
    return this.repo.delete({ id });
  }

  async findByIds(ids: number[]) {
    return this.repo.find({ where: { id: In(ids) } });
  }

  async findAll(query: FilterBookInput){
    const { page = 1, size = 20, sortBy = 'createdAt', sortDirection = 'DESC', searchText, nameBook, nameAuthor, nameProvider } = query;

    const skip = (page - 1) * size;

    const queryBook = this.repo.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.provider', 'provider')
      .orderBy(`book.${sortBy}`, sortDirection);

    if (nameBook) {
      queryBook.andWhere('book.name like :name', { name: `%${nameBook}%` });
    }
    if (nameAuthor) {
      queryBook.andWhere('author.name ilike :nameAuthor', { nameAuthor: `%${nameAuthor.trim()}%` });
    }
    if (nameProvider) {
      queryBook.andWhere('provider.name ilike :nameProvider', { nameProvider: `%${nameProvider.trim()}%` });
    }

    const [items, count] = await queryBook.skip(skip).take(size).getManyAndCount();

    this.logger.info('test123: ', items);
    return { items, count };
  }
}
