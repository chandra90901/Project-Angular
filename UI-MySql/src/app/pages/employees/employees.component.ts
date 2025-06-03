import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MastersService } from '../../services/masters.service';
@Component({
  selector: 'app-employees',
  imports: [AdminLayoutComponent, CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  totalItems: number = 0;
  currentPageEmployees: any[] = [];
  pageSizes: number[] = [5, 10, 25, 50];
  mySubscription: Subscription = new Subscription();
  employees: Employee[] = [];
  employee: any = {};
  private Id: any;
  messageService: any;
  selectedEmployeeId: any;
  employeeStatusMaster: any[] = [];
  mastersData: any = [];
  employementTypeMaster: any[] = [];
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private masterService: MastersService
  ) { }
  ngOnInit(): void {
    this.loadMasters();
    this.loadEmp();
  }
  loadMasters() {
    const subs = this.masterService.getAllMasters().subscribe({
      next: (x: any) => {
        this.mastersData = x;
        this.employeeStatusMaster = this.mastersData.filter((x: any) => x.Type === 'Employee Status' && x.Group === 'Employee');
        this.employementTypeMaster = this.mastersData.filter((x: any) => x.Type === 'Employement Type' && x.Group === 'Employee');
      },
      error: (err) => console.error('Error fetching masters', err),
    });
    this.mySubscription.add(subs);
  }
  getEmployeeStatus(id: number): string {
    const status = this.employeeStatusMaster.find(x => x.Id === id);
    return status ? status.Data : '';
  }
  getEmployementType(id: number): string {
    const status = this.employementTypeMaster.find(x => x.Id === id);
    return status ? status.Data : '';
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadEmp();
  }
  updateCurrentPageEmployees(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageEmployees = this.employees.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageEmployees();
  }
  loadEmp() {
    const subs = this.employeeService.getAllEmployees().subscribe({
      next: (x: any) => {
        this.employees = x;
        this.totalItems = this.employees.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageEmployees = this.employees.slice(start, end);
      },
      error: (err) => console.error('Error fetching employees', err),
    });
    this.mySubscription.add(subs);
  }
  calculateTotalPages(): void {
    const totalEmployees = this.employees.length;
    const totalPages = Math.ceil(totalEmployees / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewEmployeeForm() {
    this.router.navigateByUrl('/employee-form');
  }
  EditEmployee(id: any) {
    console.log('Editing Employee ID:', id);
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/employee-form'], navigationExtras);
  }
  openDeleteModal(modal: any, EmployeeId: string) {
    this.selectedEmployeeId = EmployeeId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedEmployeeId) return;
    let subs = this.employeeService.deleteEmployee(this.selectedEmployeeId).subscribe(
      (response: any) => {
        console.log(response);
        this.employees = this.employees.filter((emp) => emp.Id !== this.selectedEmployeeId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee deleted successfully',
        });
        modal.dismiss();
        this.selectedEmployeeId = '';
        this.loadEmp();
      },
      (error) => {
        console.error('Error deleting Employee:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
