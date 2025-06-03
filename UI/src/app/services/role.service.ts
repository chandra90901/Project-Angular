import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getAllRoles() {
    return this.httpClient.get("http://localhost:3000/api/get-all-roles");
  }
  addRole(role: any) {
    return this.httpClient.post("http://localhost:3000/api/add-role", role);
  }
  updateRole(role: { _id: string; }) {
    return this.httpClient.patch("http://localhost:3000/api/update-role/" + role._id, role);
  }
  deleteRole(id: string) {
    return this.httpClient.delete("http://localhost:3000/api/delete-role/" + id);
  }
}

