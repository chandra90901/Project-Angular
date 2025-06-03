import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  constructor(private httpClient: HttpClient) { }
  getAllSalaries() {
    return this.httpClient.get("http://localhost:3000/api/get-all-salaries");
  }
  addSalary(salary: any) {
    return this.httpClient.post("http://localhost:3000/api/add-salary", salary);
  }
  updateSalary(salary: { _id: string; }) {
    return this.httpClient.patch("http://localhost:3000/api/update-salary/" + salary._id, salary);
  }
  deleteSalary(id: string) {
    return this.httpClient.delete("http://localhost:3000/api/delete-salary/" + id);
  }
}