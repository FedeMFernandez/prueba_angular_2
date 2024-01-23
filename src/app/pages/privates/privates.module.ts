import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivatesRoutingModule } from './privates-routing.module';
import { ShoppingPage } from './shopping/shopping.page';
import { ShoppingService } from 'src/app/commons/services/shopping.service';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ShoppingPage,
  ],
  imports: [
    CommonModule,
    PrivatesRoutingModule,
    MatTableModule,
    MatSelectModule,
    NgbModalModule,
    MatPaginatorModule,
  ],
  providers: [
    ShoppingService,
  ],
})
export class PrivatesModule { }
