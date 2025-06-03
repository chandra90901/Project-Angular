import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationEmployeeGroupService {


  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllNotificationGroupEmployees() {
    return this.httpClient.get(`${this.baseUrl}/notificationGroupEmployee`);
  }
  getNotificationGroupEmployeeById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/notificationGroupEmployee/${Id}`);
  }
  addNotificationEmployeeGroup(notificationGroupEmployee: any) {
    return this.httpClient.post(`${this.baseUrl}/notificationGroupEmployee`, notificationGroupEmployee);
  }
  updateNotificationGroupEmployee(notificationGroupEmployee: any) {
    return this.httpClient.put(`${this.baseUrl}/notificationGroupEmployee/${notificationGroupEmployee.Id}`, notificationGroupEmployee);
  }

  deleteNotificationGroupEmployee(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/notificationGroupEmployee/${Id}`);
  }
}
