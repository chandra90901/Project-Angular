import { Component, inject, OnInit, TemplateRef, signal, WritableSignal } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { NavigationExtras, Router } from '@angular/router';
import { Role } from '../../models/role';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { NotificationGroupService } from '../../services/notification-group.service';
import { NotificationGroup } from '../../models/notificationGroup';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-notification-group',
  imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './notification-group.component.html',
  styleUrl: './notification-group.component.scss'
})
export class NotificationGroupComponent implements OnInit {
  [x: string]: any;
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageNotification_Group: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  mySubscription: Subscription = new Subscription();
  notification_groups: any[] = [];
  notification_group: any = { Id: '', GroupName: '', Status: '', };
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  selectednotificationGroupId: any;
  messageService: any;
  notificationForm = new FormGroup({
    groupName: new FormControl('', [Validators.required]),
    ddlStatus: new FormControl('', [Validators.required]),
  });
  constructor(private notificationgroupService: NotificationGroupService,
    private modalService: NgbModal,
    private router: Router,) {
  }
  ngOnInit(): void {
    this.loadNotification();
  }
  loadNotification() {
    const subs = this.notificationgroupService.getAllNotificationGroup().subscribe({
      next: (x: any) => {
        this.notification_groups = x;
        this.totalItems = this.notification_groups.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageNotification_Group = this.notification_groups.slice(start, end);
      },
      error: (err) => console.error('Error fetching roles', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadNotification();
  }
  updatecurrentPageNotification_Group(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageNotification_Group = this.notification_groups.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updatecurrentPageNotification_Group();
  }
  calculateTotalPages(): void {
    const totalRoles = this.notification_groups.length;
    const totalPages = Math.ceil(totalRoles / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewNotificationGroupForm() {
    this.router.navigateByUrl('/notification-group');
  }
  open(content: any, editNotificationGroup?: any): void {
    this.isEditMode = !!editNotificationGroup;
    this.notification_group = editNotificationGroup ? { ...editNotificationGroup } : { Id: '', GroupName: '', Status: '' };
    this.notificationForm.patchValue({
      groupName: this.notification_group.GroupName,
      ddlStatus: this.notification_group.Status
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  save() {
    if (this.notificationForm.invalid) {
      this.notificationForm.markAllAsTouched();
      alert('Please enter a valid Role Name and Role Status!');
      return;
    }
    const formValues = this.notificationForm.value;
    this.notification_group = {
      ...this.notification_group,
      GroupName: formValues.groupName,
      Status: formValues.ddlStatus
    };
    let subs;
    if (this.isEditMode) {
      subs = this.notificationgroupService.updateNotificationGroup(this.notification_group).subscribe({
        next: () => {
          this.loadNotification();
          this.modalService.dismissAll();
        },
        error: (err: any) => {
          console.error('Error updating notification_groups:', err);
          alert('Error updating notification_groups. Please try again.');
        }
      });
    } else {
      subs = this.notificationgroupService.addNotificationGroup(this.notification_group).subscribe({
        next: () => {
          alert('notification_group saved successfully');
          this.loadNotification();
          this.modalService.dismissAll();
        },
        error: (err: any) => {
          console.error('Error adding notification_group:', err);
          alert('Error adding notification_group. Please try again.');
        }
      });
    }
    this.mySubscription.add(subs);
  }
  edit(content: TemplateRef<any>, ng: NotificationGroup) {
    this.isEditMode = true;
    this.notification_group = { ...ng };
    this.open(content, this.notification_group);
  }
  cancel() {
    this.modalService.dismissAll();
  }
  openDeleteModal(modal: any, Notification: string) {
    this.selectednotificationGroupId = Notification;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectednotificationGroupId) return;
    let subs = this.notificationgroupService.deleteNotificationGroup(this.selectednotificationGroupId).subscribe(
      (response: any) => {
        console.log(response);
        this.notification_groups = this.notification_groups.filter((ng) => ng.Id !== this.selectednotificationGroupId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Holiday deleted successfully',
        });
        modal.dismiss();
        this.selectednotificationGroupId = '';
        this.loadNotification();
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
