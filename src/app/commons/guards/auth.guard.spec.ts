import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';
import { LoginPage } from 'src/app/pages/publics/login/login.page';

describe('AuthGuard', () => {

  let guard: CanActivateFn;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    const authService = jasmine.createSpyObj('AuthService', ['loggedIn']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{
        path: 'login', component: LoginPage,
      }])],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ],
    });

    guard = AuthGuard;
  });

  it('should create the guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when the user is logged in', async () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    const authService = TestBed.inject(AuthService);
    (authService as any).loggedIn = true;

    const result = await TestBed.runInInjectionContext(() => guard(route, state));
    expect(result).toBe(true);
  });

  it('should not allow access when the user is not logged in', async () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    const authService = TestBed.inject(AuthService);
    (authService as any).loggedIn = false;

    const result = await TestBed.runInInjectionContext(() => guard(route, state));
    expect(result).toBe(false);
  });
});
