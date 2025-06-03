import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {


  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllTimesheets() {
    return this.httpClient.get(`${this.baseUrl}/timesheet`);
  }

  getTimesheetById(id: any) {
    return this.httpClient.get(`${this.baseUrl}/timesheet/${id}`);
  }

  addTimesheet(timesheet: any) {
    return this.httpClient.post(`${this.baseUrl}/timesheet`, timesheet);
  }

  updateTimesheet(timesheet: any) {
    return this.httpClient.put(`${this.baseUrl}/timesheet/${timesheet.Id}`, timesheet);
  }
  deleteTimesheet(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/timesheet/${id}`);
  }

  getMyTimesheets(empId: any) {
    return this.httpClient.get(`${this.baseUrl}/timesheet/mytimesheet/${empId}`);
  }
  getReqTimesheets(mrgId: any) {
    return this.httpClient.get(`${this.baseUrl}/timesheet/reqtimesheets/${mrgId}`);
  }
}



