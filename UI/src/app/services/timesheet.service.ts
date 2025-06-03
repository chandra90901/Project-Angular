import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private httpClient: HttpClient) { }

  getAllTimesheets() {
    return this.httpClient.get("http://localhost:3000/api/get-all-timesheets");
  }

  getTimesheetById(id: any) {
    return this.httpClient.get("http://localhost:3000/api/get-one-timesheet/" + id);
  }

  addTimesheet(timesheet: any) {
    return this.httpClient.post("http://localhost:3000/api/add-timesheet", timesheet);
  }

  updateTimesheet(timesheet: any) {
    return this.httpClient.patch("http://localhost:3000/api/update-timesheet/" + timesheet._id, timesheet);
  }
  deleteTimesheet(id: string) {
    return this.httpClient.delete("http://localhost:3000/api/delete-timesheet/" + id);
  }
  getMyTimesheets(empId: any) {
    return this.httpClient.get("http://localhost:3000/api/get-mytimesheets/" + empId);
  }
  getReqTimesheets(empId: any) {
    return this.httpClient.get("http://localhost:3000/api/get-requested-timesheets/" + empId);
  }
}
