import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  getProfileById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/profile/` + Id);
  }

  getEmployeeById(Id: any) {
    console.log(`Fetching employee with ID: ${Id}`);
    console.log(`Full API URL: ${this.baseUrl}/employee/${Id}`);
    return this.httpClient.get(`${this.baseUrl}/employee/` + Id);
  }
  
}
