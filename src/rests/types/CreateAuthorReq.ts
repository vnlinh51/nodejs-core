import { IsString } from 'class-validator';

export class CreateAuthorReq {
  @IsString()
  name: string;
}
