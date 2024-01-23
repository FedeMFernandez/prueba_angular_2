import { of } from 'rxjs';
import { InterceptorService } from './interceptor.service';
import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';

describe('InterceptorService', () => {

  let service: InterceptorService;

  beforeEach(() => {
    service = new InterceptorService();
  });

  describe('intercept()', () => {
    it('should intercept login request and return bad login response', (done: DoneFn) => {
      const request = {
        url: 'login',
        body: {
          email: 'user@demo.com',
          password: '12345',
        }
      } as HttpRequest<any>;
      const next = {
        handle: (request: any) => {
          return of({} as HttpEvent<any>);
        }
      } as any;

      service.intercept(request, next).subscribe({
        error: (error: any) => {
          expect(error).toEqual(new Error('Invalid username or password'));
          done();
        }
      });
    });

    it('should intercept login request and return success login response', (done: DoneFn) => {
      const request = {
        url: 'login',
        body: {
          email: 'user@demo.com',
          password: '123456',
        }
      } as HttpRequest<any>;
      const next = {
        handle: (request: any) => {
          return of({} as HttpEvent<any>);
        }
      } as any;

      service.intercept(request, next).subscribe({
        next: (response) => {
          expect(response).toBeInstanceOf(HttpResponse<any>);
          done();
        }
      });
    });

    it('should intercept shopping request and return response', (done: DoneFn) => {
      const request = {
        url: 'shopping',
      } as HttpRequest<any>;
      const next = {
        handle: (request: any) => {
          return of({} as HttpEvent<any>);
        }
      } as any;

      service.intercept(request, next).subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          done();
        }
      });
    });
  });
});
