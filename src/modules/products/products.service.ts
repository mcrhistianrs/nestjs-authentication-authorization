import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {

  private  products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const { userId, name,price } = createProductDto;
    this.products.push({
      userId: uuidv4(),
      name,
      price
    } as Product);
    return this.products;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find(user => user.userId === id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { userId, name,price} = updateProductDto;

    this.products =  this.products.map(product =>{
      if(product.userId===id){
        product = Object.assign({},
          userId === undefined ? {'userId':product.userId} : {userId},
          name === undefined ? {'name':product.name} : {name},
          price === undefined ? {'price':product.price} : {price},
        ); 
      }
      return product;
    });    
    return this.products;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
