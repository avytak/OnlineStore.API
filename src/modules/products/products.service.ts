import { Inject, Injectable } from '@nestjs/common';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly productsRepository: ProductsRepository
  ) {}
  async create(createProductDto: CreateProductDto) {
    await this.productsRepository.create(createProductDto);

    return 'This action adds a new product';
  }

  async findAll() {
    return await this.productsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(id, updateProductDto);

    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
