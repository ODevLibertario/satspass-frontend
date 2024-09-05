// src/app/interceptors/http.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpHeaders,
} from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import {environment} from "../environments/environment";
import {Storage} from "@ionic/storage";

@Injectable()
export class HttpAuthInterceptorService implements HttpInterceptor {
  private apiKey = environment.apiKey;

  constructor(private storage: Storage) {
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
          return next.handle(clonedRequest);
        })
      );
  }
}
