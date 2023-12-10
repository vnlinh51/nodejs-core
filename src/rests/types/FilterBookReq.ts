import { IsOptional, IsString } from 'class-validator';

import { PaginationParams } from '@Rests/types/PaginationParams';

export class FilterBookReq extends PaginationParams {
  @IsString()
  @IsOptional()
  nameBook: string;

  @IsString()
  @IsOptional()
  nameAuthor: string;

  @IsString()
  @IsOptional()
  nameProvider: string;
}
