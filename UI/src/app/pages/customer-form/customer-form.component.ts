import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MastersService } from '../../services/masters.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-customer-form',
  imports: [AdminLayoutComponent,FormsModule, CommonModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  step = 'Information';
  step_address = 'Billing-Address';
  selectedCustomerId='';
  customer : Customer =  
  { 
    _id:'',
    Title:'',
    CustomerName:'',
    EntityType:'',
    Email:'',
    Mobile_Number:'',
    Customer_GSTIN:'',
    Filling_Status:'',
    BranchName:'',
    DisplayName:'',
    PhoneNumber:'',
    Fax:'',
    AccountNumber:'',
    AccountName:'',
    BankName:'',
    IfscCode:'',
    AccountType:'',
    Branch_Name:'',
    Address1:'',
    Address2:'',
    City:'',
    Pincode:'',
    State:'',
    Country:'',
    Branch_Name1:'',
    Gstin:'',
    E_Mail:'',
    MNumber:'',
    Ship_Address1:'',
    Ship_Address2:'',
    Ship_City:'',
    Ship_Pincode:'',
    Ship_State:'',
    Ship_Country:'',
    Ship_Branch_Name1:'',
    Ship_Gstin:'',
    Ship_E_Mail:'',
    Ship_MNumber:''
  }
  masterData:any=[];
  entityType:any;
  constructor(private router : Router,private masterService: MastersService,private customerService:CustomerService){
  }

  ngOnInit(): void {
    const subs = this.selectedCustomerId = history.state['id'];
    if(this.selectedCustomerId!='' && this.selectedCustomerId != undefined){
      this.customerService.getCustomerById(this.selectedCustomerId).subscribe((x:any)=>{
        this.customer = x;
      })
      this.mySubscription.add(subs);
    }

    this.GetEntityType();
  }

  ViewCustomers(){
    this.router.navigateByUrl('/customers');
  }

  clear(){
    this.customer = 
    {_id:'',
      Title:'',
      CustomerName:'',
      EntityType:'',
      Email:'',
      Mobile_Number:'',
      Customer_GSTIN:'',
      Filling_Status:'',
      BranchName:'',
      DisplayName:'',
      PhoneNumber:'',
      Fax:'',
      AccountNumber:'',
      AccountName:'',
      BankName:'',
      IfscCode:'',
      AccountType:'',
      Branch_Name:'',
      Address1:'',
      Address2:'',
      City:'',
      Pincode:'',
      State:'',
      Country:'',
      Branch_Name1:'',
      Gstin:'',
      E_Mail:'',
      MNumber:'',
      Ship_Address1:'',
      Ship_Address2:'',
      Ship_City:'',
      Ship_Pincode:'',
      Ship_State:'',
      Ship_Country:'',
      Ship_Branch_Name1:'',
      Ship_Gstin:'',
      Ship_E_Mail:'',
      Ship_MNumber:''
    }
  }
  SaveCustomer(){
    if(this.customer._id == ''){
       const subs =  this.customerService.addCustomer(this.customer).subscribe(x=>{
        alert("Customer Added successfully");
        this.ViewCustomers();
      })
    }
    else{
    const subs =   this.customerService.updateCustomer(this.customer).subscribe(x=>{
        alert("Customer Updated successfully");
        this.ViewCustomers();
      })
      this.mySubscription.add(subs);
    }
  }
  GetEntityType(){
  const subs =   this.masterService.getAllMasters().subscribe(x=>{
      this.masterData = x;
      this.entityType = this.masterData.filter((x: any) => x.Type == 'Customer Entity')
    })
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe(); 
  }
}