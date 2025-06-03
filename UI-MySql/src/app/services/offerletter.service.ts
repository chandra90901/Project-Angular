import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferletterService {
 
  getEmployeeById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/offerletter/` + Id);
  }
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
 
   getAllOfferLetters() {
     return this.httpClient.get(`${this.baseUrl}/offerletter`);
   }
 
   getOfferLetterById(Id: any) {
     return this.httpClient.get(`${this.baseUrl}/offerletter/offerletter/` + Id);
   }
 
   addOfferLetter(offerletter: any) {
     return this.httpClient.post(`${this.baseUrl}/offerletter`, offerletter);
   }
 
   updateOfferLetter(offerletter: any) {
     return this.httpClient.put(`${this.baseUrl}/offerletter/${offerletter.Id}`, offerletter);
   }

   deleteOfferLetter(Id: string) {
     return this.httpClient.delete(`${this.baseUrl}/offerletter/${Id}`);
   }
   createOfferLetter(offerDetails: any) {
    return this.httpClient.put(`${this.baseUrl}/offerletter/${offerDetails.Id}`, offerDetails);
   }
}
