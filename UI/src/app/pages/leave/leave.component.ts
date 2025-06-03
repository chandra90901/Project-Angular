import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
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
@Component({
  selector: 'app-leave',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, NgIf],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();

 step='My Leaves';
 employees: Employee[] = [];
 selectedLeaveId = ''
 leaves: Leave[] = [];
 reqleaves: Leave[] = [];
 leave: any = {_id:'',LeaveType: '',EmployeeId: '', FromDate: '', FromDateHalfDay: '', ToDate: '', ToDateHalfDay: '',Reason: '',Status:''};
 messageService: any;
 closeResult: WritableSignal<string> = signal('');
 isEditMode: boolean = false;
 userDetail:any
 leaveType: any
 masterData:any=[]
 modal: any
 review: string = '';
  
  isReviewMode: boolean=false;
lv: any;

 
 
 
   constructor(private router: Router, private leaveService: LeaveService, private empService: EmployeeService, private modalService: NgbModal,
    private masterService: MastersService
   ) { }
 
   ngOnInit(): void {

    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}')[0];
    this.loadleaves();
    this.loadreqleaves();
    this.loagEmployees();
    this.GetleaveType();
   }
   
  loagEmployees() {
    const subs = this.empService.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
    })
    this.mySubscription.add(subs);
  }
  loadleaves() {
    const subs =this.leaveService.getMyLeaves(this.userDetail.EmployeeId).subscribe(
      (data: any) => {
        this.leaves = data;
      },
      (error) => {
        console.error('Error fetching leaves:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  loadreqleaves() {
    const subs = this.leaveService.getReqLeaves(this.userDetail.EmployeeId).subscribe(
      (data: any) => {
        this.reqleaves = data;
      },
      (error) => {
        console.error('Error fetching leaves:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  open(content: any, leaveData?: any): void {
    this.isEditMode = !!leaveData;
    this.leave = leaveData  ? { ...leaveData  } : { LeaveType: '',EmployeeId: '', FromDate: '', FromDateHalfDay: '', ToDate: '', ToDateHalfDay: '',Reason: '',Status:'' };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  myLeave() {
    this.step = 'myLeave';
  }
  requestLeave() {
    this.step = 'requestLeave';
  }
  GetleaveType() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.leaveType = this.masterData.filter((x: any) => x.Type == 'Leave Type')
    })
    this.mySubscription.add(subs);
  }
   EditLeave(content: any, lv: Leave) {
      this.isEditMode = true;
      this.leave = { ...lv };
      this.open(content, lv);
    }
    cancel() {
      this.modalService.dismissAll();
    }

    openDeleteModal(modal: any, leaveId: string) {
      this.selectedLeaveId = leaveId;
      this.modalService.open(modal, { centered: true }); // Open modal
    }

    confirmDelete(modal: any) {
      if (!this.selectedLeaveId) return;
    
      const subs= this.leaveService.deleteLeave(this.selectedLeaveId).subscribe(
        (response: any) => {
          console.log(response);
          this.leaves = this.leaves.filter(lv => lv._id !== this.selectedLeaveId);
          this.messageService?.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Leave deleted successfully'
          });
    
          modal.dismiss(); // Close modal after deletion
          this.selectedLeaveId = '';
        },
        (error) => {
          console.error('Error deleting leave:', error);
        }
      );
      this.mySubscription.add(subs);
    }
    
    save() {
      if (!this.leave.FromDate || !this.leave.ToDate ) {
        alert('Please enter all required details!');
        return;
      }
      this.leave.EmployeeId= this.userDetail.EmployeeId;
      this.leave.Status = "New"
      if (this.isEditMode) {
       const subs =  this.leaveService.updateLeave(this.leave).subscribe({
          next: () => {
            this.loadleaves();
            this.modalService.dismissAll();
          },
          error: (err) => console.error('Error updating leave:', err)
        });
      } else {
       const subs =  this.leaveService.addLeave(this.leave).subscribe({
          next: () => {
            alert('leave saved successfully');
            this.loadleaves();
            this.modalService.dismissAll();
          },
          error: (err) => console.error('Error adding leave:', err)
        });
        this.mySubscription.add(subs);
      }
    }
  
    ReviewLeave(content: any, leaveData: any): void {
      this.isReviewMode = true;
      this.leave = { ...leaveData }; // Copy leave data to prevent accidental changes
      this.review = '';
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
    approveLeave(): void {
      if (!this.review) {
          alert('Please enter a reason for approval.');
          return;
      }
  
      // console.log("Approval Reason:", this.review); // Debugging
  
      const updatedLeave = {
          ...this.leave,
          Status: "Approved",
          ApprovedBy: this.userDetail.EmployeeId,
          ApprovedReason: this.review, // Ensure this key matches backend expectations
          ApprovedDate: new Date().toISOString(),
      };
  
    const  subs =   this.leaveService.updateLeave(updatedLeave).subscribe({
          next: () => {
              alert('Leave Approved Successfully');
              this.loadreqleaves();
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

    // console.log("Rejection Reason:", this.review); // Debugging

    const updatedLeave = {
        ...this.leave,
        Status: "Rejected",
        RejectedBy: this.userDetail.EmployeeId,
        RejectedReason: this.review, // Ensure this key matches backend expectations
        RejectedDate: new Date().toISOString(),
    };

    const subs  = this.leaveService.updateLeave(updatedLeave).subscribe({
        next: () => {
            alert('Leave Rejected Successfully');
            this.loadreqleaves();
            this.modalService.dismissAll();
        },
        error: (err) => console.error('Error rejecting leave:', err)
    });
    this.mySubscription.add(subs);
}

  // Method to calculate total days based on the selected dates and half-day checkboxes
  calculateTotalDays() {
    const fromDate = new Date(this.leave.FromDate);
    const toDate = new Date(this.leave.ToDate);

    // If dates are not valid, reset the total days to 0
    if (!fromDate || !toDate || fromDate > toDate) {
      this.leave.calculateTotalDays = 0;
      return;
    }

    // Calculate total days between the FromDate and ToDate
    let totalDays = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24) + 1; // Add 1 because the end day is inclusive

    // Handle half-day logic
    if (this.leave.FromDateHalfDay && this.leave.ToDateHalfDay) {
      totalDays = totalDays * 0.5; // If both dates are half-day, the total is halved
    } else if (this.leave.FromDateHalfDay || this.leave.ToDateHalfDay) {
      totalDays = totalDays - 0.5; // If one date is a half-day, reduce by half a day
    }

    this.leave.calculateTotalDays = totalDays;
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe(); 
  }
}


