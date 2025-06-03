import { Component, OnDestroy, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Subscription } from 'rxjs';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { HolidayService } from '../../services/holiday.service';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MastersService } from '../../services/masters.service';
import { FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Holiday } from '../../models/holiday';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-holiday',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.scss'
})
export class HolidayComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageHoliday: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  allHolidays: any[] = [];
  availableYears: number[] = [];
  mySubscription: Subscription = new Subscription();
  messageService: any;
  employees: Employee[] = [];
  selectedHolidayId: any;
  holidayEmp: Employee[] = [];
  holidays: any[] = [];
  holiday: any = { Id: '', HolidayName: '', Date: '', Status: '' };
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  userDetail: any
  modal: any
  selectedYear: any;
  HolidayName: any;
  Date: any;
  Status: any;
  isHolidayNameMax: boolean = false;
  holidayForm = new FormGroup({
    ddlHolidayName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
    txtDate: new FormControl('', [Validators.required]),
    txtStatus: new FormControl('', [Validators.required])
  });
  constructor(private router: Router,
    private holidayService: HolidayService,
    private empService: EmployeeService,
    private modalService: NgbModal,
    private masterService: MastersService
  ) { }
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}')[0];
    this.selectedYear = new Date().getFullYear();
    this.loadHoliday();
    this.loadEmployees();
  }
  loadEmployees() {
    const subs = this.empService.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
    })
    this.mySubscription.add(subs);
  }
  loadHoliday() {
    const subs = this.holidayService.getAllHolidays().subscribe({
      next: (data: any) => {
        this.allHolidays = data;
        this.populateYearDropdown();
        this.filterByYear();
      },
      error: (err) => console.error('Error fetching holidays', err),
    });
    this.mySubscription.add(subs);
  }
  filterByYear() {
    if (!this.selectedYear) {
      this.holidays = [...this.allHolidays];
    } else {
      this.holidays = this.allHolidays.filter((holiday: any) => {
        return new Date(holiday.Date).getFullYear() === Number(this.selectedYear);
      });
    }
    this.currentPage = 1;
    this.totalItems = this.holidays.length;
    this.calculateTotalPages();
    this.updateCurrentPageHolidays();
  }
  populateYearDropdown() {
    const years = this.allHolidays.map((holiday: any) =>
      new Date(holiday.Date).getFullYear()
    );
    this.availableYears = Array.from(new Set(years)).sort((a, b) => b - a);
    const currentYear = new Date().getFullYear();
    if (!this.availableYears.includes(currentYear)) {
      this.availableYears.unshift(currentYear);
    }
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateCurrentPageHolidays();
  }
  updateCurrentPageHolidays(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageHoliday = this.holidays.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageHolidays();
  }
  calculateTotalPages(): void {
    const totalEmployees = this.holidays.length;
    const totalPages = Math.ceil(totalEmployees / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  open(content: any, editHoliday?: any): void {
    this.isEditMode = !!editHoliday;
    if (editHoliday) {
      this.holiday = { ...editHoliday };
      if (this.holiday.Date) {
        const dateObj = new Date(this.holiday.Date);
        this.holiday.Date = dateObj.toISOString().substring(0, 10);
      }
      this.holidayForm.patchValue({
        ddlHolidayName: this.holiday.HolidayName,
        txtDate: this.holiday.Date,
        txtStatus: this.holiday.Status
      });
    } else {
      this.holiday = { HolidayName: '', Date: '', Status: '' };
      this.holidayForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  edit(content: TemplateRef<any>, holiday: Holiday) {
    this.open(content, holiday);
  }

  cancel() {
    this.modalService.dismissAll();
  }

  openDeleteModal(modal: any, Holiday: string) {
    this.selectedHolidayId = Holiday;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedHolidayId) return;
    let subs = this.holidayService.deleteHoliday(this.selectedHolidayId).subscribe(
      (response: any) => {
        console.log(response);
        this.holidays = this.holidays.filter((hm) => hm.Id !== this.selectedHolidayId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Holiday deleted successfully',
        });
        modal.dismiss();
        this.selectedHolidayId = '';
        this.loadHoliday();
      },
      (error) => {
        console.error('Error deleting Holiday:', error);
      }
    );
    this.mySubscription.add(subs);
  }

  save() {
    // if (!this.holiday.HolidayName || !this.holiday.Date) {
    if (!this.holidayForm.valid) {
      this.holidayForm.markAllAsTouched();
      alert('Please enter a valid Holiday Name and Holiday Status!');
      return;
    }
    const formValues = this.holidayForm.value;
    this.holiday = {
      ...this.holiday,
      HolidayName: formValues.ddlHolidayName,
      Date: formValues.txtDate,
      Status: formValues.txtStatus
    }
    let subs;
    if (this.isEditMode) {
      subs = this.holidayService.updateHoliday(this.holiday).subscribe({
        next: () => {
          alert('Holiday Updated successfully');
          this.loadHoliday();
          this.modalService.dismissAll();
        },
        error: (err: any) => {
          console.error('Error updating Holiday:', err);
          alert('Error updating Holiday. Please try again.');
        }
      });
    } else {
      subs = this.holidayService.addHoliday(this.holiday).subscribe({
        next: () => {
          alert('Holiday Added successfully');
          this.loadHoliday();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error adding Holiday:', err);
          alert('Error adding Holiday. Please try again.');
        }
      });
    }
    this.mySubscription.add(subs);
  }
  checkHolidayNameLength() {
    const value = this.holidayForm.get('ddlHolidayName')?.value || '';
    this.isHolidayNameMax = value.length === 15;
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
