import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookReq {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  idAuthor: number;
}
