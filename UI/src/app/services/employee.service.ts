import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getAllAttendances() {
    throw new Error('Method not implemented.');
  }

constructor(private httpClient : HttpClient) { }
    
    getAllEmployees(){
      return this.httpClient.get("http://localhost:3000/api/get-all-employees");
    }

    getEmployeeById(id:any){
      return this.httpClient.get("http://localhost:3000/api/get-one-employee/"+id);
    }
  
    addEmployee(employee: any){
      return this.httpClient.post("http://localhost:3000/api/add-employee",employee);
    }

    updateEmployee(employee: any){
      return this.httpClient.patch("http://localhost:3000/api/update-employee/"+employee._id,employee);
    }
    deleteEmployee(id: string){
      return this.httpClient.delete("http://localhost:3000/api/delete-employee/"+id);
    }
  }