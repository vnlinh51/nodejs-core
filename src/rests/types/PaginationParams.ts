import { IsNumber, IsOptional, IsEnum, Min, IsString } from 'class-validator';

import { SortDirectionType } from '@Enums/SortDirectionType';
import { SortField } from '@Enums/SortField';

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  size: number;

  @IsOptional()
  @IsEnum(SortField)
  sortBy: SortField;

  @IsOptional()
  @IsEnum(SortDirectionType)
  sortDirection: SortDirectionType;

  @IsOptional()
  @IsString()
  searchText: string;
}
