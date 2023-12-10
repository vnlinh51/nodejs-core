import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Author } from '@Entities/Author';

import { AuthorRepository } from '@Repositories/AuthorRepository';

import { UpdateAuthorReq } from '@Rests/types/UpdateAuthorReq';

import { CreateAuthorInput  } from './types/CreateAuthorInput';

@Service()
export class AuthorService {
  constructor(
    @Logger(module) private logger: winston.Logger,
    private readonly authorRepo: AuthorRepository,
  ){}

  async create(input: CreateAuthorInput) {
    const author = new Author();
    author.name = input.name;

    return await this.authorRepo.create(author);
  }

  public async getAuthorById(id: number) {
    return this.authorRepo.findById(id);
  }

  public async partialUpdate(id: number, author: UpdateAuthorReq) {
    const updated = await this.authorRepo.partialUpdate(id, author);
    return updated?.raw?.[0];
  }

  public async delete(id: number) {
    return this.authorRepo.delete(id);
  }
}
