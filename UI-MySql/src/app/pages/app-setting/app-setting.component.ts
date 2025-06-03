import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { AppSettingService } from '../../services/app-setting.service';
import { AppSetting } from '../../models/appSetting';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-setting',
  imports: [AdminLayoutComponent, CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './app-setting.component.html',
  styleUrl: './app-setting.component.scss'
})
export class AppSettingComponent implements OnInit, OnDestroy {
  pageSize: number = 10; 
  currentPage: number = 1; 
  totalPages: number[] = [];
  totalItems: number = 0;
  currentPageAppSetting: any[] = [];
  pageSizes: number[] = [5, 10, 25, 50];
  mySubscription: Subscription = new Subscription();
  settings: AppSetting[] = [];
  selectedSetting: AppSetting = { Id: 0, Property: '', Value: '' };
  selectedSettingId: number | null = 0;

    appSettingForm = new FormGroup({
      Property: new FormControl('', [Validators.required]),
      Value: new FormControl('', [Validators.required]),
      
    });
  constructor(
    private router: Router,
    private appSettingService: AppSettingService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.loadSettings();
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadSettings();
  }
  updateCurrentPageAppSetting(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageAppSetting = this.settings.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageAppSetting();
  }
  loadSettings() {
    const subs = this.appSettingService.getAllSettings().subscribe({
      next: (x: any) => {
        this.settings = x;
        this.totalItems = this.settings.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageAppSetting = this.settings.slice(start, end);
      },
      error: (err) => console.error('Error fetching settings', err),
    });
    this.mySubscription.add(subs);
  }
  calculateTotalPages(): void {
    const totalEmployees = this.settings.length;
    const totalPages = Math.ceil(totalEmployees / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  openAddEditModal(modal: any, setting: AppSetting | null) {
    this.selectedSetting = setting ? { ...setting } : { Id: 0, Property: '', Value: '' };
    this.modalService.open(modal, { centered: true });

     this.appSettingForm.patchValue({
        Property: this.selectedSetting.Property,
  Value: this.selectedSetting.Value,
      });
  }
  saveSetting(modal: any) {
    // if (!this.selectedSetting.Property || !this.selectedSetting.Value) {
     if (this.appSettingForm.invalid) {
      this.appSettingForm.markAllAsTouched();
      alert('Please fill all fields.');
      return;
    }

     const formValues = this.appSettingForm.value;
  this.selectedSetting.Property = formValues.Property!;
  this.selectedSetting.Value = formValues.Value!;
    if (this.selectedSetting.Id) {
      const subs = this.appSettingService.updateSetting(this.selectedSetting).subscribe(
        () => {
          this.loadSettings();
          modal.dismiss();
        },
        (error) => console.error('Error updating setting', error)
      );
      this.mySubscription.add(subs);
    } else {
      const subs = this.appSettingService.addSetting(this.selectedSetting).subscribe(
        (response: any) => {
          this.loadSettings();
          modal.dismiss();
          alert('App Setting added successfully');
        },
        (error) => console.error('Error saving setting', error)
      );
      this.mySubscription.add(subs);
    }
  }
  updateSetting(modal: any) {
    if (!this.selectedSetting.Property || !this.selectedSetting.Value) {
      alert('Please fill all fields.');
      return;
    }
    let subs = this.appSettingService.updateSetting(this.selectedSetting).subscribe({
      next: () => {
        this.loadSettings();
        modal.dismiss();
      },
      error: (err) => console.error('Error updating setting', err),
    });
    this.mySubscription.add(subs);
  }
  openDeleteModal(modal: any, SettingId: number) {
    this.selectedSettingId = SettingId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedSettingId) return;
    let subs = this.appSettingService.deleteSetting(this.selectedSettingId).subscribe(
      (response: any) => {
        this.loadSettings();
        modal.dismiss();
        this.selectedSettingId = 0;
      },
      (error) => {
        console.error('Error deleting setting:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
