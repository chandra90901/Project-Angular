import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllSettings() {
    return this.httpClient.get(`${this.baseUrl}/appsetting`);
  }

  getSettingById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/appsetting/${Id}`);
  }

  addSetting(setting: any) {
    return this.httpClient.post(`${this.baseUrl}/appsetting`, setting);
  }

  updateSetting(setting: any) {
    return this.httpClient.put(`${this.baseUrl}/appsetting/${setting.Id}`, setting);
  }

  deleteSetting(Id: number) {
    return this.httpClient.delete(`${this.baseUrl}/appsetting/${Id}`);
  }
}
