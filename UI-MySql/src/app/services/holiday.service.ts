import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllHolidays() {
    return this.httpClient.get(`${this.baseUrl}/holiday`);
  }

  getHolidayById(Id: number) {
    return this.httpClient.get(`${this.baseUrl}/holiday/` + Id);
  }

  addHoliday(holiday: any) {
    return this.httpClient.post(`${this.baseUrl}/holiday`, holiday);
  }

  updateHoliday(holiday: any) {
    return this.httpClient.put(`${this.baseUrl}/holiday/${holiday.Id}`, holiday);
  }

  deleteHoliday(Id: string) {
    return this.httpClient.delete(`${this.baseUrl}/holiday/${Id}`);
  }

  getHolidays(empId: any) {
    return this.httpClient.get(`${this.baseUrl}/holiday/${empId}`);
  }
  
}
