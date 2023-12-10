import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { BusinessLogicError } from '@Errors/BusinessLogicError';
import { ErrorCode } from '@Errors/ErrorCode';

import { Book } from '@Entities/Book';
import { Provider } from '@Entities/Provider';
import { Author } from '@Entities/Author';

import { BookRepository } from '@Repositories/BookRepository';
import { AuthorRepository } from '@Repositories/AuthorRepository';
import { ProviderRepository } from '@Repositories/ProviderRepository';

import { CreateBookInput  } from '@Services/types/CreateBookInput';
import { UpdateBookInput } from '@Services/types/UpdateBookInput';

@Service()
export class BookService {
  constructor(
    @Logger(module) private logger: winston.Logger,
    private readonly bookRepo: BookRepository,
    private readonly providerRepo: ProviderRepository,
    private readonly authorRepo: AuthorRepository,
  ){}

  async create(input: CreateBookInput) {
    let provider: Provider;
    if (input.idProvider) {
      provider = await this.providerRepo.findById(input.idProvider);
      if (!provider) {
        throw new BusinessLogicError(ErrorCode.PROVIDER_NOT_FOUND);
      }
    }

    const author = await this.authorRepo.findById(input.idAuthor);
    if (!author) {
      throw new BusinessLogicError(ErrorCode.AUTHOR_NOT_FOUND);
    }

    this.logger.info('create:: create book', author.id);

    const book = new Book();
    book.name = input.name;
    book.author = author;
    book.provider = provider;

    return await this.bookRepo.create(book);
  }

  public async getBookById(id: number) {
    return this.bookRepo.findById(id);
  }

  public async partialUpdate(id: number, input: UpdateBookInput) {
    let provider: Provider;
    if (input.idProvider) {
      provider = await this.providerRepo.findById(input.idProvider);
      if (!provider) {
        throw new BusinessLogicError(ErrorCode.PROVIDER_NOT_FOUND);
      }
    }
    let author: Author;
    if (input.idAuthor) {
      author = await this.authorRepo.findById(input.idAuthor);
      if (!author) {
        throw new BusinessLogicError(ErrorCode.AUTHOR_NOT_FOUND);
      }
    }

    const data = {
      name: input.name,
      author: author,
      provider: provider,
    };

    if (!input.name) delete data.name;
    if (!input.idAuthor) delete data.author;
    if (!input.idProvider) delete data.provider;

    const updated = await this.bookRepo.partialUpdate(id, data);
    return updated?.raw?.[0];
  }

  public async delete(id: number) {
    return this.bookRepo.delete(id);
  }
}
