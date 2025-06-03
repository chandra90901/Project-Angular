import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService{

constructor(private httpClient : HttpClient) { }
    
    getAllCandidate(){
      return this.httpClient.get("http://localhost:3000/api/get-all-candidate");
    }

    getCandidateById(id:any){
      return this.httpClient.get("http://localhost:3000/api/get-one-candidate/"+id);
    }
  
    addCandidate(candidate: any){
      return this.httpClient.post("http://localhost:3000/api/add-candidate",candidate);
    }

    updateCandidate(candidate: any){
      return this.httpClient.patch("http://localhost:3000/api/update-candidate/"+candidate._id,candidate);
    }
    deleteCandidate(id: string){
      return this.httpClient.delete("http://localhost:3000/api/delete-candidate/"+id);
    }
  }