import { RestService } from './rest.service';
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingService {

  constructor(
    private restService: RestService,
  ) { }

  async getProducts(): Promise<ProductModelDTO[]> {
    try {
      const collection = await this.restService.get<ProductModelDTO[]>('products');
      return Promise.resolve(collection);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}

export interface ProductModelDTO {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
