import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from "../environments/environment";
import {SignUpRequest} from "../model/SignUpRequest";
import {UpsertEventRequest} from "../model/UpsertEventRequest";
import {Event} from "../model/Event";
import {UpsertTicketCategoryRequest} from "../model/UpsertTicketCategoryRequest";
import {User} from "../model/User";
import {TicketStatistics} from "../model/TicketStatistics";

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

  addEvent(upsertEventRequest: UpsertEventRequest): Promise<{ eventId: string }> {
    const url = `${this.apiUrl}/manager/events`;
    return firstValueFrom(this.http.post(url, {...upsertEventRequest})) as Promise<{ eventId: string }>;
  }

  updateEvent(eventId: string, upsertEventRequest: UpsertEventRequest) {
    const url = `${this.apiUrl}/manager/events/${eventId}`;
    return firstValueFrom(this.http.put(url, {...upsertEventRequest}));
  }

  getCustomerEvents(): Promise<Event[]>{
    const url = `${this.apiUrl}/customer/events`;
    return firstValueFrom(this.http.get(url)) as Promise<Event[]>;
  }

  getManagerEvents(): Promise<Event[]>{
    const url = `${this.apiUrl}/manager/events`;
    return firstValueFrom(this.http.get(url)) as Promise<Event[]>;
  }

  addTicketCategory(eventId: string, upsertTicketCategoryRequest: UpsertTicketCategoryRequest): Promise<Object> {
    const url = `${this.apiUrl}/manager/events/${eventId}/ticket-categories`;
    return firstValueFrom(this.http.post(url, {...upsertTicketCategoryRequest}));
  }

  updateTicketCategory(eventId: string, ticketCategoryId: string, upsertTicketCategoryRequest: UpsertTicketCategoryRequest): Promise<Object> {
    const url = `${this.apiUrl}/manager/events/${eventId}/ticket-categories/${ticketCategoryId}`;
    return firstValueFrom(this.http.put(url, {...upsertTicketCategoryRequest}));
  }

  async getEvent(eventId: string) {
    const url = `${this.apiUrl}/manager/events/${eventId}`;
    return firstValueFrom(this.http.get(url)) as Promise<Event>;
  }

  async getEventStatistics(eventId: string) {
    const url = `${this.apiUrl}/manager/events/${eventId}/statistics`;
    return firstValueFrom(this.http.get(url)) as Promise<TicketStatistics[]>;
  }

  async publishEvent(eventId: string) {
    const url = `${this.apiUrl}/manager/events/${eventId}/publish`;
    return firstValueFrom(this.http.put(url, {}));
  }

  deleteEvent(eventId: string) {
    const url = `${this.apiUrl}/manager/events/${eventId}`;
    return firstValueFrom(this.http.delete(url));
  }

  deleteTicketCategory(eventId: string, ticketCategoryId: string) {
    const url = `${this.apiUrl}/manager/events/${eventId}/ticket-categories/${ticketCategoryId}`;
    return firstValueFrom(this.http.delete(url));
  }

  getUser() {
    const url = `${this.apiUrl}/user`;
    return firstValueFrom(this.http.get(url)) as Promise<User>;
  }

  updateLightningAddress(lightningAddress: string) {
    const url = `${this.apiUrl}/user/lightning-address`;
    return firstValueFrom(this.http.put(url, {lightningAddress}));
  }
}
