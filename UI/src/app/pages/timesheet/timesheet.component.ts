import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';
import { Router } from '@angular/router';
import { Timesheet } from '../../models/timesheet';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-timesheet',
  imports: [AdminLayoutComponent, NgIf, CommonModule, FormsModule],
  templateUrl: './timesheet.component.html',
  standalone: true,
  styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  step = 'My Timesheets';
  employees: Employee[] = [];
  private _selectedTimesheetId = '';
  public get selectedTimesheetId() {
    return this._selectedTimesheetId;
  }
  public set selectedTimesheetId(value) {
    this._selectedTimesheetId = value;
  }
  timesheets: Timesheet[] = [];
  reqtimesheets: any[] = [];
  timesheet: any = { _id: '', Date: '', EmployeeId: '', WorkDetails: '', Hours: '', Reason: '', Status: '' };
  messageService: any;
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  userDetail: any
  modal: any
  review: string = '';
  isReviewMode: boolean = false;
  ts: any;

  constructor(private router: Router, private timesheetService: TimesheetService, private empServive: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}')[0];
    this.loadtimesheets();
    this.loadreqtimesheets();
    this.loagEmployees();

  }
  loagEmployees() {
    const subs = this.empServive.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
    })
    this.mySubscription.add(subs);
  }
  loadtimesheets() {
    const subs = this.timesheetService.getMyTimesheets(this.userDetail.EmployeeId).subscribe(
      (data: any) => {
        this.timesheets = data;
      },
      (error) => {
        console.error('Error fetching timesheet:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  loadreqtimesheets() {
    const subs =  this.timesheetService.getReqTimesheets(this.userDetail.EmployeeId).subscribe(
      (data: any) => {
        this.reqtimesheets = data;
      },
      (error) => {
        console.error('Error fetching timesheet:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  open(content: any, editTimesheet?: any): void {
    this.isEditMode = !!editTimesheet;
    this.timesheet = editTimesheet ? { ...editTimesheet } : { _id: '', Date: '', EmployeeId: '', WorkDetails: '', Hours: '', Reason: '', Status: '' };
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
    this.modalService.open(modal, { centered: true }); // Open modal
  }

  confirmDelete(modal: any) {
    if (!this.selectedTimesheetId) return;

    const subs = this.timesheetService.deleteTimesheet(this.selectedTimesheetId).subscribe(
      (response: any) => {
        console.log(response);
        this.timesheets = this.timesheets.filter(ts => ts._id !== this.selectedTimesheetId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'timesheet deleted successfully'
        });

        modal.dismiss(); // Close modal after deletion
        this.selectedTimesheetId = '';
      },
      (error) => {
        console.error('Error deleting timesheet:', error);
      }
    );
    this.mySubscription.add(subs);
  }

  save() {
    if (!this.timesheet.Date || !this.timesheet.WorkDetails || !this.timesheet.Hours) {
      alert('Please enter all required details!');
      return;
    }

    // Ensure EmployeeId is assigned correctly
    if (!this.userDetail?.EmployeeId) {
      alert('User details not found. Please log in again.');
      return;
    }

    this.timesheet.EmployeeId = this.userDetail.EmployeeId;
    this.timesheet.Status = "New";
    let subs
    if (this.isEditMode) {
      // Updating existing timesheetData
       subs = this.timesheetService.updateTimesheet(this.timesheet).subscribe({
        next: () => {
          this.loadtimesheets();
          alert('Timesheet updated successfully');
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating Timesheet:', err)
      });
    } else {
      // Adding new timesheetData
       subs = this.timesheetService.addTimesheet(this.timesheet).subscribe({
        next: () => {
          this.loadtimesheets();  // Load updated timesheetData list
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
    this.timesheet = { ...timesheetData }; // Copy timesheet data to prevent accidental changes
    this.review = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  approveTimesheet(): void {
    if (!this.review) {
      alert('Please enter a reason for approval.');
      return;
    }

    // console.log("Approval Reason:", this.review); // Debugging

    const updatedTimesheet = {
      ...this.timesheet,
      Status: "Approved",
      ApprovedBy: this.userDetail.EmployeeId,
      ApprovedReason: this.review, // Ensure this key matches backend expectations
      ApprovedDate: new Date().toISOString(),
    };

    const subs= this.timesheetService.updateTimesheet(updatedTimesheet).subscribe({
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

    // console.log("Rejection Reason:", this.review); // Debugging

    const updatedTimesheet = {
      ...this.timesheet,
      Status: "Rejected",
      RejectedBy: this.userDetail.EmployeeId,
      RejectedReason: this.review, // Ensure this key matches backend expectations
      RejectedDate: new Date().toISOString(),
    };

    const subs= this.timesheetService.updateTimesheet(updatedTimesheet).subscribe({
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
