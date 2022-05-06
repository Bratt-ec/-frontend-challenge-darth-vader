import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(
    private __auth: AuthService,
    private __global: GlobalService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('Intercepted request:', req);
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log('HttpErrorResponse error: ', err);
          switch (err.status) {
            case 401: // Expired or unauthenticated token
                console.log('ERROR 401');
                this.__global.showToast('Token expirado');
                this.__auth.logout();
                return of(undefined); // cambiar para que no se muestre el toast de la peticion
              break;
            case 480: // The version is no longer available
              console.log('ERROR 480');
              //
              break;
            case 481: // The current version is not supported (there is no version number)
              console.log('ERROR 481');
              //
              break;
            case 482: // The app-name and app-version parameters were not received
              console.log('ERROR 481');
              //
              break;

            default:
              break;
          }
        }
        // Here you could add code that shows the error somewhere on the screen.
        return throwError(err);
      })
    );
  }

}
