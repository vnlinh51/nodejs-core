import { SortDirectionType } from '@Enums/SortDirectionType';
import { SortField } from '@Enums/SortField';

export interface PaginationInput {
  page?: number;
  size?: number;
  sortBy?: SortField;
  sortDirection?: SortDirectionType;
  searchText?: string;
}
