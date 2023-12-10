import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookReq {
  @IsString()
  name: string;

  @IsNumber()
  idAuthor: number;

  @IsNumber()
  @IsOptional()
  idProvider?: number;
}
