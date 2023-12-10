import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { HttpPaginatedResponse } from '@Libs/types/HttpPaginatedResponse';

import { Book } from '@Entities/Book';

export class BookPaginationRes extends HttpPaginatedResponse<Book> {
  @ValidateNested()
  @Type(() => Book)
  items: Book[]
}
