import { Store } from '../entities/store.entity';

export class PageStoresDto {
  data: Store[];
  paging: {
    page: number;
    pages: number;
    count: number;
  };
}
