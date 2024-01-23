import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductModelDTO as ProductModel } from 'src/app/commons/services/shopping.service';
import { ShoppingService } from '../../../commons/services/shopping.service';
import { AuthService } from 'src/app/commons/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss']
})
export class ShoppingPage implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: ProductModel[] = [];
  dataSource!: MatTableDataSource<ProductModel>;

  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'actions'];

  categories: string[] = ['All'];
  selectedCategory: string = 'All';

  pagesSize: number[] = [5, 10, 15, 20];
  selectedPageSize: number = 10;

  productDetail!: ProductModel;

  get dataSourceProducts(): ProductModel[] {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter((element) => element.category === this.selectedCategory);
  }

  constructor(
    private shoppingService: ShoppingService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  async fetchProducts(): Promise<void> {
    try {
      this.products = await this.shoppingService.getProducts();
      this.dataSource = new MatTableDataSource<ProductModel>(this.dataSourceProducts);

      this.paginator.hidePageSize = true;
      this.dataSource.paginator = this.paginator;

      for (const product of this.products) {
        if (!this.categories.includes(product.category)) {
          this.categories.push(product.category);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  details(detailsModal: any, product: ProductModel): void {
    this.productDetail = product;
    this.modalService.open(detailsModal, { centered: true });
  }

  categorySelectionChange(): void {
    this.dataSource.data = this.dataSourceProducts;
  }

  sizeSelectionChange(): void {
    this.paginator.pageSize = this.selectedPageSize;
    this.dataSource.data = this.dataSourceProducts;
  }
}
