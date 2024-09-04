import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {SignUpRequest} from "../model/SignUpRequest";

@Injectable({
  providedIn: 'root',
})
export class SatspassApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  signUp(request: SignUpRequest): Promise<Object> {
    const url = `${this.apiUrl}/auth/sign-up`;
    return firstValueFrom(this.http.post(url, JSON.stringify(request)));
  }

  verifyEmail(email: string, code: string): Promise<Object> {
    const url = `${this.apiUrl}/auth/verify-email`;
    return firstValueFrom(this.http.post(url, {email, code}));
  }

  signIn(email: any, password: any): Promise<{ token: string, role: string }> {
    const url = `${this.apiUrl}/auth/sign-in`;
    return firstValueFrom(this.http.post(url, {email, password})) as Promise<{ token: string, role: string }>;
  }
}
