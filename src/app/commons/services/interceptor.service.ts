import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('login')) {
      return next.handle(request);
    }

    // Fake login
    const { email, password } = request.body;
    if (email !== 'user@demo.com' || password !== '123456') {
      return throwError(() => new Error('Invalid username or password'));
    }

    return of(new HttpResponse({
      status: 200,
      body: {
        loggedIn: true,
      }
    }));
  }
}
