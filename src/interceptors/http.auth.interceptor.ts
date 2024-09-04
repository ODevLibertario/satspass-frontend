// src/app/interceptors/http.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

@Injectable()
export class HttpAuthInterceptorService implements HttpInterceptor {
  private apiKey = environment.apiKey;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("RAN")

    // Clone the request to add the new headers
    const clonedRequest = req.clone({
      setHeaders: {
        'x-api-key': `${this.apiKey}`,
        'Content-Type': 'application/json'
      },
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
