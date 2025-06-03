import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

private baseUrl = environment.apiUrl;

constructor(private httpClient : HttpClient) { }
    
    getAllUsers(){
      return this.httpClient.get(`${this.baseUrl}/user`);
    }

    getUserById(Id:any){
      return this.httpClient.get(`${this.baseUrl}/user/`+Id);
    }
  
    addUser(user: any){
      return this.httpClient.post(`${this.baseUrl}/user`,user);
    }

    updateUser(user: any){
      return this.httpClient.put(`${this.baseUrl}/user/${user.Id}`,user);
    }
    deleteUser(Id: string){
      return this.httpClient.delete(`${this.baseUrl}/user/${Id}`);
    }
  }