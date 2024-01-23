import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './commons/guards/auth.guard';

const routes: Routes = [
  {
    path: 'shopping',
    loadChildren: () => import('./pages/privates/privates.module').then(module => module.PrivatesModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/publics/publics.module').then(module => module.PublicsModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
