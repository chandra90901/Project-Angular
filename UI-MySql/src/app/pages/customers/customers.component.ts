import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NavigationExtras, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MastersService } from '../../services/masters.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-customers',
  imports: [CommonModule, AdminLayoutComponent, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageCustomers: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  mySubscription: Subscription = new Subscription();
  customers: Customer[] = [];
  customer: any = {
    Id: ''
  };
  EntityType: string = ""
  State: string = ""
  masterData: any = [];
  entityTypeMaster: any;
  stateIdMaster: any;
  private Id: any;
  messageService: any;
  selectedEmployeeType: any;
  selectedCustomerId: any;
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private masterService: MastersService,
  private modalService: NgbModal) { }
  ngOnInit(): void {
    this.loadCustomer();
    this.GetEntityType();
  }
  loadCustomer() {
    const subs = this.customerService.getAllCustomers().subscribe({
      next: (x: any) => {
        this.customers = x;
        this.totalItems = this.customers.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageCustomers = this.customers.slice(start, end);
      },
      error: (err) => console.error('Error fetching customers', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadCustomer();
  }
  updateCurrentPageCustomers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageCustomers = this.customers.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageCustomers();
  }
  calculateTotalPages(): void {
    const totalCustomers = this.customers.length;
    const totalPages = Math.ceil(totalCustomers / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewEmployeeForm(): void {
    this.router.navigateByUrl('/customer-form');
  }
  EditCustomer(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    console.log(id)
    this.router.navigate(['/customer-form'], navigationExtras);
  }
  openDeleteModal(modal: any, Customer: string) {
    this.selectedCustomerId = Customer;
    this.modalService.open(modal, { centered: true });
  }

  confirmDelete(modal: any) {
    if (!this.selectedCustomerId) return;
    let subs = this.customerService.deleteCustomer(this.selectedCustomerId).subscribe(
      (response: any) => {
        console.log(response);
        this.customers = this.customers.filter((cus) => cus.Id !== this.selectedCustomerId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee deleted successfully',
        });
        modal.dismiss();
        this.selectedCustomerId = '';
        this.loadCustomer();
      },
      (error) => {
        console.error('Error deleting Employee:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  GetEntityType() {
    const subs = this.masterService.getAllMasters().subscribe({
      next: (data) => {
        this.masterData = data;
        this.entityTypeMaster = this.masterData.filter((x: any) => x.Type === 'Customer Entity' && x.Group === 'Customer');
        this.stateIdMaster = this.masterData.filter((x: any) => x.Type === 'Customer State' && x.Group === 'Customer');
      },
      error: (err) => console.error('Error fetching master data:', err),
    });
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}


