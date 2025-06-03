import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getAllAttendances() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllEmployees() {
    return this.httpClient.get(`${this.baseUrl}/employee`);
  }

  getEmployeeById(Id: any) {
    console.log(`Fetching employee with ID: ${Id}`);
    console.log(`Full API URL: ${this.baseUrl}/employee/${Id}`);
    return this.httpClient.get(`${this.baseUrl}/employee/` + Id);
  }
  addEmployee(employee: any) {
    return this.httpClient.post(`${this.baseUrl}/employee`, employee);
  }

  updateEmployee(employee: any) {
    return this.httpClient.put(`${this.baseUrl}/employee/${employee.Id}`, employee);
  }
  deleteEmployee(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/employee/${Id}`);
  }
}