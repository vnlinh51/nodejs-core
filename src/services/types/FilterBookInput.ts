import { PaginationInput } from '@Services/types/PaginationInput';

export interface FilterBookInput extends PaginationInput {
  nameBook?: string;
  nameAuthor?: string;
  nameProvider?: string
}
