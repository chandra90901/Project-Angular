import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllNotifications() {
    return this.httpClient.get(`${this.baseUrl}/notification`);
  }

  getNotificationById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/notification/notification/` + Id);
  }

  addNotification(notification: any) {
    return this.httpClient.post(`${this.baseUrl}/notification`, notification);
  }

  updateNotification(notification: any) {
    return this.httpClient.put(`${this.baseUrl}/notification/${notification.Id}`, notification);
  }
  deleteNotification(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/notification/${Id}`);
  }
}
