import { Component, inject, OnInit, TemplateRef, signal, WritableSignal, NgModule } from '@angular/core';
import { Salary } from '../../models/salary';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SalaryService } from '../../services/salary.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-salary',
  imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})
export class SalaryComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  salaries: any[] = [];
  filteredSalaries: any[] = [];

  salary: any = {
    _id: '',
    Basic_info: '',
    Dateofjoining: '',
    Reportinginfo: '',
    Contact: '',
    Salarysetup: ''
  };
  searchTerm: string = '';
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;

  constructor(private salaryService: SalaryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadSalaries();
  }

  loadSalaries() {
   const subs =  this.salaryService.getAllSalaries().subscribe({
      next: (data: any) => (this.salaries = data),
      error: (err) => console.error('Error fetching salaries', err),
    });
    this.mySubscription.add(subs);
  }

  open(editSalary?: Salary): void {
    this.isEditMode = !!editSalary;
    this.salary = editSalary
      ? { ...editSalary }
      : {
        _id: '',
        Basic_info: '',
        Dateofjoining: '',
        Reportinginfo: '',
        Contact: '',
        Salarysetup: '',
      };
    const offCanvasElement = document.getElementById('offcanvasRight');
    if (offCanvasElement) {
      offCanvasElement.classList.add('show');
      offCanvasElement.style.visibility = 'visible';
    }
  }




  save() {
    if (
      !this.salary.Basic_info ||
      !this.salary.Dateofjoining ||
      !this.salary.Reportinginfo ||
      !this.salary.Contact ||
      !this.salary.Salarysetup
    ) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.isEditMode) {
      const subs = this.salaryService.updateSalary(this.salary).subscribe({
        next: () => {
          this.loadSalaries();
          this.closeSidebar();
        },
        error: (err) => console.error('Error updating salary', err),
      });
    } else {
     const subs =  this.salaryService.addSalary(this.salary).subscribe({
        next: () => {
          alert('Employee details saved successfully');
          this.loadSalaries();
          this.closeSidebar();
        },
        error: (err) => console.error('Error adding salary', err),
      });
      this.mySubscription.add(subs);
    }
  }
  // applyFilter(value: string): void {
  //   console.log('Dropdown filter applied:', value);
  // }
  closeSidebar() {
    const offCanvasElement = document.getElementById('offcanvasRight');
    if (offCanvasElement) {
      offCanvasElement.classList.remove('show');
      offCanvasElement.style.visibility = 'hidden';
    }
  }

  edit(content: TemplateRef<any>, salary: Salary) {
    this.isEditMode = true;
    this.salary = { ...salary };
    this.open();
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe(); 
  }
}