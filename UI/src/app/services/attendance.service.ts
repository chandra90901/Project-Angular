import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) { }

  getAllAttendances() {
    return this.httpClient.get("http://localhost:3000/api/get-all-attendances");
  }

  getAttendanceById(id: any) {
    return this.httpClient.get("http://localhost:3000/api/get-one-attendance/" + id);
  }

  addAttendance(attendance: any) {
    return this.httpClient.post("http://localhost:3000/api/add-attendance", attendance);
  }

  updateAttendance(attendance: any) {
    return this.httpClient.patch("http://localhost:3000/api/update-attendance/" + attendance._id, attendance);
  }
  deleteAttendance(id: string) {
    return this.httpClient.delete("http://localhost:3000/api/delete-attendance/" + id);
  }
  getMyAttendances(empId:any) {
    return this.httpClient.get("http://localhost:3000/api/get-myattendances/"+empId);
  }
  getReqAttendances(empId:any) {
    return this.httpClient.get("http://localhost:3000/api/get-requested-attendances/"+empId);
  }
}


