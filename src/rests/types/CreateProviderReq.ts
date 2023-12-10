import { IsOptional, IsString } from 'class-validator';

export class CreateProviderReq {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
