import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnoncementService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
  
  getAllAnnouncements() {
    return this.httpClient.get(`${this.baseUrl}/announcement`);
    
  }

  getAnnouncementById(Id: any){
    return this.httpClient.get(`${this.baseUrl}/announcement${Id}`);
  }

  addAnnouncement(announcement: any) {
    return this.httpClient.post(`${this.baseUrl}/announcement`, announcement);
  }

  updateAnnouncement(announcement: any) {
    return this.httpClient.put(`${this.baseUrl}/announcement/${announcement.Id}`, announcement);
  }
  deleteAnnouncement(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/announcement/${Id}`);
  }
 
}
