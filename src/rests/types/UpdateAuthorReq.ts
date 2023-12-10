import { IsString } from 'class-validator';

export class UpdateAuthorReq {
  @IsString()
  name: string;
}
