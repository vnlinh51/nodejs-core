import { Authorized, Body, Delete, Get, HttpCode, JsonController, OnUndefined, Params, Patch, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import winston from 'winston';
import { IsEnum } from 'class-validator';
import { Service } from 'typedi';

import { Logger } from '@Decorators/Logger';

import { Book } from '@Entities/Book';

import { BookService } from '@Services/BookService';

import { CreateBookReq } from '@Rests/types/CreateBookReq';
import { IdPathParams } from '@Rests/types/IdPathParams';
import { UpdateBookReq } from '@Rests/types/UpdateBookReq';

@Service()
@JsonController('/books')
@OpenAPI({ security: [{ BearerToken: [] }] })
export class BookController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private bookService: BookService,
  ) {}

  @Post('/')
  @HttpCode(201)
  @ResponseSchema(Book, { statusCode: 201 })
  async post(@Body() body: CreateBookReq) {
    const book = this.bookService.create(body);
    this.logger.info('Create book: ', book);
    return book;
  }

  @Get('/:id')
  @ResponseSchema(Book)
  public async getBookById(@Params() params: IdPathParams) {
    const book = await this.bookService.getBookById(params.id);
    this.logger.info('Book by id: ', book);
    return book;
  }

  @Patch('/:id')
  @ResponseSchema(Book)
  public async update(@Params() params: IdPathParams, @Body() body: UpdateBookReq) {
    this.logger.info('Update book by id: ', params.id, body);
    const book = await this.bookService.partialUpdate(params.id, body);
    this.logger.info('Book updated: ', book);
    return book;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OnUndefined(204)
  public async delete(@Params() params: IdPathParams) {
    await this.bookService.delete(params.id);
    return;
  }
}
