import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private httpClient: HttpClient) { }

  getAllLeaves() {
    return this.httpClient.get("http://localhost:3000/api/get-all-leaves");
  }

  getLeaveById(id: any) {
    return this.httpClient.get("http://localhost:3000/api/get-one-leave/" + id);
  }

  addLeave(leave: any) {
    return this.httpClient.post("http://localhost:3000/api/add-leave", leave);
  }

  updateLeave(leave: any) {
    return this.httpClient.patch("http://localhost:3000/api/update-leave/" + leave._id, leave);
  }
  deleteLeave(id: string) {
    return this.httpClient.delete("http://localhost:3000/api/delete-leave/" + id);
  }
  getMyLeaves(empId:any) {
    return this.httpClient.get("http://localhost:3000/api/get-myleaves/"+empId);
  }
  getReqLeaves(empId:any) {
    return this.httpClient.get("http://localhost:3000/api/get-requested-leaves/"+empId);
  }
}


