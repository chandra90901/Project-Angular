import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationEmployeeGroupService } from '../../services/notification-employee-group.service';
import { NotificationGroupEmployee } from '../../models/notificationGroupEmployee';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationGroupService } from '../../services/notification-group.service';
import { NotificationGroup } from '../../models/notificationGroup';
@Component({
  selector: 'app-notification-group-employee',
  imports: [AdminLayoutComponent, CommonModule, FormsModule],
  templateUrl: './notification-group-employee.component.html',
  styleUrl: './notification-group-employee.component.scss'
})
export class NotificationGroupEmployeeComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  totalItems: number = 0;
  currentPagenotificationEGs: any[] = [];
  pageSizes: number[] = [5, 10, 25, 50];
  groupName: any = [];
  notification_groups: any[] = [];
  employeeName: any[] = [];
  employees: any = [];
  mySubscription: Subscription = new Subscription();
  notificationGroupEmployees: NotificationGroupEmployee[] = [];
  notificationGroupEmployee: any = {};
  private Id: any;
  messageService: any;
  isEditMode: boolean = false;
  selectedNotificationEGId: any;
  combinedNotificationGroupEmployees: any;
  gi: any;
  ei: any;
  constructor(
    private router: Router,
    private notificationEGServices: NotificationEmployeeGroupService,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private notificationgroupService: NotificationGroupService) { }
  ngOnInit(): void {
    this.selectedNotificationEGId = history.state['Id'];
    if (this.selectedNotificationEGId) {
      const subs = this.notificationEGServices.getNotificationGroupEmployeeById(this.selectedNotificationEGId).subscribe(
        (x: any) => {
          this.notificationGroupEmployees = x;
        }, (error) => {
          console.error('Error fetching NotificationEGs:', error);
        });
      this.mySubscription.add(subs);
    }
    this.AllEmployees();
    this.loadNotificationEGs();
    this.loadNotification();
  }
  AllEmployees() {
    const subs = this.employeeService.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
      this.employeeName = this.employees;
    }, (error) => {
      console.error('Error fetching Employee:', error);
    });
    this.mySubscription.add(subs);
  }
  loadNotification() {
    const subs = this.notificationgroupService.getAllNotificationGroup().subscribe((x: any) => {
      this.notification_groups = x;
      this.groupName = this.notification_groups;
    }, (error) => {
      console.error('Error fetching master data:', error);
    });
    this.mySubscription.add(subs);
  }
  loadNotificationEGs() {
    const subs = this.notificationEGServices.getAllNotificationGroupEmployees().subscribe({
      next: (x: any) => {
        this.notificationGroupEmployees = x;
        this.totalItems = this.notificationGroupEmployees.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPagenotificationEGs = this.notificationGroupEmployees.slice(start, end);
      },
      error: (err) => console.error('Error fetching NotificationEGs', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadNotificationEGs();
  }
  updateCurrentPageNotificationEGs(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPagenotificationEGs = this.notificationGroupEmployees.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageNotificationEGs();
  }
  calculateTotalPages(): void {
    const totalnotificationEGs = this.notificationGroupEmployees.length;
    const totalPages = Math.ceil(totalnotificationEGs / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewEmployeeForm() {
    this.router.navigateByUrl('/notification-group-employee');
  }
  open(content: any, editNotificationGroupEmployee?: any): void {
    this.isEditMode = !!editNotificationGroupEmployee;
    this.notificationGroupEmployee = editNotificationGroupEmployee ? { ...editNotificationGroupEmployee } : { Id: '', EmployeeId: '', GroupId: '', Status: '' };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  edit(content: TemplateRef<any>, notificationGroupEmployee: NotificationGroupEmployee) {
    this.isEditMode = true;
    this.notificationGroupEmployee = { ...notificationGroupEmployee };
    this.open(content);
  }
  save() {
    if (!this.notificationGroupEmployee.EmployeeId || !this.notificationGroupEmployee.GroupId || !this.notificationGroupEmployee.Status) {
      alert('Please enter valid Employee Id, Group Id, and Status!');
      return;
    }

    if (this.notificationGroupEmployee.Id) {
      const subs = this.notificationEGServices.updateNotificationGroupEmployee(this.notificationGroupEmployee).subscribe(x => {
        alert('Notification Group Employee updated successfully');
        this.loadNotificationEGs();
        this.modalService.dismissAll();
      });
      this.mySubscription.add(subs);
    } else {
      const subs = this.notificationEGServices.addNotificationEmployeeGroup(this.notificationGroupEmployee).subscribe({
        next: () => {
          alert('Notification Group Employee added successfully');
          this.loadNotificationEGs();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error adding Notification Group Employee:', err);
          alert('Error adding Notification Group Employee. Please try again.');
        },
      });
      this.mySubscription.add(subs);
    }
  }
  cancel() {
    this.modalService.dismissAll();
  }
  openDeleteModal(modal: any, EmployeeId: string) {
    this.selectedNotificationEGId = EmployeeId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedNotificationEGId) return;
    let subs = this.notificationEGServices.deleteNotificationGroupEmployee(this.selectedNotificationEGId).subscribe(
      (response: any) => {
        console.log(response);
        this.notificationGroupEmployees = this.notificationGroupEmployees.filter((nt) => nt.Id !== this.selectedNotificationEGId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'notification-group-employee deleted successfully',
        });
        modal.dismiss();
        this.selectedNotificationEGId = '';
      },
      (error) => {
        console.error('Error deleting notification-group-employee:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
