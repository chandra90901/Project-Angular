import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferletterService {
 

constructor(private httpClient : HttpClient) { }
    
    getAllOfferletters(){
      return this.httpClient.get("http://localhost:3000/api/get-all-offerletters");
    }

    getEmployeeById(id:any){
      return this.httpClient.get("http://localhost:3000/api/get-one-offerletter/"+id);
    }
  
    addOfferletter(offerletter: any){
      return this.httpClient.post("http://localhost:3000/api/add-offerletter",offerletter);
    }

    updateOfferletter(offerletter: any){
      return this.httpClient.patch("http://localhost:3000/api/update-offerletter/"+offerletter._id,offerletter);
    }
    deleteOfferletter(id: string){
      return this.httpClient.delete("http://localhost:3000/api/delete-offerletter/"+id);
    }
  }