import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicsRoutingModule } from './publics-routing.module';
import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    PublicsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class PublicsModule { }
