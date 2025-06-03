import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessSetupService {

  constructor(private httpClient: HttpClient) { }

  getAllBusinessSetups() {
    return this.httpClient.get("http://localhost:3000/api/get-all-businessSetups");
  }

  getBusinessSetupById(id: any) {
    return this.httpClient.get("http://localhost:3000/api/get-one-businessSetup/" + id);
  }

  addBusinessSetup(businessSetup: any) {
    return this.httpClient.post("http://localhost:3000/api/add-businessSetup", businessSetup);
  }

  updateBusinessSetup(businessSetup: { _id: string; }) {
    return this.httpClient.patch("http://localhost:3000/api/update-businessSetup/" + businessSetup._id, businessSetup);
  }
  deleteBusinessSetup(id: string) {
    return this.httpClient.delete("http://localhost:3000/api/delete-businessSetup/" + id);
  }
}