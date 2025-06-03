import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

 private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllLeaves() {
    return this.httpClient.get(`${this.baseUrl}/leave`);
  }

  getLeaveById(id: any) {
    return this.httpClient.get(`${this.baseUrl}/leave/leave/` + id);
  }

  addLeave(leave: any) {
    return this.httpClient.post(`${this.baseUrl}/leave`, leave);
  }

  updateLeave(leave: any) {
    return this.httpClient.put(`${this.baseUrl}/leave/${leave.Id}`, leave);
  }
  deleteLeave(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/leave/${id}`);
  }
  getMyLeaves(empId:any) {
    return this.httpClient.get(`${this.baseUrl}/leave/myleave/${empId}`);
  }
  getReqLeaves(mrgId:any) {
    
    return this.httpClient.get(`${this.baseUrl}/leave/reqleaves/${mrgId}`);
  }
}


