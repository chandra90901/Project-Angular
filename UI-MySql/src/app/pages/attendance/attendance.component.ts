import { Component, signal, OnInit, WritableSignal, OnDestroy } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-attendance',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageAttendances: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  mySubscription: Subscription = new Subscription();
  employees: Employee[] = [];
  employee: any = {};
  step = 'My Attendances';
  Attendances: Attendance[] = [];
  selectedAttendanceId = ''
  attendances: Attendance[] = [];
  reqattendances: Attendance[] = [];
  attendance: any = { Id: '', Date: '', EmployeeId: '', InTime: '', OutTime: '', Reason: '', Status: '' };
  messageService: any;
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  userDetail: any
  modal: any
  review: string = '';
  isReviewMode: boolean = false;
  at: any;
  reqpageSize: number = 10;
  reqcurrentPage: number = 1;
  reqtotalPages: number[] = [];
  reqcurrentPageAttendance: any[] = [];
  userDetails: any;
  reqpageSizes: number[] = [5, 10, 25, 50];
  reqtotalItems: number = 0;
  rejectattendance: any;
  attendanceForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    inTime: new FormControl('', [Validators.required]),
    outTime: new FormControl('', [Validators.required])
  });
  constructor(private router: Router,
    private attendanceService: AttendanceService,
    private empServive: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.loadAttendances();
    this.loadReqattendances();
    this.loadEmployees();
  }
  loadEmployees() {
    const subs = this.empServive.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
    })
    this.mySubscription.add(subs);
  }
  loadAttendances() {
    const subs = this.attendanceService.getMyAttendance(this.userDetails.EmployeeId).subscribe(
      (data: any) => {
        this.attendances = data;
        this.totalItems = this.attendances.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageAttendances = this.attendances.slice(start, end);
      },
      (error) => {
        console.error('Error fetching attendances:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadAttendances();
  }
  updateCurrentPageAttendence(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageAttendances = this.attendances.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageAttendence();
  }
  calculateTotalPages(): void {
    const totalAttendances = this.attendances.length;
    const totalPages = Math.ceil(totalAttendances / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  loadReqattendances() {
    const subs = this.attendanceService.getReqAttendance(this.userDetails.EmployeeId).subscribe(
      (data: any) => {
        this.reqattendances = data;
        this.reqtotalItems = this.reqattendances.length;
        this.calculateTotalreqPages();
        const start = (this.reqcurrentPage - 1) * this.reqpageSize;
        const end = start + this.reqpageSize;
        this.reqcurrentPageAttendance = this.reqattendances.slice(start, end);

        console.log('Loaded req attendances:', this.reqattendances);
      },
      (error) => {
        console.error('Error fetching req attendances:', error);
      }
    );
    this.mySubscription.add(subs);
  }

  calculateTotalreqPages(): void {
    const totalreqAttendances = this.reqattendances.length;
    const reqtotalPagesCount = Math.ceil(totalreqAttendances / this.reqpageSize);
    this.reqtotalPages = Array.from({ length: reqtotalPagesCount }, (_, index) => index + 1);
  }

  updatecurrentPageReqAttendances(): void {
    const start = (this.reqcurrentPage - 1) * this.reqpageSize;
    const end = start + this.reqpageSize;
    this.reqcurrentPageAttendance = this.reqattendances.slice(start, end);
  }

  reqgoToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.reqtotalPages.length) return;
    this.reqcurrentPage = page;
    this.updatecurrentPageReqAttendances();
  }
  open(content: any, editAttendance?: any): void {
    this.isEditMode = !!editAttendance;
    if (editAttendance) {
      this.attendance = { ...editAttendance };
      if (this.attendance.Date) {
        const DateObj = new Date(this.attendance.Date);
        this.attendance.Date = DateObj.toISOString().substring(0, 10);
      }
      this.attendanceForm.patchValue({
        date: this.attendance.Date,
        inTime: this.attendance.InTime,
        outTime: this.attendance.OutTime
      });
    } else {
      this.attendance = { Date: '', InTime: '', OutTime: '', Status: '', Reason: '', EmployeeId: '', };
      this.attendanceForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  myAttendance() {
    this.step = 'myAttendance';
  }
  requestAttendance() {
    this.step = 'requestAttendance';
  }
  EditAttendance(content: any, at: Attendance) {
    this.isEditMode = true;
    this.attendance = { ...at };
    this.open(content, at);
  }
  cancel() {
    this.modalService.dismissAll();
  }
  openDeleteModal(modal: any, attendanceId: string) {
    this.selectedAttendanceId = attendanceId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedAttendanceId) return;
    const subs = this.attendanceService.deleteAttendance(this.selectedAttendanceId).subscribe(
      (response: any) => {
        console.log(response);
        this.attendances = this.attendances.filter(at => at.Id !== this.selectedAttendanceId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Attendance deleted successfully'
        });
        modal.dismiss();
        this.selectedAttendanceId = '';
        this.loadAttendances();
      },
      (error) => {
        console.error('Error deleting attendance:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  save() {
    // if (!this.attendance.Date || !this.attendance.InTime) {
    if (!this.attendanceForm.valid) {
      this.attendanceForm.markAllAsTouched();
      alert('Please enter all required details!');
      return;
    }
    const formValues = this.attendanceForm.value;
    this.attendance = {
      ...this.attendance,
      Date: formValues.date,
      InTime: formValues.inTime,
      OutTime: formValues.outTime
    }
    let subs
    this.attendance.EmployeeId = this.userDetails.EmployeeId;
    if (this.isEditMode) {
      subs = this.attendanceService.updateAttendance(this.attendance).subscribe({
        next: () => {
          this.loadAttendances();
          alert('Attendance updated successfully');
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating attendance:', err)
      });
    } else {
      this.attendance.Status = "New"
      subs = this.attendanceService.addAttendance(this.attendance).subscribe({
        next: () => {
          this.loadAttendances();
          console.log('loadattendances');
          alert('Attendance saved successfully');
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error adding attendance:', err)
      });
      this.mySubscription.add(subs);
    }
  }
  ReviewAttendance(content: any, attendanceData: any): void {
    this.isReviewMode = true;
    this.attendance = { ...attendanceData };
    this.review = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  approveAttendance(): void {
    if (!this.review) {
      alert('Please enter a reason for approval.');
      return;
    }
    const updatedAttendance = {
      ...this.attendance,
      Status: "Approved",
      ApprovedBy: this.userDetail.EmployeeId,
      ApprovedReason: this.review,
      ApprovedDate: new Date().toISOString(),
    };
    const subs = this.attendanceService.updateAttendance(updatedAttendance).subscribe({
      next: () => {
        alert('Attendance Approved Successfully');
        this.loadReqattendances();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Error approving attendance:', err)
    });
    this.mySubscription.add(subs);
  }
  rejectAttendance(): void {
    if (!this.review) {
      alert('Please enter a reason for rejection.');
      return;
    }
    const updatedAttendance = {
      ...this.attendance,
      Status: "Rejected",
      RejectedBy: this.userDetail.EmployeeId,
      RejectedReason: this.review,
      RejectedDate: new Date().toISOString(),
    };
    const subs = this.attendanceService.updateAttendance(updatedAttendance).subscribe({
      next: () => {
        alert('Attendance Rejected Successfully');
        this.loadReqattendances();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Error rejecting attendance:', err)
    });
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}