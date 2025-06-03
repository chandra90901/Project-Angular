import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

constructor(private httpClient : HttpClient) { }
    
    getAllUsers(){
      return this.httpClient.get("http://localhost:3000/api/get-all-users");
    }

    getUserById(id:any){
      return this.httpClient.get("http://localhost:3000/api/get-one-user/"+id);
    }
  
    addUser(user: any){
      return this.httpClient.post("http://localhost:3000/api/add-user",user);
    }

    updateUser(user: any){
      return this.httpClient.patch("http://localhost:3000/api/update-user/"+user._id,user);
    }
    deleteUser(id: string){
      return this.httpClient.delete("http://localhost:3000/api/delete-user/"+id);
    }
  }