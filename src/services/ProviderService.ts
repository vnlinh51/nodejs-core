import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Provider } from '@Entities/Provider';
import { Book } from '@Entities/Book';

import { ProviderRepository } from '@Repositories/ProviderRepository';
import { BookRepository } from '@Repositories/BookRepository';

import { CreateProviderInput  } from '@Services/types/CreateProviderInput';
import { UpdateProviderInput } from '@Services/types/UpdateProviderInput';

@Service()
export class ProviderService {
  constructor(
    @Logger(module) private logger: winston.Logger,
    private readonly bookRepo: BookRepository,
    private readonly providerRepo: ProviderRepository,
  ){}

  async create(input: CreateProviderInput) {
    const provider = new Provider();
    provider.name = input.name;
    provider.description = input.description;
    return await this.providerRepo.create(provider);
  }

  public async getProviderById(id: number) {
    return this.providerRepo.findById(id);
  }

  public async partialUpdate(id: number, provider: UpdateProviderInput) {
    const updated = await this.providerRepo.partialUpdate(id, provider);

    if (updated && updated.affected > 0) {
      const [provider] = updated.raw;
      return provider as Provider;
    }

    return undefined;
  }

  public async delete(id: number) {
    return this.providerRepo.delete(id);
  }
}
