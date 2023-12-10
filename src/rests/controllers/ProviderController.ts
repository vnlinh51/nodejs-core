import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Params, Patch, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import winston from 'winston';
import { Service } from 'typedi';

import { Logger } from '@Decorators/Logger';

import { Provider } from '@Entities/Provider';

import { ProviderService } from '@Services/ProviderService';

import { CreateProviderReq } from '@Rests/types/CreateProviderReq';
import { IdPathParams } from '@Rests/types/IdPathParams';
import { UpdateProviderReq } from '@Rests/types/UpdateProviderReq';

@Service()
@JsonController('/providers')
@OpenAPI({ security: [{ BearerToken: [] }] })
export class ProviderController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private providerService: ProviderService,
  ) {}

  @Post('/')
  @HttpCode(201)
  @ResponseSchema(Provider, { statusCode: 201 })
  async post(@Body() body: CreateProviderReq) {
    const provider = this.providerService.create(body);
    this.logger.info('Create provider: ', provider);
    return provider;
  }

  @Get('/:id')
  @ResponseSchema(Provider)
  public async getProviderById(@Params() params: IdPathParams) {
    const provider = await this.providerService.getProviderById(params.id);
    this.logger.info('Provider by id: ', provider);
    return provider;
  }

  @Patch('/:id')
  @ResponseSchema(Provider)
  public async update(@Params() params: IdPathParams, @Body() body: UpdateProviderReq) {
    this.logger.info('Update provider by id: ', params.id, body);
    const provider = await this.providerService.partialUpdate(params.id, body);
    this.logger.info('Provider updated: ', provider);
    return provider;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OnUndefined(204)
  public async delete(@Params() params: IdPathParams) {
    await this.providerService.delete(params.id);
    return;
  }
}
