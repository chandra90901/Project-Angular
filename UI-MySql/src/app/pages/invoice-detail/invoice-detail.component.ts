import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule, formatCurrency } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { InvoiceService } from '../../services/invoice.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-invoice-detail',
  imports: [AdminLayoutComponent, FormsModule, CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  invoice: any = {};
  invoiceList: any[] = [];
  constructor(private router: Router,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.AllInvoices();
  }
  AllInvoices() {
    const subs = this.invoiceService.getAllInvoices().subscribe((Id: any) => {
      this.invoiceList = Id;
    }, (error) => {
      console.error('Error fetching invoices:', error);
    });
    this.mySubscription.add(subs);
  }
  ClearInvoiceDetails(form: NgForm) {
    form.resetForm();
  }
  SaveInvoiceDetails(): void {
    if (!this.invoice.Invoice_Id || !this.invoice.product_Id) {
      alert('Invoice ID and Product ID are required!');
      return;
    }
    if (this.invoice.Id) {
      this.invoiceService.updateInvoice(this.invoice).subscribe(
        () => {
          alert('Invoice updated successfully');
          this.router.navigateByUrl('/invoices');
        },
        (error) => {
          console.error('Error updating invoice:', error);
          alert(error.error?.message || 'An error occurred while updating the invoice');
        }
      );
    } else {
      this.invoiceService.addInvoice(this.invoice).subscribe(
        () => {
          alert('Invoice added successfully');
          this.router.navigateByUrl('/invoices');
        },
        (error) => {
          console.error('Error adding invoice:', error);
          alert(error.error?.message || 'An error occurred while adding the invoice');
        }
      );
    }
  }
  ViewInvoicesDetails() {
    this.router.navigateByUrl('/invoice');
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
