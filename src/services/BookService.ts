import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Book } from '@Entities/Book';

import { BookRepository } from '@Repositories/BookRepository';
import { AuthorRepository } from '@Repositories/AuthorRepository';

import { UpdateBookReq } from '@Rests/types/UpdateBookReq';

import { CreateBookInput  } from './types/CreateBookInput';

@Service()
export class BookService {
  constructor(
    @Logger(module) private logger: winston.Logger,
    private readonly bookRepo: BookRepository,
    private readonly authorRepo: AuthorRepository,
  ){}

  // async findByIds(ids: string[]) {
  //   return [{
  //     _id: '1',
  //     name: 'quang',
  //   }];
  // }

  async create(input: CreateBookInput) {
    const author = await this.authorRepo.findOne(input.idAuthor);
    this.logger.info('create:: create book', author.id);
    const book = new Book();
    book.name = input.name;
    book.author = author;

    return await this.bookRepo.create(book);
  }

  public async getBookById(id: number) {
    return this.bookRepo.findById(id);
  }

  public async partialUpdate(id: number, book: UpdateBookReq) {
    const updated = await this.bookRepo.partialUpdate(id, book);
    return updated?.raw?.[0];
  }

  public async delete(id: number) {
    return this.bookRepo.delete(id);
  }
}
