import { Component,  signal, OnInit, WritableSignal } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule, NgFor, NgIf} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance';



@Component({
  selector: 'app-attendance',
  imports: [AdminLayoutComponent,FormsModule,CommonModule,NgIf],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit {
  step='My Attendances';
  employees: Employee[]=[];
  selectedAttendanceId=''
  attendances: Attendance[]=[];
  reqattendances: Attendance[]=[];
  attendance: any = {_id:'',Date: '',EmployeeId: '',  InTime: '',  OutTime: '',Reason: '',Status:''};
  messageService: any;
  closeResult:WritableSignal<string>=signal('');
  isEditMode: boolean=false;
  userDetail:any
 modal: any
 review: string = '';
 isReviewMode:boolean=false;
 at:any;

  constructor(private router: Router, private attendanceService: AttendanceService, private empServive: EmployeeService, private modalService: NgbModal) { }

    ngOnInit(): void {
 
     this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}')[0];
     this.loadattendances();
     this.loadreqattendances();
     this.loagEmployees();
    
   }
   loagEmployees() {
     this.empServive.getAllEmployees().subscribe((x: any) => {
       this.employees = x;
     })
   }
   loadattendances() {
     this.attendanceService.getMyAttendances(this.userDetail.EmployeeId).subscribe(
       (data: any) => {
         this.attendances = data;
       },
       (error) => {
         console.error('Error fetching attendances:', error);
       }
     );
   }
   loadreqattendances() {
     this.attendanceService.getReqAttendances(this.userDetail.EmployeeId).subscribe(
       (data: any) => {
         this.reqattendances = data;
       },
       (error) => {
         console.error('Error fetching attendances:', error);
       }
     );
   }
   open(content: any, editAttendance?: any): void {
     this.isEditMode = !!editAttendance;
     this.attendance = editAttendance ? { ...editAttendance } : { Date: '',InTime: '', OutTime: '', Status: '', Reason: '',EmployeeId:'',};
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
      this.modalService.open(modal, { centered: true }); // Open modal
    }

    confirmDelete(modal: any) {
      if (!this.selectedAttendanceId) return;
    
      this.attendanceService.deleteAttendance(this.selectedAttendanceId).subscribe(
        (response: any) => {
          console.log(response);
          this.attendances = this.attendances.filter(lv => lv._id !== this.selectedAttendanceId);
          this.messageService?.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Attendance deleted successfully'
          });
    
          modal.dismiss(); // Close modal after deletion
          this.selectedAttendanceId = '';
        },
        (error) => {
          console.error('Error deleting attendance:', error);
        }
      );
    }
    
    save() {
      if (!this.attendance.Date || !this.attendance.InTime || !this.attendance.OutTime) {
        alert('Please enter all required details!');
        return;
      }
    
      // Ensure EmployeeId is assigned correctly
      // if (!this.userDetail?.EmployeeId) {
      //   alert('User details not found. Please log in again.');
      //   return;
      // }
    
      this.attendance.EmployeeId = this.userDetail.EmployeeId;
      this.attendance.Status = "New";
    
      if (this.isEditMode) {
        // Updating existing attendance
        this.attendanceService.updateAttendance(this.attendance).subscribe({
          next: () => {
            this.loadattendances();
            alert('Attendance updated successfully');
            this.modalService.dismissAll();
          },
          error: (err) => console.error('Error updating attendance:', err)
        });
      } else {
        // Adding new attendance
        this.attendanceService.addAttendance(this.attendance).subscribe({
          next: () => {
            this.loadattendances();  // Load updated attendance list
            alert('Attendance saved successfully');
            this.modalService.dismissAll();
          },
          error: (err) => console.error('Error adding attendance:', err)
        });
      }
    }
    
    ReviewAttendance(content: any, attendanceData: any): void {
      this.isReviewMode = true;
      this.attendance = { ...attendanceData}; // Copy leave data to prevent accidental changes
      this.review = '';
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
    approveAttendance(): void {
      if (!this.review) {
          alert('Please enter a reason for approval.');
          return;
      }
  
      // console.log("Approval Reason:", this.review); // Debugging
  
      const updatedAttendance = {
          ...this.attendance,
          Status: "Approved",
          ApprovedBy: this.userDetail.EmployeeId,
          ApprovedReason: this.review, // Ensure this key matches backend expectations
          ApprovedDate: new Date().toISOString(),
      };
  
      this.attendanceService.updateAttendance(updatedAttendance).subscribe({
          next: () => {
              alert('Attendance Approved Successfully');
              this.loadreqattendances();
              this.modalService.dismissAll();
          },
          error: (err) => console.error('Error approving attendance:', err)
      });
  }
  
    
  rejectAttendance(): void {
    if (!this.review) {
        alert('Please enter a reason for rejection.');
        return;
    }

    // console.log("Rejection Reason:", this.review); // Debugging

    const updatedAttendance = {
        ...this.attendance,
        Status: "Rejected",
        RejectedBy: this.userDetail.EmployeeId,
        RejectedReason: this.review, // Ensure this key matches backend expectations
        RejectedDate: new Date().toISOString(),
    };

    this.attendanceService.updateAttendance(updatedAttendance).subscribe({
        next: () => {
            alert('Attendance Rejected Successfully');
            this.loadreqattendances();
            this.modalService.dismissAll();
        },
        error: (err) => console.error('Error rejecting attendance:', err)
    });
}
}