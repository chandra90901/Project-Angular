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
@Component({
  selector: 'app-user',
  imports: [CommonModule, AdminLayoutComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageUsers: any[] = [];
  pageSizes: number[] = [5, 10, 25, 50];
  totalItems: number = 0;
  mySubscription: Subscription = new Subscription();
  users: any[] = [];
  user: any = {
    id: ''
  };
  messageService: any;
  selectedUserId: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const subs = this.userService.getAllUsers().subscribe({
      next: (x: any) => {
        this.users = x;
        this.totalItems = this.users.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageUsers = this.users.slice(start, end);
        console.log('Loaded users:', this.users);
      },
      error: (err) => console.error('Error fetching users', err),
    });
    this.mySubscription.add(subs);
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadUsers();
  }

  updateCurrentPageUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageUsers = this.users.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageUsers();
  }

  calculateTotalPages() {
    const totalUsers = this.users.length;
    const totalPages = Math.ceil(totalUsers / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewUserForm() {
    this.router.navigateByUrl('/userform');
  }
  EditUser(id: any) {
    console.log('Editing user ID:', id);
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/userform'], navigationExtras);
  }
  openDeleteModal(modal: any, userId: string) {
    this.selectedUserId = userId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedUserId) return;
    const subs = this.userService.deleteUser(this.selectedUserId).subscribe(
      (response: any) => {
        console.log(response);
        this.users = this.users.filter(st => st.Id !== this.selectedUserId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully'
        });
        modal.dismiss();
        this.selectedUserId = '';
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting Holiday:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}


