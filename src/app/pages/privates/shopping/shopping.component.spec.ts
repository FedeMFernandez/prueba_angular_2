import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingPage } from './shopping.page';
import { ShoppingService } from 'src/app/commons/services/shopping.service';
import { AuthService } from 'src/app/commons/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShoppingPage', () => {

  let component: ShoppingPage;
  let fixture: ComponentFixture<ShoppingPage>;
  let router: any;
  let shoppingService: any;
  let authService: any;
  let modalService: any;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    shoppingService = jasmine.createSpyObj('ShoppingService', ['getProducts']);
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    modalService = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      declarations: [
        ShoppingPage,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        MatTableModule,
        MatSelectModule,
        NgbModalModule,
        MatPaginatorModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: ShoppingService, useValue: shoppingService },
        { provide: AuthService, useValue: authService },
        { provide: NgbModal, useValue: modalService },
        ChangeDetectorRef,
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(ShoppingPage);
    component = fixture.componentInstance;
    component.products = [];
  });

  it('should create the shopping page', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchProducts()', () => {
    it('should get product list', async () => {
      component.paginator = {
        hidePageSize: true,
      } as any;
      component.selectedCategory = "men\'s clothing";

      shoppingService.getProducts.and.returnValue(
        Promise.resolve([{
          id: 1,
          title: 'Underwear',
          category: "men\'s clothing",
        }, {
          id: 2,
          title: 'TV',
          category: "electronics",
        }])
      )

      fixture.detectChanges()
      await component.fetchProducts()
      expect(shoppingService.getProducts).toHaveBeenCalled();
    });

    it('should not get product list', async () => {
      component.paginator = {
        hidePageSize: true,
      } as any;
      component.selectedCategory = "men\'s clothing";

      shoppingService.getProducts.and.returnValue(
        Promise.reject(new Error('Error from testing'))
      )

      fixture.detectChanges()
      await component.fetchProducts()
      expect(shoppingService.getProducts).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('should logout user', (done: DoneFn) => {
      component.logout();
      expect(router.navigate).toHaveBeenCalledWith(['login']);
      done();
    });
  });

  describe('details()', () => {
    it('should open details modal', (done: DoneFn) => {
      component.details({} as any, {
        id: 1,
        title: 'Underwear',
        category: "men\'s clothing",
      } as any);
      expect(modalService.open).toHaveBeenCalled();
      done();
    });
  });

  describe('categorySelectionChange()', () => {
    it('should change category', () => {
      component.products = [{
        id: 1,
        title: 'Underwear',
        category: "men\'s clothing",
      } as any, {
        id: 2,
        title: 'TV',
        category: "electronics",
      } as any]
      component.dataSource = new MatTableDataSource<any>(component.products);
      component.categorySelectionChange();

      expect(component.dataSource).toBeTruthy();
    });
  });

  describe('sizeSelectionChange()', () => {
    it('should change page size', () => {
      component.products = [{
        id: 1,
        title: 'Underwear',
        category: "men\'s clothing",
      } as any, {
        id: 2,
        title: 'TV',
        category: "electronics",
      } as any]
      component.dataSource = new MatTableDataSource<any>(component.products);
      component.paginator = {
        pageSize: 5,
      } as MatPaginator;
      component.products = [];

      component.sizeSelectionChange();
      expect(component.pagesSize).toBeTruthy();
    });
  });
});
