import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService{

  private baseUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }
    
  getAllCandidates(){
    return this.httpClient.get(`${this.baseUrl}/candidate`);
  }

  getCandidateById(Id: any) {
    return this.httpClient.get(`${this.baseUrl}/candidate/` + Id);
  }  

  addCandidate(candidate: any){
    return this.httpClient.post(`${this.baseUrl}/candidate`, candidate);
  }

  updateCandidate(candidate: any){
    return this.httpClient.put(`${this.baseUrl}/candidate/${candidate.Id}`, candidate);
  }
  deleteCandidate(Id: string){
    return this.httpClient.delete(`${this.baseUrl}/candidate/${Id}`);
  }

  getAllCandidateHistory(candidateId:number){
    return this.httpClient.get(`${this.baseUrl}/candidatehistory/candidatewise/${candidateId}`);
  }
}