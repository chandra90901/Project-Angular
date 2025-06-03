import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllModules() {
    return this.httpClient.get(`${this.baseUrl}/module`);
  }

  getModuleById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/module/module/` + Id);
  }

  addModule(module: any) {
    return this.httpClient.post(`${this.baseUrl}/module`, module);
  }

  updateModule(module: any) {
    return this.httpClient.put(`${this.baseUrl}/module/${module.Id}`, module);
  }
  deleteModule(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/module/${Id}`);
  }
}
