import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NavigationExtras, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-customers',
  imports: [CommonModule, AdminLayoutComponent,FormsModule ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit { 
  mySubscription: Subscription = new Subscription();
  EntityType:string=""
  State:string=""
  customers: any; // Declared an array to hold customer data

  constructor(private router: Router, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomer();
  }
    loadCustomer(){
    // Fetch all customers when the component initializes
    const subs = this.customerService.getAllCustomers().subscribe((Customers) => {
      this.customers = Customers;
    });
    this.mySubscription.add(subs);
  }

  AddNewcustomerForm(): void {
    // Navigate to the customer form for adding a new employee
    this.router.navigateByUrl('/customer-form');
  }

  EditCustomer(id: any): void {
    // Navigate to the customer form with the selected customer ID in state
    const navigationExtras: NavigationExtras = {
      state: { id: id }
    };
    this.router.navigate(['/customer-form'], navigationExtras);
  }
  DeleteCustomer(id: any): void{
   if(confirm('Are you sure you want to delete'))
   { const subs = this.customerService.deleteCustomer(id).subscribe({
    next:()=>this.loadCustomer(),
     error:(error)=> console.error('Error Deleting the customer',error),
    });
    this.mySubscription.add(subs);
  }
  }
  FilterByEntityType(){
    if(this.EntityType=="" || this.EntityType=="ALL"){
      this.loadCustomer();
    }
    else{
      const subs =this.customerService.getAllCustomersByEntityType(this.EntityType).subscribe((Customers) => {
        this.customers = Customers;
      });
      this.mySubscription.add(subs);
    }
  }
  FilterState(){
    if(this.State=="" || this.State=="All State"){
      this.loadCustomer();
    }
    else{
      const subs = this.customerService.getAllCustomersByState(this.State).subscribe((Customers) => {
        this.customers = Customers;
      });
      this.mySubscription.add(subs);
    }
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe(); 
  }
}


