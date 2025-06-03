import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationGroupService {
  
    private baseUrl = environment.apiUrl;
  
    constructor(private httpClient: HttpClient) { }
  
    getAllNotificationGroup() {
      return this.httpClient.get(`${this.baseUrl}/notificationGroup`);

    }
  
    getNotificationGroupById(Id: any) {
      return this.httpClient.get(`${this.baseUrl}/notificationGroup/ notificationGroup/` + Id);
    }
  
    addNotificationGroup( notificationGroup: any) {
      return this.httpClient.post(`${this.baseUrl}/notificationGroup`,  notificationGroup);
    }
  
    updateNotificationGroup( notificationGroup: any) {
      return this.httpClient.put(`${this.baseUrl}/notificationGroup/${ notificationGroup.Id}`,  notificationGroup);
    }
    deleteNotificationGroup(Id: string) {
      return this.httpClient.delete(`${this.baseUrl}/notificationGroup/${Id}`);
    }
  }
