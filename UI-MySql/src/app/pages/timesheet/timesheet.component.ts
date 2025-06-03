import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';
import { Router } from '@angular/router';
import { Timesheet } from '../../models/timesheet';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, } from '@angular/forms';
import { nonNegativeValidator } from '../../validators/hourvalidators';
@Component({
  selector: 'app-timesheet',
  imports: [AdminLayoutComponent, NgIf, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageTimesheets: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  selectedTimesheetId = '';
  step = 'My Timesheets';
  employees: Employee[] = [];
  timesheets: Timesheet[] = [];
  reqtimesheets: any[] = [];
  timesheet: any = {};
  messageService: any;
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  userDetail: any
  modal: any
  review: string = '';
  isReviewMode: boolean = false;
  ts: any;
  reqpageSize: number = 10;
  reqcurrentPage: number = 1;
  reqtotalPages: number[] = [];
  currentPageReqTimesheets: any[] = [];
  reqtotalItems: number = 0;
  reqpageSizes: number[] = [5, 10, 25, 50];
  timesheetForm = new FormGroup({
    txtDate: new FormControl('', [Validators.required]),
    txtHours: new FormControl('', [Validators.required, nonNegativeValidator()]),
    txtWorkdetails: new FormControl('', [Validators.required]),
    txtReason: new FormControl('', [Validators.required])
  });
  constructor(private router: Router,
    private timesheetService: TimesheetService,
    private empServive: EmployeeService,
    private modalService: NgbModal) { }
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.loadtimesheets();
    this.loadreqtimesheets();
    this.loagEmployees();
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadtimesheets();
  }
  updatecurrentPageTimesheets(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageTimesheets = this.timesheets.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updatecurrentPageTimesheets();
  }
  loagEmployees() {
    const subs = this.empServive.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
    })
    this.mySubscription.add(subs);
  }
  loadtimesheets() {
    const subs = this.timesheetService.getAllTimesheets().subscribe({
      next: (x: any) => {
        this.timesheets = x;
        this.totalItems = this.timesheets.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageTimesheets = this.timesheets.slice(start, end);
      },
      error: (err) => console.error('Error fetching timesheets', err),
    });
    this.mySubscription.add(subs);
  }
  updateCurrentPageTimesheets(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageReqTimesheets = this.timesheets.slice(start, end);
  }
  calculateTotalPages(): void {
    const totalTimesheets = this.timesheets.length;
    const totalPages = Math.ceil(totalTimesheets / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  loadreqtimesheets() {
    const subs = this.timesheetService.getReqTimesheets(this.userDetail.EmployeeId).subscribe(
      (data: any) => {
        this.reqtimesheets = data;
        this.reqtotalItems = this.reqtimesheets.length;
        console.log('Requested Timesheets loaded:', this.reqtimesheets);
        this.calculateTotalreqPages();
        const start = (this.reqcurrentPage - 1) * this.reqpageSize;
        const end = start + this.reqpageSize;
        this.currentPageReqTimesheets = this.reqtimesheets.slice(start, end);
      },
      (error) => {
        console.error('Error fetching timesheet:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  updateCurrentPageReqTimesheets(): void {
    const start = (this.reqcurrentPage - 1) * this.reqpageSize;
    const end = start + this.reqpageSize;
    this.currentPageReqTimesheets = this.reqtimesheets.slice(start, end);
  }
  reqgoToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.reqtotalPages.length) return;
    this.reqcurrentPage = page;
    this.updateCurrentPageReqTimesheets();
  }
  calculateTotalreqPages(): void {
    const totalreqTimesheets = this.reqtimesheets.length;
    const reqtotalPages = Math.ceil(totalreqTimesheets / this.reqpageSize);
    this.reqtotalPages = Array.from({ length: reqtotalPages }, (_, index) => index + 1);
  }
  // open(content: any, editTimesheet?: any): void {
  //   this.isEditMode = !!editTimesheet;
  //   this.timesheet = editTimesheet ? { ...editTimesheet } : { Id: '', Date: '', EmployeeId: '', WorkDetails: '', Hours: '', Status: '' };
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  // }

  open(content: any, editTimesheet?: any): void {
    this.isEditMode = !!editTimesheet;
    if (editTimesheet) {
      this.timesheet = { ...editTimesheet };
      if (this.timesheet.Date) {
        const dateObj = new Date(this.timesheet.Date);
        this.timesheet.Date = dateObj.toISOString().substring(0, 10);
      }
      this.timesheetForm.patchValue({
        txtDate: this.timesheet.Date,
        txtHours: this.timesheet.Hours,
        txtWorkdetails: this.timesheet.WorkDetails,
        txtReason: this.timesheet.Reason
      });
    }
    else {
      this.timesheet = { Id: '', Date: '', EmployeeId: '', WorkDetails: '', Hours: '', Rason: '' };
      this.timesheetForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  myTimesheet() {
    this.step = 'myTimesheet';
  }
  requestTimesheet() {
    this.step = 'requestTimesheet';
  }
  EditTimesheet(content: any, ts: Timesheet) {
    this.isEditMode = true;
    this.timesheet = { ...ts };
    this.open(content, ts);
  }
  cancel() {
    this.modalService.dismissAll();
  }
  openDeleteModal(modal: any, timesheetId: string) {
    this.selectedTimesheetId = timesheetId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedTimesheetId) return;
    const subs = this.timesheetService.deleteTimesheet(this.selectedTimesheetId).subscribe(
      (response: any) => {
        console.log(response);
        this.timesheets = this.timesheets.filter(ts => ts.Id !== this.selectedTimesheetId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'timesheet deleted successfully'
        });
        modal.dismiss();
        this.selectedTimesheetId = '';
        this.loadtimesheets();
      },
      (error) => {
        console.error('Error deleting timesheet:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  save() {
    // if (!this.timesheet.Date || !this.timesheet.WorkDetails || !this.timesheet.Hours) {
    if (!this.timesheetForm.valid) {
      this.timesheetForm.markAllAsTouched();
      alert('Please enter all required details!');
      return;
    }
    const formValues = this.timesheetForm.value;
    this.timesheet = {
      ...this.timesheet,
      Date: formValues.txtDate,
      WorkDetails: formValues.txtWorkdetails,
      Hours: formValues.txtHours,
      Reason: formValues.txtReason,
    }
    let subs
    this.timesheet.EmployeeId = this.userDetail.EmployeeId
    if (this.isEditMode) {
      subs = this.timesheetService.updateTimesheet(this.timesheet).subscribe({
        next: () => {
          this.loadtimesheets();
          alert('Timesheet updated successfully');
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating Timesheet:', err)
      });
    } else {
      this.timesheet.Status = "New";
      subs = this.timesheetService.addTimesheet(this.timesheet).subscribe({
        next: () => {
          this.loadtimesheets();
          alert('Timesheet saved successfully');
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error adding timesheet:', err)
      });
    }
    this.mySubscription.add(subs);
  }
  ReviewTimesheet(content: any, timesheetData: any): void {
    this.isReviewMode = true;
    this.timesheet = { ...timesheetData };
    this.review = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  approveTimesheet(): void {
    if (!this.review) {
      alert('Please enter a reason for approval.');
      return;
    }
    const updatedTimesheet = {
      ...this.timesheet,
      Status: "Approved",
      ApprovedBy: this.userDetail.EmployeeId,
      ApprovedReason: this.review,
      ApprovedDate: new Date().toISOString(),
    };
    const subs = this.timesheetService.updateTimesheet(updatedTimesheet).subscribe({
      next: () => {
        alert('Timesheet Approved Successfully');
        this.loadreqtimesheets();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Error approving timesheet:', err)
    });
    this.mySubscription.add(subs);
  }
  rejectTimesheet(): void {
    if (!this.review) {
      alert('Please enter a reason for rejection.');
      return;
    }
    const updatedTimesheet = {
      ...this.timesheet,
      Status: "Rejected",
      RejectedBy: this.userDetail.EmployeeId,
      RejectedReason: this.review,
      RejectedDate: new Date().toISOString(),
    };
    const subs = this.timesheetService.updateTimesheet(updatedTimesheet).subscribe({
      next: () => {
        alert('Timesheet Rejected Successfully');
        this.loadreqtimesheets();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Error rejecting timesheet:', err)
    });
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
