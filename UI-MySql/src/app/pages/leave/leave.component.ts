import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { LeaveService } from '../../services/leave.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { MastersService } from '../../services/masters.service';
import { Leave } from '../../models/leave';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
@Component({
  selector: 'app-leave',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule,NgIf],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  reqPageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  reqTotalpages: number[] = [];
  reqcurrentPage: number = 1;
  myLeavesTotalItems: number = 0;
  currentPageLeaves: any[] = [];
  myLeavespageSizes: number[] = [5, 10, 25, 50];
  reqLeavesTotalItems: number = 0;
  reqLeavespageSizes: number[] = [5, 10, 25, 50];
  currentPageReqLeaves: any[] = [];
  mySubscription: Subscription = new Subscription();
  messageService: any;
  step = 'My Leaves';
  employees: Employee[] = [];
  selectedLeaveId = ''
  leaveEmp: Employee[] = [];
  leaves: Leave[] = [];
  reqleaves: Leave[] = [];
  leave: any = { Id: '', LeaveTypeId: 0, EmployeeId: 0, EmployeeName: '', FromDate: '', FromDateHalfDay: '', ToDate: '', ToDateHalfDay: '', Reason: '', Status: '' };
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  userDetail: any
  leaveTypeMaster: any
  masterData: any = []
  modal: any
  review: string = '';
  isReviewMode: boolean = false;
  lv: any;

  leaveForm=new FormGroup({
formDate:new FormControl('',[Validators.required]),
fromDateHalfDay:new FormControl('',[Validators.required]),
toDate:new FormControl('',[Validators.required]),
toDateHalfDay:new FormControl('',[Validators.required]),
reason:new FormControl('',[Validators.required]),

  })
  constructor(private router: Router,
    private leaveService: LeaveService,
    private empService: EmployeeService,
    private modalService: NgbModal,
    private masterService: MastersService
  ) { }
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.loadLeaves();
    this.loadReqLeaves();
    this.loadEmployees();
    this.getLeaveType();
  }
  onMyLeavesPageSizeChange(PageSize: number) {
    this.pageSize = PageSize;
    this.currentPage = 1;
    this.loadLeaves();
  }
  onReqLeavesPageSizeChange(reqPageSize: number) {
    this.reqPageSize = reqPageSize;
    this.reqcurrentPage = 1;
    this.loadReqLeaves();
  }
  updateCurrentPageLeaves(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageLeaves = this.leaves.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageLeaves();
  }
  updateCurrentPageReqLeaves(): void {
    const start = (this.reqcurrentPage - 1) * this.reqPageSize;
    const end = start + this.reqPageSize;
    this.currentPageReqLeaves = this.reqleaves.slice(start, end);
  }
  goToreqPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.reqTotalpages.length) return;
    this.reqcurrentPage = page;
    this.updateCurrentPageReqLeaves();
  }
  loadEmployees() {
    const subs = this.empService.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
    })
    this.mySubscription.add(subs);
  }
  loadLeaves() {
    const subs = this.leaveService.getMyLeaves(this.userDetail.EmployeeId).subscribe(
      (data: any) => {
        this.leaves = data;
        this.myLeavesTotalItems = this.leaves.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageLeaves = this.leaves.slice(start, end);
        this.leaves.forEach((x: any) => {
          x.ToDate = new Date(x.ToDate);
          x.FromDate = new Date(x.FromDate);
          const formatDate = (date: Date) => {
            return date.toISOString().split('T')[0];
          };
          x.ToDate = formatDate(x.ToDate);
          x.FromDate = formatDate(x.FromDate);
        });
      },
      (error) => {
        console.error('Error fetching leaves:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  calculateTotalPages(): void {
    const totalEmployees = this.leaves.length;
    const totalPages = Math.ceil(totalEmployees / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  loadReqLeaves() {
    const subs = this.leaveService.getReqLeaves(this.userDetail.EmployeeId).subscribe(
      (data: any) => {
        this.reqleaves = data;
        this.reqLeavesTotalItems = this.reqleaves.length;
        this.calculatereqTotalpagess();
        const start = (this.reqcurrentPage - 1) * this.reqPageSize;
        const end = start + this.reqPageSize;
        this.currentPageReqLeaves = this.reqleaves.slice(start, end);
      },
      (error) => {
        console.error('Error fetching leaves:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  calculatereqTotalpagess(): void {
    const totalEmployees = this.reqleaves.length;
    const reqTotalpages = Math.ceil(totalEmployees / this.reqPageSize);
    this.reqTotalpages = Array.from({ length: reqTotalpages }, (_, index) => index + 1);
  }
  open(content: any, editLeave?: any): void {
    this.isEditMode = !!editLeave;
    this.leave = editLeave ? editLeave : { LeaveType: '', EmployeeId: '', EmployeeName: '', FromDate: '', FromDateHalfDay: '', ToDate: '', ToDateHalfDay: '', Reason: '', Status: '' };
    this.leaveForm.patchValue({
      formDate:this.leave.FromDate,
      fromDateHalfDay:this.leave.FromDateHalfDay,
      toDate:this.leave.ToDate,
      toDateHalfDay:this.leave.ToDateHalfDay,
      reason:this.leave.Reason
  })
    this.calculateTotalDays()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  myLeave() {
    this.step = 'myLeave';
  }
  requestLeave() {
    this.step = 'requestLeave';
  }
  getLeaveType() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.leaveTypeMaster = this.masterData.filter((x: any) => x.Type == 'Leave Type' && x.Group === 'Leave');
    })
    this.mySubscription.add(subs);
  }
  EditLeave(content: any, lv: Leave) {
    this.isEditMode = true;
    this.open(content, lv);
  }
  cancel() {
    this.modalService.dismissAll();
  }
  openDeleteModal(modal: any, leaveId: string) {
    this.selectedLeaveId = leaveId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedLeaveId) return;
    const subs = this.leaveService.deleteLeave(this.selectedLeaveId).subscribe(
      (response: any) => {
        console.log(response);
        this.leaves = this.leaves.filter(lv => lv.Id !== this.selectedLeaveId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Leave deleted successfully'
        });
        modal.dismiss();
        this.selectedLeaveId = '';
      },
      (error) => {
        console.error('Error deleting leave:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  save() {
    // if (!this.leave.FromDate || !this.leave.ToDate) {
    if(!this.leaveForm.valid){
      this.leaveForm.markAllAsTouched();
      alert('Please enter all required details!');
      return;
    }
    const formValues = this.leaveForm.value;
    this.leave={
      ...this.leave,
      FromDate:formValues.formDate,
      FromDateHalfDay:formValues.fromDateHalfDay,
      ToDate:formValues.toDate,
      ToDateHalfDay:formValues.toDateHalfDay,
      Reason:formValues.reason
    }
    let subs
    this.leave.EmployeeId = this.userDetail.EmployeeId
    this.leave.LeaveTypeId =Number( this.leave.LeaveTypeId)
    if (this.isEditMode) {
      subs = this.leaveService.updateLeave(this.leave).subscribe({
        next: () => {
          this.loadLeaves();
          alert('Leave updated successfully');
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating Leave:', err)
      });
    } else {
      this.leave.Status = "New";
      subs = this.leaveService.addLeave(this.leave).subscribe({
        next: () => {
          this.loadLeaves();
          alert('Leave saved successfully');
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error adding leave:', err)
      });
    }
    this.mySubscription.add(subs);
  }
  
  ReviewLeave(content: any, leaveData: any): void {
    this.isReviewMode = true;
    this.leave = { ...leaveData };
    this.review = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  approveLeave(): void {
    if (!this.review) {
      alert('Please enter a reason for approval.');
      return;
    }
    const updatedLeave = {
      ...this.leave,
      Status: "Approved",
      ApprovedBy: this.userDetail.EmployeeId,
      ApprovedReason: this.review,
      ApprovedDate: new Date().toISOString(),
    };
    const subs = this.leaveService.updateLeave(updatedLeave).subscribe({
      next: () => {
        alert('Leave Approved Successfully');
        this.loadReqLeaves();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Error approving leave:', err)
    });
    this.mySubscription.add(subs);
  }
  rejectLeave(): void {
    if (!this.review) {
      alert('Please enter a reason for rejection.');
      return;
    }
    const updatedLeave = {
      ...this.leave,
      Status: "Rejected",
      RejectedBy: this.userDetail.EmployeeId,
      RejectedReason: this.review,
      RejectedDate: new Date().toISOString(),
    };
    const subs = this.leaveService.updateLeave(updatedLeave).subscribe({
      next: () => {
        alert('Leave Rejected Successfully');
        this.loadReqLeaves();
        this.modalService.dismissAll();
      },
      error: (err) => console.error('Error rejecting leave:', err)
    });
    this.mySubscription.add(subs);
  }
  calculateTotalDays() {
    const fromDate = new Date(this.leave.FromDate);
    const toDate = new Date(this.leave.ToDate);
    if (!fromDate || !toDate || fromDate > toDate) {
      this.leave.calculateTotalDays = 0;
      return;
    }
    let totalDays = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24) + 1;
    if (this.leave.FromDateHalfDay && this.leave.ToDateHalfDay) {
      totalDays = totalDays * 0.5;
    } else if (this.leave.FromDateHalfDay || this.leave.ToDateHalfDay) {
      totalDays = totalDays - 0.5;
    }
    this.leave.calculateTotalDays = totalDays;
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}


