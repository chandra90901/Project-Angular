
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllPermissions() {
    return this.httpClient.get(`${this.baseUrl}/permission`);
  }

  getPermissionById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/permission/permission/` + Id);
  }
  addPermission(permission: any) {
    return this.httpClient.post(`${this.baseUrl}/permission`, permission);
  }

  updatePermission(permission: any) {
    return this.httpClient.put(`${this.baseUrl}/permission/${permission.Id}`, permission);
  }
  deletePermission(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/permission/${Id}`);
  }
}
