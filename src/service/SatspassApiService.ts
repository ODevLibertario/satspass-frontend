import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {SignUpRequest} from "../model/SignUpRequest";
import {UpsertEventRequest} from "../model/UpsertEventRequest";
import {Event} from "../model/Event";

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

  resetPassword(email: string) {
    const url = `${this.apiUrl}/auth/reset-password`;
    return firstValueFrom(this.http.post(url, {email}));
  }

  addEvent(upsertEventRequest: UpsertEventRequest): Promise<Object> {
    const url = `${this.apiUrl}/manager/events`;
    return firstValueFrom(this.http.post(url, {...upsertEventRequest}));
  }

  getCustomerEvents(): Promise<Event[]>{
    const url = `${this.apiUrl}/customer/events`;
    return firstValueFrom(this.http.get(url)) as Promise<Event[]>;
  }
}
