import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees',
  imports: [AdminLayoutComponent, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  employees: Employee[] = [];
  employee: any = {
    _id: '' 
  };

private _id: any;
messageService: any;
  selectedEmployeeId: any;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadEmp();
  }

  loadEmp() {
    const subs = this.employeeService.getAllEmployees().subscribe({
      next: (x: any) => {
        this.employees = x;
        console.log('Loaded employees:', this.employees); // Debug log
      },
      error: (err) => console.error('Error fetching employees', err),
    });
    this.mySubscription.add(subs);
  }

  AddNewEmployeeForm() {
    this.router.navigateByUrl('/employee-form');
  }

  EditEmployee(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/employee-form'], navigationExtras);
  }

  openDeleteModal(modal: any, EmployeeId: string) {
    this.selectedEmployeeId = EmployeeId;
    this.modalService.open(modal, { centered: true }); // Open modal
  }

  confirmDelete(modal:any) {
    // alert('Are you sure youe want to delete Employee')
    if (!this.selectedEmployeeId) return;
    let subs = this.employeeService.deleteEmployee(this.selectedEmployeeId).subscribe(
      (response: any) => {
        console.log(response); // Log the raw response
        this.employees = this.employees.filter((emp) => emp._id !== this.selectedEmployeeId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee deleted successfully', // Display the response message

        });
        modal.dismiss();
        this.selectedEmployeeId='';
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

