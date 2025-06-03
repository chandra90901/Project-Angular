
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllRoles() {
    return this.httpClient.get(`${this.baseUrl}/role`);
  }

  getRoleById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/role/role/` + Id);
  }

  addRole(role: any, permission: any) {
    return this.httpClient.post(`${this.baseUrl}/role`, { Role: role, Permission: permission });
  }

  updateRole(role: any, permission: any) {
    return this.httpClient.put(`${this.baseUrl}/role/${role.Id}`, { Role: role, Permission: permission });
  }
  deleteRole(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/role/${Id}`);
  }
}
