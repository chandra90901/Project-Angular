import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient : HttpClient) { }
      
      getAllCustomers(){
        return this.httpClient.get("http://localhost:3000/api/get-all-customers");
      }
  
      getCustomerById(id:any){
        return this.httpClient.get("http://localhost:3000/api/get-one-customer/"+id);
      }
    
      addCustomer(customer: any){
        return this.httpClient.post("http://localhost:3000/api/add-customer",customer);
      }
  
      updateCustomer(customer:any){
        return this.httpClient.patch("http://localhost:3000/api/update-customer/"+customer._id,customer);
      }
      deleteCustomer(id: string){
        return this.httpClient.delete("http://localhost:3000/api/delete-customer/"+id);
      }
      getAllCustomersByEntityType(et: string){
        return this.httpClient.get("http://localhost:3000/api/get-customers-entity-type/"+et);
      }
      getAllCustomersByState(st: string){
        return this.httpClient.get("http://localhost:3000/api/get-customers-state-type/"+st);
      }
    }
