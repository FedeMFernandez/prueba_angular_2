import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './commons/services/auth.service';
import { LoadingModule } from './commons/components/loading/loading.module';
import { of } from 'rxjs';
import { LoadingController } from './commons/components/loading/loading.controller';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: any;
  let authService: any;
  let loadingController: any;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authService = jasmine.createSpyObj('AuthService', ['loggedIn']);
    loadingController = jasmine.createSpyObj('LoadingController', ['onLoading']);
    loadingController.onLoading = of(false);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        LoadingModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
        { provide: LoadingController, useValue: loadingController },
        ChangeDetectorRef,
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to shopping if user is logged in', () => {
    authService.loggedIn.and.returnValue(true);

    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['shopping']);
  });
});
