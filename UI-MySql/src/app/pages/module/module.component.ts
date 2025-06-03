import { Component, OnDestroy, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleService } from '../../services/module.service';
import { Module } from '../../models/module';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-module',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './module.component.html',
  styleUrl: './module.component.scss'
})
export class ModuleComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageModule: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  allModules: any[] = [];
  mySubscription: Subscription = new Subscription();
  messageService: any;
  modules: Module[] = [];
  moduleId: any[] = []
  selectedModuleId = ''
  module: any = { Id: '', Name: '', Active: false };
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  userDetail: any;
  Active: any;
  modal: any;
  moduleForm = new FormGroup({
    ddlName: new FormControl(this.module.Name, [Validators.required]),
    activeStatus: new FormControl(this.module.Active, [Validators.required]),
  });
  constructor(private router: Router,
    private moduleService: ModuleService,
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}')[0];
    this.loadModule();
  }
  loadModule() {
    const subs = this.moduleService.getAllModules().subscribe({
      next: (data: any) => {
        this.modules = data;
        this.totalItems = this.modules.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageModule = this.modules.slice(start, end);
      },
      error: (err) => console.error('Error fetching holidays', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateCurrentPageModules();
  }
  updateCurrentPageModules(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageModule = this.modules.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageModules();
  }
  calculateTotalPages(): void {
    const totalModules = this.modules.length;
    const totalPages = Math.ceil(totalModules / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  open(content: any, editModule?: any): void {
    this.isEditMode = !!editModule;
    this.module = editModule ? { ...editModule, Active: Boolean(editModule.Active) } : { Name: '', Active: '' };
    this.moduleForm.patchValue({
      ddlName: this.module.Name,
      activeStatus: this.module.Active,
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  edit(content: TemplateRef<any>, module: Module) {
    this.isEditMode = true;
    this.module = { ...module };
    this.open(content);
  }
  cancel() {
    this.modalService.dismissAll();
  }
  // deleteModule(Id: string): void {
  //   console.log("Deleting Module with ID:", Id);
  //   if (confirm('Are you sure you want to delete this Module?')) {
  //     const subs = this.moduleService.deleteModule(Id).subscribe({
  //       next: () => this.loadModule(),
  //       error: (err) => console.error('Error deleting role', err)
  //     });
  //     this.mySubscription.add(subs);
  //   }
  // }
  save() {
    // console.log("Module Active Value:", this.module.Active);
    // if (!this.module.Name || this.module.Active === null) {
    if (this.moduleForm.invalid) {
      this.moduleForm.markAllAsTouched();
      alert('Please enter a valid  Name and  Active!');
      return;
    }
    const formValues = this.moduleForm.value;
    this.module = {
      ...this.module,
      Name: formValues.ddlName,
      Active: formValues.activeStatus
    }

    let subs;
    if (this.isEditMode) {
      subs = this.moduleService.updateModule(this.module).subscribe({
        next: () => {
          alert('Module Updated successfully');
          this.loadModule();
          this.modalService.dismissAll();
        },
        error: (err: any) => {
          console.error('Error updating Module:', err);
          alert('Error updating Module. Please try again.');
        }
      });
    } else {
      subs = this.moduleService.addModule(this.module).subscribe({
        next: () => {
          alert('Module Added successfully');
          this.loadModule();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error adding Module:', err);
          alert('Error adding Module. Please try again.');
        }
      });
    }
    this.mySubscription.add(subs);
  }

  openDeleteModal(modal: any, Notification: string) {
    this.selectedModuleId = Notification;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedModuleId) return;
    let subs = this.moduleService.deleteModule(this.selectedModuleId).subscribe(
      (response: any) => {
        console.log(response);
        this.module = this.modules.filter((ml: Module) => ml.Id !== this.selectedModuleId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Module deleted successfully',
        });
        modal.dismiss();
        this.selectedModuleId = '';
        this.loadModule();
      },
      (error) => {
        console.error('Error deleting module:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
