import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MastersService } from '../../services/masters.service';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Employee } from '../../models/employee';

@Component({
  selector: 'app-user',
  imports: [CommonModule, AdminLayoutComponent,FormsModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit,OnDestroy {
  mySubscription: Subscription = new Subscription();
    users: any[] = [];
    user: any = {
      _id: ''
    };
    messageService:any;
  selectedUserId: any;
  constructor(
      private router: Router,
      private userService: UserService,
      private modalService: NgbModal,
    ) {}
  
    ngOnInit(): void {
      this.loadSt();
    }

  
    loadSt() {
      const subs =this.userService.getAllUsers().subscribe({
        next: (x: any) => {
          this.users = x;
          console.log('Loaded users:', this.users); // Debug log
        },
        error: (err) => console.error('Error fetching users', err),
      });
      this.mySubscription.add(subs);
    }
  
    AddNewUserForm() {
      this.router.navigateByUrl('/userform');
    }
  
    EditUser(id: any) {
      const navigationExtras: NavigationExtras = {
        state: { Id: id },
      };
      this.router.navigate(['/userform'], navigationExtras);
    }
    openDeleteModal(modal: any, userId: string) {
      this.selectedUserId = userId;
      this.modalService.open(modal, { centered: true }); // Open modal
    }
  
    confirmDelete(modal: any) {
      if (!this.selectedUserId) return;
      const subs =this.userService.deleteUser(this.selectedUserId).subscribe(
        (response: any) => {
          console.log(response); // Log the raw response
          this.users = this.users.filter(st => st._id !== this.selectedUserId);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted successfully' // Display the response message
            
          });
          modal.dismiss(); // Close modal after deletion
          this.selectedUserId = '';
       
        },
        (error) => {
          alert('successfully deleted');
        }
      );
      this.mySubscription.add(subs);
    }
    ngOnDestroy(): void {
      this.mySubscription.unsubscribe(); 
    }
    
  }

  
  