import { Component, inject, OnInit, TemplateRef, signal, WritableSignal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NotificationGroupService } from '../../services/notification-group.service';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-notification',
  imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageNotifications: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  groupName: any = [];
  notification_groups: any[] = [];
  employeeName: any[] = [];
  employees: any = [];
  mySubscription: Subscription = new Subscription();
  notifications: any[] = [];
  notification: any = {};
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  selectNotificationId: any;
  messageService: any;

  dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const from = control.get('FromDate')?.value;
    const to = control.get('ToDate')?.value;

    if (from && to && new Date(from) > new Date(to)) {
      return { dateRangeInvalid: true };
    }
    return null;
  };
  notificationForm = new FormGroup({
    EmployeeId: new FormControl('', [Validators.required]),
    GroupId: new FormControl('', [Validators.required]),
    Message: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    Status: new FormControl('', [Validators.required]),
    FromDate: new FormControl('', [Validators.required]),
    ToDate: new FormControl('', [Validators.required])
  }, this.dateRangeValidator);


  constructor(private notificationService: NotificationService,
    private modalService: NgbModal, private router: Router,
    private employeeService: EmployeeService,
    private notificationgroupService: NotificationGroupService) { }
  ngOnInit(): void {
    this.selectNotificationId = history.state['Id'];
    if (this.selectNotificationId) {
      const subs = this.notificationService.getNotificationById(this.selectNotificationId).subscribe(
        (x: any) => {
          this.notifications = x;
          this.notificationForm.patchValue({
            EmployeeId: x.EmployeeId,
            GroupId: x.GroupId,
            Message: x.Message,
            Status: x.Status,
            FromDate: formatDate(x.FromDate, 'yyyy-MM-dd', 'en'),
            ToDate: formatDate(x.ToDate, 'yyyy-MM-dd', 'en')
          });
        }, (error) => {
          console.error('Error fetching NotificationEGs:', error);
        });
      this.mySubscription.add(subs);
    }
    this.AllEmployees();
    this.loadNotifications();
    this.loadNotificationGroup();
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
  loadNotificationGroup() {
    const subs = this.notificationgroupService.getAllNotificationGroup().subscribe((x: any) => {
      this.notification_groups = x;
      this.groupName = this.notification_groups;
    }, (error) => {
      console.error('Error fetching master data:', error);
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadNotifications();
  }
  updateCurrentPageNotifications(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageNotifications = this.notifications.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageNotifications();
  }
  loadNotifications() {
    const subs = this.notificationService.getAllNotifications().subscribe({
      next: (x: any) => {
        this.notifications = x;
        this.totalItems = this.notifications.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageNotifications = this.notifications.slice(start, end);
      },
      error: (err) => console.error('Error fetching notifications', err),
    });
    this.mySubscription.add(subs);
  }
  calculateTotalPages(): void {
    const totalNotifications = this.notifications.length;
    const totalPages = Math.ceil(totalNotifications / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewNotificationForm() {
    this.router.navigateByUrl('/notification');
  }
  open(content: any, editNotification?: any): void {
    this.isEditMode = !!editNotification;
    if (editNotification) {
      this.notification = { ...editNotification };
      if (this.notification.FromDate) {
        const FromDateObj = new Date(this.notification.FromDate);
        this.notification.FromDate = FromDateObj.toISOString().substring(0, 10);
      }
      if (this.notification.ToDate) {
        const ToDateObj = new Date(this.notification.ToDate);
        this.notification.ToDate = ToDateObj.toISOString().substring(0, 10);
      }
      this.notificationForm.patchValue({
        EmployeeId: this.notification.EmployeeId,
        GroupId: this.notification.GroupId,
        Message: this.notification.Message,
        Status: this.notification.Status,
        FromDate: this.notification.FromDate,
        ToDate: this.notification.ToDate
      });
    } else {
      this.notification = { GroupId: '', Message: '', Status: '', FromDate: '' };
      this.notificationForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  save() {
    // if (!this.notification.EmployeeId || !this.notification.GroupId || !this.notification.Status) 
    if (this.notificationForm.invalid) {
      this.notificationForm.markAllAsTouched();
      alert('Please enter valid Employee Id, Group Id, and Status!');
      return;
    }
    const formValues = this.notificationForm.value;
    this.notification = {
      ...this.notification,
      EmployeeId: formValues.EmployeeId,
      GroupId: formValues.GroupId,
      Message: formValues.Message,
      Status: formValues.Status,
      FromDate: formValues.FromDate,
      ToDate: formValues.ToDate
    };
    if (this.notification.Id) {
      const subs = this.notificationService.updateNotification(this.notification).subscribe(x => {
        alert('Notification updated successfully');
        this.loadNotifications();
        this.modalService.dismissAll();
      });
      this.mySubscription.add(subs);
    } else {
      const subs = this.notificationService.addNotification(this.notification).subscribe({
        next: () => {
          alert('Notification added successfully');
          this.loadNotifications();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error adding Notification:', err);
          alert('Error adding Notification. Please try again.');
        },
      });
      this.mySubscription.add(subs);
    }
  }
  edit(content: TemplateRef<any>, notification: Notification) {
    this.isEditMode = true;
    this.notification = { ...notification };
    this.open(content, notification);
  }
  cancel() {
    this.notificationForm.reset();
    this.modalService.dismissAll();
  }
  openDeleteModal(modal: any, Notification: string) {
    this.selectNotificationId = Notification;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectNotificationId) return;
    let subs = this.notificationService.deleteNotification(this.selectNotificationId).subscribe(
      (response: any) => {
        console.log(response);
        this.notifications = this.notifications.filter((nt) => nt.Id !== this.selectNotificationId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Notification deleted successfully',
        });
        modal.dismiss();
        this.selectNotificationId = '';
        this.loadNotifications();
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



