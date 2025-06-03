import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterGroupService {

  constructor(private httpClient : HttpClient) { }
       
       getAllMasterGroup(){
         return this.httpClient.get("http://localhost:3000/api/get-all-mastergroup");
       }
     
       addMasterGroup(masterGroup: any){
         return this.httpClient.post("http://localhost:3000/api/add-mastergroup",masterGroup);
       }
   
       updateMasterGroup(masterGroup: { _id: string; }){
         return this.httpClient.patch("http://localhost:3000/api/update-mastergroup/"+masterGroup._id,masterGroup);
       }
       deleteMasterGroup(id: string){
         return this.httpClient.delete("http://localhost:3000/api/delete-mastergroup/"+id);
       }
     }