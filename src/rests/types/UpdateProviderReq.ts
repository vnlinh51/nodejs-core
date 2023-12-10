import { IsOptional, IsString } from 'class-validator';

export class UpdateProviderReq {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
