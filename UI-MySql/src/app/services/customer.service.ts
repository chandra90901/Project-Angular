import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllCustomers() {
    return this.httpClient.get(`${this.baseUrl}/customer`);
  }

  getCustomerById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/customer/${Id}`);
  }

  addCustomer(customer: any) {
    return this.httpClient.post(`${this.baseUrl}/customer`, customer);
  }

  updateCustomer(customer: any) {
    return this.httpClient.put(`${this.baseUrl}/customer/${customer.Id}`, customer);
  }
  deleteCustomer(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/customer/${Id}`);
  }
}
