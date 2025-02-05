import { Inject, Injectable } from '@nestjs/common';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';

import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { InsertProduct, product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly productRepository: ProductRepository
  ) {}

  async create(createProductDto: InsertProduct) {
    await this.db.insert(product).values(createProductDto);

    return 'This action adds a new order';
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
