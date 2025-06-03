import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterTypeService {

 constructor(private httpClient : HttpClient) { }
     
     getAllMasterType(){
       return this.httpClient.get("http://localhost:3000/api/get-all-mastertype");
     }
   
     addMasterType(masterType: any){
       return this.httpClient.post("http://localhost:3000/api/add-mastertype",masterType);
     }
 
     updateMasterType(masterType: { _id: string; }){
       return this.httpClient.patch("http://localhost:3000/api/update-mastertype/"+masterType._id,masterType);
     }
     deleteMasterType(id: string){
       return this.httpClient.delete("http://localhost:3000/api/delete-mastertype/"+id);
     }
   }
   
 

