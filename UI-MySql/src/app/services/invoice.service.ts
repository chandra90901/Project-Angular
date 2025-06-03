import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
 
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllInvoices() {
    return this.httpClient.get(`${this.baseUrl}/invoice`);
  }

  createInvoice(invoiceData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/invoice`, invoiceData);
  }

  getInvoiceById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/invoice/` + Id);
  }
  
  addInvoice(invoice: any) {
    return this.httpClient.post(`${this.baseUrl}/invoice`, invoice);
  }

  updateInvoice(invoice: any) {
    return this.httpClient.put(`${this.baseUrl}/invoice/${invoice.Id}`, invoice);
  }

  deleteInvoice(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/invoice/${Id}`);
  }
}

