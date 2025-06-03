import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MastersService } from '../../services/masters.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, } from '@angular/forms';
import { Title } from 'chart.js';
@Component({
  selector: 'app-customer-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  step = 'Information';
  step_address = 'Billing-Address';
  selectedCustomerId = '';
  customer: any = {};
  masterData: any = [];
  customers: any[] = [];
  entityTypeMaster: any;
  fillingStatusIdMaster: any;
  bankIdMaster: any;
  accountTypeIdMaster: any;
  stateIdMaster: any;
  countryIdMaster: any;
  shippingStateIdMaster: any;
  shippingCounrtyMaster: any;
  customerForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    entityType: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    customerGstin: new FormControl(''),
    fillingStatus: new FormControl(''),
    branchName: new FormControl(''),
    displayName: new FormControl(''),
    phoneNumber: new FormControl(''),
    fax: new FormControl(''),
    accountNumber: new FormControl(''),
    accountName: new FormControl(''),
    bankName: new FormControl(''),
    ifsc: new FormControl(''),
    accountType: new FormControl(''),
    addressbranchName: new FormControl(''),
    billingAddress1: new FormControl(''),
    billingAddress2: new FormControl(''),
    billingCity: new FormControl(''),
    billingPincode: new FormControl(''),
    stateId: new FormControl(''),
    countryId: new FormControl(''),
    accountBranchName: new FormControl(''),
    accountGstin: new FormControl(''),
    accountEMail: new FormControl(''),
    accountMobileNumber: new FormControl(''),
    shippingAddress1: new FormControl(''),
    shippingAddress2: new FormControl(''),
    shippingCity: new FormControl(''),
    shippingPincode: new FormControl(''),
    shippingStateId: new FormControl(''),
    shippingCountryId: new FormControl(''),
    shippingBranchName: new FormControl(''),
    shippingGstin: new FormControl(''),
    shippingEMail: new FormControl(''),
    shippingMobileNumber: new FormControl('')
  });
  constructor(private router: Router,
    private masterService: MastersService,
    private customerService: CustomerService) {
  }
  ngOnInit(): void {
    this.selectedCustomerId = history.state['Id'];
    if (this.selectedCustomerId) {
      const subs = this.customerService.getCustomerById(this.selectedCustomerId).subscribe(
        (x: any) => {
          this.customer = x;
          this.customerForm.patchValue({
            title: x.Title,
            customerName: x.CustomerName,
            entityType: x.EntityTypeId,
            email: x.Email,
            mobileNumber: x.MobileNumber,
            customerGstin: x.CustomerGstin,
            fillingStatus: x.FillingStatusId,
            branchName: x.BranchName,
            displayName: x.DisplayName,
            phoneNumber: x.PhoneNumber,
            fax: x.Fax,
            accountNumber: x.AccountNumber,
            accountName: x.AccountName,
            bankName: x.BankId,
            ifsc: x.IfscCode,
            accountType: x.AccountTypeId,
            addressbranchName: x.BankingBranchName,
            billingAddress1: x.Address1,
            billingAddress2: x.Address2,
            billingCity: x.City,
            billingPincode: x.Pincode,
            stateId: x.StateId,
            countryId: x.CountryId,
            accountBranchName: x.AccountBranchName,
            accountGstin: x.AccountGstin,
            accountEMail: x.AccountEmail,
            accountMobileNumber: x.AccountMobileNumber,
            shippingAddress1: x.ShippingAddress1,
            shippingAddress2: x.ShippingAddress2,
            shippingCity: x.ShippingCity,
            shippingPincode: x.ShippingPincode,
            shippingStateId: x.ShippingStateId,
            shippingCountryId: x.ShippingCountryId,
            shippingBranchName: x.ShippingBranchName,
            shippingGstin: x.ShippingGstin,
            shippingEMail: x.ShippingEmail,
            shippingMobileNumber: x.ShippingMobileNumber
          });
        }, (error) => {
          console.error('Error fetching customer:', error);
        });
      this.mySubscription.add(subs);
    }
    this.AllCustomers();
    this.getEntityType();
  }
  ViewCustomers() {
    const subs = this.router.navigateByUrl('/customers');
  }
  AllCustomers() {
    const subs = this.customerService.getAllCustomers().subscribe((x: any) => {
      this.customers = [x];
    });
    this.mySubscription.add(subs);
  }
  clear() {
    this.customer =
    {
      Id: 0, Title: '', CustomerName: '', EntityTypeId: 0, Email: '',
      MobileNumber: '', CustomerGstin: '', FillingStatusId: 0, BranchName: '',
      DisplayName: '', PhoneNumber: '', Fax: '', AccountNumber: '',
      AccountName: '', BankId: 0, IfscCode: '', AccountTypeId: 0,
      BankingBranchName: '', Address1: '', Address2: '', City: '', Pincode: '',
      StateId: 0, CountryId: 0, AccountBranchName: '', AccountGstin: '',
      AccountEmail: '', AccountMobileNumber: '', ShippingAddress1: '',
      ShippingAddress2: '', ShippingCity: '', ShippingPincode: '',
      ShippingStateId: 0, ShippingCountryId: 0, ShippingBranchName: '',
      ShippingGstin: '', ShippingEmail: '', ShippingMobileNumber: '',
    }
  }
  SaveCustomer() {
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      alert('Customer Name and Email are required!');
      return;
    }
    const formValues = this.customerForm.value;
    this.customer = {
      ...this.customer,
      Title: formValues.title,
      CustomerName: formValues.customerName,
      EntityTypeId: formValues.entityType,
      Email: formValues.email,
      MobileNumber: formValues.mobileNumber,
      CustomerGstin: formValues.customerGstin,
      FillingStatusId: formValues.fillingStatus,
      BranchName: formValues.branchName,
      DisplayName: formValues.displayName,
      PhoneNumber: formValues.phoneNumber,
      Fax: formValues.fax,
      AccountNumber: formValues.accountNumber,
      AccountName: formValues.accountName,
      BankId: formValues.bankName,
      IfscCode: formValues.ifsc,
      AccountTypeId: formValues.accountType,
      BankingBranchName: formValues.addressbranchName,
      Address1: formValues.billingAddress1,
      Address2: formValues.billingAddress2,
      City: formValues.billingCity,
      Pincode: formValues.billingPincode,
      StateId: formValues.stateId,
      CountryId: formValues.countryId,
      AccountBranchName: formValues.accountBranchName,
      AccountGstin: formValues.accountGstin,
      AccountEmail: formValues.accountEMail,
      AccountMobileNumber: formValues.accountMobileNumber,
      ShippingAddress1: formValues.shippingAddress1,
      ShippingAddress2: formValues.shippingAddress2,
      ShippingCity: formValues.shippingCity,
      ShippingPincode: formValues.shippingPincode,
      ShippingStateId: formValues.shippingStateId,
      ShippingCountryId: formValues.shippingCountryId,
      ShippingBranchName: formValues.shippingBranchName,
      ShippingGstin: formValues.shippingGstin,
      ShippingEmail: formValues.shippingEMail,
      ShippingMobileNumber: formValues.shippingMobileNumber
    };
    if (this.customer.Id) {
      const subs = this.customerService.updateCustomer(this.customer).subscribe(
        () => {
          alert("Customer Updated successfully");
          this.router.navigateByUrl('/customers');
        });
      this.mySubscription.add(subs);
    } else {
      const subs = this.customerService.addCustomer(this.customer).subscribe(x => {
        alert("Customer Added successfully");
        this.router.navigateByUrl('/customers');
      });
      this.mySubscription.add(subs);
    }
  }
  getEntityType() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.entityTypeMaster = this.masterData.filter((x: any) => x.Type == 'Customer Entity' && x.Group === 'Customer');
      this.fillingStatusIdMaster = this.masterData.filter((x: any) => x.Type == 'Filling Status' && x.Group === 'Customer');
      this.bankIdMaster = this.masterData.filter((x: any) => x.Type == 'Bank' && x.Group === 'Customer');
      this.accountTypeIdMaster = this.masterData.filter((x: any) => x.Type == 'Account Type' && x.Group === 'Customer');
      this.stateIdMaster = this.masterData.filter((x: any) => x.Type == 'Customer State' && x.Group === 'Customer');
      this.countryIdMaster = this.masterData.filter((x: any) => x.Type == 'Customer Country' && x.Group === 'Customer');
      this.shippingStateIdMaster = this.masterData.filter((x: any) => x.Type == 'Shipping State' && x.Group === 'Customer');
      this.shippingCounrtyMaster = this.masterData.filter((x: any) => x.Type == 'Shipping Country' && x.Group === 'Customer');
    })
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}