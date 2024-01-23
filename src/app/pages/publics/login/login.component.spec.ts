import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/commons/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginPage', () => {

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: any;
  let authService: any;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authService = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      declarations: [
        LoginPage,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
        ChangeDetectorRef,
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login page', () => {
    expect(component).toBeTruthy();
  });

  describe('submitEventHandler()', () => {
    it('should login user and navigate', (done: DoneFn) => {
      authService.login.and.returnValue(
        Promise.resolve()
      );

      component.submitEventHandler({
        email: 'user@demo.com',
        password: '123456',
      }).then((response) => {
        expect(router.navigate).toHaveBeenCalled();
        done();
      })
    });

    it('should not login user and set error', fakeAsync(async () => {
      const errorMessage = 'Invalid username or password';
      authService.login.and.returnValue(
        Promise.reject({
          message: errorMessage,
        })
      );

      await component.submitEventHandler({
        email: 'user@demo.com',
        password: '123455',
      })
      expect(component.errorMessage).toEqual(errorMessage);
    }));
  });
});
