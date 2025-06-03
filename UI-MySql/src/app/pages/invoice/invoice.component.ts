import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { Invoice } from '../../models/invoice';
import { ReactiveFormsModule, FormControl, FormGroup, } from '@angular/forms';
@Component({
  selector: 'app-invoice',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  totalItems: number = 0;
  currentPageInvoices: any[] = [];
  pageSizes: number[] = [5, 10, 25, 50];
  mySubscription: Subscription = new Subscription();
  customer: any = {};
  isEditMode: boolean = false;
  messageService: any;
  selectedInvoiceId: any;
  showInvoiceForm: boolean = false;
  invoice: any = {
    Invoice_number: '',
    Customer_Id: '',
    Invoice_Date: '',
    Due_Date: '',
    Total_Amount: '',
    Status: '',
    Tax: '',
    Discount: ''
  };
  userDetails: any;
  invoiceForm = new FormGroup({
    invoiceNumber: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
    invoiceDate: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    totalAmount: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    tax: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required])
  });
  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private modalService: NgbModal,
    private customerService: CustomerService,
  ) { }
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.loadInvoices();
    this.loadCustomers();
  }
  loadCustomers() {
    const subs = this.customerService.getAllCustomers().subscribe((data: any) => {
      this.customer = data;
    });
    this.mySubscription.add(subs);
  }
  loadInvoices() {
    const subs = this.invoiceService.getAllInvoices().subscribe({
      next: (data: any) => {
        this.invoice = data;
        this.totalItems = this.invoice.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageInvoices = this.invoice.slice(start, end);
      },
      error: (err) => console.error('Error fetching invoices', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadInvoices();
  }
  updateCurrentPageInvoices(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageInvoices = this.invoice.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageInvoices();
  }
  calculateTotalPages(): void {
    const totalInvoices = this.invoice.length;
    const totalPages = Math.ceil(totalInvoices / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  openDeleteModal(modal: any, invoiceId: string) {
    this.selectedInvoiceId = invoiceId;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedInvoiceId) return;
    let subs = this.invoiceService.deleteInvoice(this.selectedInvoiceId).subscribe(
      (response: any) => {
        console.log(response);
        this.invoice = this.invoice.filter((inv: { id: string }) => inv.id !== this.selectedInvoiceId);
        modal.dismiss();
        this.selectedInvoiceId = '';
        this.loadInvoices();
      },
      (error) => {
        console.error('Error deleting invoice:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  toggleInvoiceForm() {
    this.showInvoiceForm = !this.showInvoiceForm;
  }
  open(content: any, editInvoice?: any): void {
    this.isEditMode = !!editInvoice;
    if (editInvoice) {
      this.invoice = { ...editInvoice };
      if (this.invoice.Invoice_Date) {
        const InvoiceDateObj = new Date(this.invoice.Invoice_Date);
        this.invoice.Invoice_Date = InvoiceDateObj.toISOString().substring(0, 10);
      }
      if (this.invoice.Due_Date) {
        const DueDateObj = new Date(this.invoice.Due_Date);
        this.invoice.Due_Date = DueDateObj.toISOString().substring(0, 10);
      }
      this.invoiceForm.patchValue({
        invoiceNumber: this.invoice.Invoice_number,
        customerId: this.invoice.Customer_Id,
        invoiceDate: this.invoice.Invoice_Date,
        dueDate: this.invoice.Due_Date,
        totalAmount: this.invoice.Total_Amount,
        status: this.invoice.Status,
        tax: this.invoice.Tax,
        discount: this.invoice.Discount
      });
    } else {
      this.invoice = { Invoice_number: '', Customer_Id: '', Invoice_Date: '', Due_Date: '' };
      this.invoiceForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  edit(content: TemplateRef<any>, invoice: Invoice) {
    this.isEditMode = true;
    this.invoice = { ...invoice };
    this.open(content);
  }
  saveInvoice() {
    // if (!this.invoice.Invoice_number || !this.invoice.Customer_Id || !this.invoice.Invoice_Date) {
    if (!this.invoiceForm.valid) {
      this.invoiceForm.markAllAsTouched();
      alert('Invoice Number, Customer ID, and Invoice Date are required!');
      return;
    }
    const formValues = this.invoiceForm.value;
    this.invoice = {
      ...this.invoice,
      Invoice_number: formValues.invoiceNumber,
      Customer_Id: formValues.customerId,
      Invoice_Date: formValues.invoiceDate,
      Due_Date: formValues.dueDate,
      Total_Amount: formValues.totalAmount,
      Status: formValues.status,
      Tax: formValues.tax,
      Discount: formValues.discount
    }
    let subs;
    if (this.isEditMode) {
      subs = this.invoiceService.updateInvoice(this.invoice).subscribe({
        next: () => {
          alert('Invoice Update successfully');
          this.loadInvoices();
          this.modalService.dismissAll();
        },
        error: (err: any) => {
          console.error('Error updating invoice:', err);
          alert('Error updating invoice. Please try again.');
        }
      });
    } else {
      subs = this.invoiceService.addInvoice(this.invoice).subscribe({
        next: () => {
          alert('Invoice saved successfully');
          this.loadInvoices();
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error adding invoice:', err);
          alert('Error adding invoice. Please try again.');
        }
      });
    }
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe()
  }
}



