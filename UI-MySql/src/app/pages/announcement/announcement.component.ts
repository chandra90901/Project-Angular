import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnnoncementService } from '../../services/announcement.service';
import { Announcement } from '../../models/announcement';
import { Employee } from '../../models/employee';
import { Title } from 'chart.js';
import { toDateAfterFromDateValidator } from '../../validators/datevalidation';


@Component({
  selector: 'app-announcement',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  totalItems: number = 0;
  currentPageAnnouncement: any[] = [];
  pageSizes: number[] = [5, 10, 25, 50];
  employee: any = {};
  userDetails: any;
  isEditMode: boolean = false;
  selectedEmployeeId: any;
  messageService: any;
  announcements: Announcement[] = [];
  announcement: any = { Id: '', EmployeeId: '', Title: '', Description: '', Status: '' };
  employeeName: any[] = [];
  employees: any[] = [];
  selectedAnnouncementId: any;
  isDescriptionMax: boolean = false;
  announcementForm = new FormGroup({
    EmployeeId: new FormControl('', [Validators.required]),
    Title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    Description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    FromDate: new FormControl('', [Validators.required]),
    ToDate: new FormControl('', [Validators.required]),
    Status: new FormControl('', [Validators.required]),
  }, {
    validators: toDateAfterFromDateValidator('FromDate', 'ToDate')
  });

  constructor(private router: Router,
    private modalService: NgbModal,
    private annoncemenntService: AnnoncementService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.selectedAnnouncementId = history.state['Id'];
    if (this.selectedAnnouncementId) {
      const subs = this.annoncemenntService.getAnnouncementById(this.selectedAnnouncementId).subscribe(
        (x: any) => {
          this.announcements = x;
        }, (error) => {
          console.error('Error fetching Announcement:', error);
        });
      this.mySubscription.add(subs);
    }
    this.AllEmployees();
    this.loadAnnouncement();
    this.loadEmployees();
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

  loadEmployees() {
    const subs = this.employeeService.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
      this.employeeName = this.employees;
    })
    this.mySubscription.add(subs);
  }

  loadAnnouncement() {
    const subs = this.annoncemenntService.getAllAnnouncements().subscribe({
      next: (x: any) => {
        this.announcements = x;
        this.totalItems = this.announcements.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageAnnouncement = this.announcements.slice(start, end);
      },
      error: (err) => console.error('Error fetching employees', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadAnnouncement();

  }

  updatecurrentPageAnnouncement(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageAnnouncement = this.announcements.slice(start, end);
  }

  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updatecurrentPageAnnouncement();
  }

  calculateTotalPages(): void {
    const totalAnnouncements = this.announcements.length;
    const totalPages = Math.ceil(totalAnnouncements / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  open(content: any, editAnnouncement?: any): void {
    this.isEditMode = !!editAnnouncement;
    if (editAnnouncement) {
      this.announcement = { ...editAnnouncement };
      if (this.announcement.FromDate) {
        const FromdateObj = new Date(this.announcement.FromDate);
        this.announcement.FromDate = FromdateObj.toISOString().substring(0, 10);
      }
      if (this.announcement.ToDate) {
        const TodateObj = new Date(this.announcement.ToDate);
        this.announcement.ToDate = TodateObj.toISOString().substring(0, 10);
      }

      this.announcementForm.patchValue({
        EmployeeId: this.announcement.EmployeeId,
        Title: this.announcement.Title,
        Description: this.announcement.Description,
        FromDate: this.announcement.FromDate,
        ToDate: this.announcement.ToDate,
        Status: this.announcement.Status

      });
    } else {
      this.announcement = { Id: '', EmployeeId: '', Title: '', Description: '', Status: '' };
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  edit(content: TemplateRef<any>, announcement: Announcement) {
    this.isEditMode = true;
    this.announcement = { ...announcement };
    this.open(content);
  }

  Save() {
    if (!this.announcementForm.valid) {
      alert('Please fill all required fields correctly!');
      return;
    }

    const formValues = this.announcementForm.value;

    this.announcement = {
      ...this.announcement,
      EmployeeId: formValues.EmployeeId,
      Title: formValues.Title,
      Description: formValues.Description,
      FromDate: formValues.FromDate,
      ToDate: formValues.ToDate,
      Status: formValues.Status
    };

    if (this.announcement.Id) {
      const subs = this.annoncemenntService.updateAnnouncement(this.announcement).subscribe({
        next: () => {
          alert('Announcement updated successfully');
          this.loadAnnouncement();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error updating Announcement:', err);
          alert('Error updating Announcement. Please try again.');
        }
      });
      this.mySubscription.add(subs);
    } else {
      const subs = this.annoncemenntService.addAnnouncement(this.announcement).subscribe({
        next: () => {
          alert('Announcement added successfully');
          this.loadAnnouncement();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error adding Announcement:', err);
          alert('Error adding Announcement. Please try again.');
        }
      });
      this.mySubscription.add(subs);
    }
  }

  Cancel() {
    this.modalService.dismissAll();
  }

  openDeleteModal(modal: any, Id: string) {
    this.selectedAnnouncementId = Id;
    this.modalService.open(modal, { centered: true });
  }

  confirmDelete(modal: any) {
    if (!this.selectedAnnouncementId) return;
    let subs = this.annoncemenntService.deleteAnnouncement(this.selectedAnnouncementId).subscribe(
      (response: any) => {
        console.log(response);
        this.announcements = this.announcements.filter((anc) => anc.Id !== this.selectedAnnouncementId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Announcement deleted successfully',
        });
        modal.dismiss();
        this.selectedAnnouncementId = '';
        this.loadAnnouncement();
      },
      (error) => {
        console.error('Error deleting Announcement:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  checkDescriptionLength() {
    const descriptionControl = this.announcementForm.get('Description');
    if (descriptionControl) {
      const length = descriptionControl.value?.length || 0;
      this.isDescriptionMax = length === 150;
    }
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}

