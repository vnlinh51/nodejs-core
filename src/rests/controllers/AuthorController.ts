import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Params, Patch, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import winston from 'winston';
import { Service } from 'typedi';

import { Logger } from '@Decorators/Logger';

import { Author } from '@Entities/Author';

import { AuthorService } from '@Services/AuthorService';

import { CreateAuthorReq } from '@Rests/types/CreateAuthorReq';
import { IdPathParams } from '@Rests/types/IdPathParams';
import { UpdateAuthorReq } from '@Rests/types/UpdateAuthorReq';

@Service()
@JsonController('/authors')
@OpenAPI({ security: [{ BearerToken: [] }] })
export class AuthorController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private authorService: AuthorService,
  ) {}

  @Post('/')
  @HttpCode(201)
  @ResponseSchema(Author, { statusCode: 201 })
  async post(@Body() body: CreateAuthorReq) {
    const author = this.authorService.create(body);
    this.logger.info('Create author: ', author);
    return author;
  }

  @Get('/:id')
  @ResponseSchema(Author)
  public async getAuthorById(@Params() params: IdPathParams) {
    const author = await this.authorService.getAuthorById(params.id);
    this.logger.info('Author by id: ', author);
    return author;
  }

  @Patch('/:id')
  @ResponseSchema(Author)
  public async update(@Params() params: IdPathParams, @Body() body: UpdateAuthorReq) {
    this.logger.info('Update author by id: ', params.id, body);
    const author = await this.authorService.partialUpdate(params.id, body);
    this.logger.info('Author updated: ', author);
    return author;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OnUndefined(204)
  public async delete(@Params() params: IdPathParams) {
    await this.authorService.delete(params.id);
    return;
  }
}
