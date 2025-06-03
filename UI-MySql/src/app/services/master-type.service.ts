import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MastertypeService {

    private baseUrl = environment.apiUrl;
  
    constructor(private httpClient : HttpClient) { }

  getAllMasterstype() {
    return this.httpClient.get(`${this.baseUrl}/mastertype`);
  }

  getMastertypeById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/mastertype/mastertype/` + Id);
  }

  addMastertype(mastertype: any) {
    return this.httpClient.post(`${this.baseUrl}/mastertype`, mastertype);
  }

  updateMastertype(mastertype: any) {
    return this.httpClient.put(`${this.baseUrl}/mastertype/${mastertype.Id}`, mastertype);
  }
  deleteMastertype(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/mastertype/${Id}`);
  }
}
