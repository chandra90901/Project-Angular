import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  
    constructor(private httpClient : HttpClient) { }
    
    getAllMasters(){
      return this.httpClient.get("http://localhost:3000/api/get-all-masters");
    }
  
    addMasters(masters: any){
      return this.httpClient.post("http://localhost:3000/api/add-masters",masters);
    }

    updateMasters(masters: { _id: string; }){
      return this.httpClient.patch("http://localhost:3000/api/update-masters/"+masters._id,masters);
    }
    deleteMasters(id: string){
      return this.httpClient.delete("http://localhost:3000/api/delete-masters/"+id);
    }
  }
  
