import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MastersService {

    private baseUrl = environment.apiUrl;
  
    constructor(private httpClient : HttpClient) { }

  getAllMasters() {
    return this.httpClient.get(`${this.baseUrl}/master`);
  }

  getMasterById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/master/master/` + Id);
  }

  addMaster(master: any) {
    return this.httpClient.post(`${this.baseUrl}/master`, master);
  }

  updateMaster(master: any) {
    return this.httpClient.put(`${this.baseUrl}/master/${master.Id}`, master);
  }
  deleteMaster(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/master/${Id}`);
  }
}
