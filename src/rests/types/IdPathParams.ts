import { IsNumber, Min } from 'class-validator';

export class IdPathParams {
  @IsNumber()
  @Min(1)
  id: number;
}
