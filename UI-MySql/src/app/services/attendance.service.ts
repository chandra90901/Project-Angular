import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  getAttendances() {
    throw new Error('Method not implemented.');
  }

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllAttendances() {
    return this.httpClient.get(`${this.baseUrl}/attendance`);
  }

  getAttendanceById(id: any) {
    return this.httpClient.get(`${this.baseUrl}/attendance/${id}`);
  }

  addAttendance(attendance: any) {
    return this.httpClient.post(`${this.baseUrl}/attendance`, attendance);
  }

  updateAttendance(attendance: any) {
    return this.httpClient.put(`${this.baseUrl}/attendance/${attendance.Id}`, attendance);
  }
  deleteAttendance(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/attendance/${id}`);
  }
  getMyAttendance(empId:any) {
    return this.httpClient.get(`${this.baseUrl}/attendance/myattendance/${empId}`);
  }
  getReqAttendance(mgrId: any) {
    return this.httpClient.get(`${this.baseUrl}/attendance/reqattendance/${mgrId}`);
  }
}


