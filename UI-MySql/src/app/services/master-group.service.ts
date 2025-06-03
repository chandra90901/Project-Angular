import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MastergroupService {

    private baseUrl = environment.apiUrl;
  
    constructor(private httpClient : HttpClient) { }

  getAllMastersgroup() {
    return this.httpClient.get(`${this.baseUrl}/mastergroup`);
  }

  getMastergroupById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/mastergroup/mastergroup/` + Id);
  }

  addMastergroup(mastergroup: any) {
    return this.httpClient.post(`${this.baseUrl}/mastergroup`, mastergroup);
  }

  updateMastergroup(mastergroup: any) {
    return this.httpClient.put(`${this.baseUrl}/mastergroup/${mastergroup.Id}`, mastergroup);
  }
  deleteMastergroup(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/mastergroup/${Id}`);
  }
}
