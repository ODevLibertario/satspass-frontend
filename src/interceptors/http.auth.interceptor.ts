// src/app/interceptors/http.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpErrorResponse,
} from '@angular/common/http';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import {environment} from "../environments/environment";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {ModalService} from "../service/ModalService";

@Injectable()
export class HttpAuthInterceptorService implements HttpInterceptor {
  private apiKey = environment.apiKey;

  constructor(private storage: Storage, private router: Router, private modalService: ModalService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.storage.get('token'))
      .pipe(
        switchMap(token => {
          const headers = {
            'x-api-key': `${this.apiKey}`,
            'Content-Type': 'application/json',
          } as any

          if(token && !req.url.includes('auth')) {
           headers["Authorization"] = 'Bearer '+ token;
          }

          // Clone the request to add the new headers
          const clonedRequest = req.clone({
            setHeaders: headers,
          });

          // Pass the cloned request instead of the original request to the next handle
          return next.handle(clonedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
              // Check if the error status is 401
              if (error.status === 401) {
                // Handle 401 Unauthorized responses
                this.modalService.toast('Autenticação expirada, favor efetuar login.', 'warning')
                this.router.navigate(['/auth/sign-in']);
              }
              return throwError(() => error);
            })
          );
        })
      );
  }
}
