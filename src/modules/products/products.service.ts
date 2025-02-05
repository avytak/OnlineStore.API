import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getAllProducts() {
    return [
      {
        id: 1,
        name: 'Product 1',
      },
      {
        id: 2,
        name: 'Product 2',
      },
      {
        id: 3,
        name: 'Product 3',
      },
      {
        id: 4,
        name: 'Product 4',
      },
      {
        id: 1,
        name: 'Product 1',
      },
      {
        id: 5,
        name: 'Product 5',
      },
    ];
  }
}
