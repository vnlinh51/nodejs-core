import { Authorized, Body, Get, HttpCode, JsonController, Patch, Post, QueryParam, QueryParams } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import winston from 'winston';
import { IsEnum } from 'class-validator';
import { Service } from 'typedi';

import { Logger } from '@Decorators/Logger';

import { Book } from '@Entities/Book';

import { BookService } from '@Services/BookService';

import { CreateBookReq } from '@Rests/types/CreateBookReq';

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
    return this.bookService.create(body);
  }
}
