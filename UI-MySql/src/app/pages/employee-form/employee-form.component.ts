import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { MastersService } from '../../services/masters.service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { masterGroup } from '../../models/mastergroup';
import { MastertypeService } from '../../services/master-type.service';
@Component({
  selector: 'app-employee-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {

  mySubscription: Subscription = new Subscription();
  step = 'Information'
  address_step = 'Present Address'
  IsPermanentSameAsPresent = false;
  reportingEmp: Employee[] = [];
  selectedEmployeeId = ''
  employee: any = {};
  mastersData: any = []
  employeeStatusMaster: any = []
  employeeStateMaster: any = []
  employeeCountryMaster: any = []
  bloodGroupMaster: any = []
  departmentMaster: any = []
  designationMaster: any = []
  accountTypeMaster: any = []
  religionMaster: any = []
  reportingToId: any = []
  employementTypeMaster: any = []
  genderMaster: any = []
  maritalStatuesMaster: any = []
  branchMaster: any = []
  bankNameMaster: any = []

   employFilleeForm = new FormGroup({
    Title: new FormControl(''),
    EmployeeName: new FormControl('', [Validators.required]),
    EmployeeStatusId: new FormControl('', [Validators.required]),
    OfficeEmail:new FormControl('',[Validators.required,Validators.email]),
    OfficeMobileNumber: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
    EmployeeId: new FormControl('', [Validators.required]),
    PersonalMobileNumber: new FormControl('', [Validators.required]),
    PersonalEmail: new FormControl('', [Validators.required,Validators.email]),
    DateOfBirth: new FormControl('', [Validators.required]),
    DesignationId: new FormControl('', [Validators.required]),
    DepartmentId: new FormControl('', [Validators.required]),
    ReportingTo:new FormControl('', [Validators.required]),
    DateOfJoining:new FormControl('', [Validators.required]),
    DateOfExit:new FormControl('', [Validators.required]),
    PermanentAddressLine1:new FormControl('', [Validators.required]),
    PermanentAddressCity:new FormControl('', [Validators.required]),
    PermanentAddressPincode:new FormControl('', [Validators.required]),
    BankAccountNumber:new FormControl('', [Validators.required]),
    BankAccountName:new FormControl('', [Validators.required]),
    BankId:new FormControl('', [Validators.required]),
    BankIfscCode:new FormControl('', [Validators.required]),
    BankAccountTypeId:new FormControl('', [Validators.required]),
    FatherName: new FormControl(''),
    EmployementTypeId: new FormControl(''),
    GenderId: new FormControl(''),
    MaritalStatusId: new FormControl(''),
    Aadhar: new FormControl(''),
    PAN: new FormControl(''),
    ReligionId: new FormControl(''),
    BloodGroupId: new FormControl(''),
    EmergencyContact: new FormControl(''),
    BranchId: new FormControl(''),
    UAN: new FormControl(''),
    ESI: new FormControl(''),
    CheckInTime: new FormControl(''),
    CheckOutTime: new FormControl(''),
    IsPermanentSameAsPresent: new FormControl(''),
    PresentAddressLine1: new FormControl(''),
    PresentAddressLine2: new FormControl(''),
    PresentAddressCity: new FormControl(''),
    PresentAddressPincode: new FormControl(''),
    PresentAddressStateId: new FormControl(''),
    PresentAddressCountryId: new FormControl(''),
    PermanentAddressLine2: new FormControl(''),
    PermanentAddressStateId: new FormControl(''),
    PermanentAddressCountryId: new FormControl(''),
    BankBrachName: new FormControl(''),
  })
  
  constructor(private router: Router,
    private masterService: MastersService,
    private employeeService: EmployeeService) {
  }
  ngOnInit(): void {
    this.selectedEmployeeId = history.state['Id'];
    if (this.selectedEmployeeId) {
      const subs = this.employeeService.getEmployeeById(this.selectedEmployeeId).subscribe(
        (x: any) => {
          this.employee = x;
          const DateOfJoiningObj = new Date(this.employee.DateOfJoining);
          this.employee.DateOfJoining = DateOfJoiningObj.toISOString().substring(0, 10);
          const DateOfBirthObj = new Date(this.employee.DateOfBirth);
          this.employee.DateOfBirth = DateOfBirthObj.toISOString().substring(0, 10);
          const DateOfExitObj = new Date(this.employee.DateOfExit);
          this.employee.DateOfExit = DateOfExitObj.toISOString().substring(0, 10);

            this.employFilleeForm.patchValue({
          Title: this.employee.Title,
          EmployeeName: this.employee.EmployeeName,
          EmployeeStatusId: this.employee.EmployeeStatusId,
          OfficeEmail: this.employee.OfficeEmail,
          OfficeMobileNumber: this.employee.OfficeMobileNumber,
          EmployeeId: this.employee.EmployeeId,
          PersonalMobileNumber: this.employee.PersonalMobileNumber,
          PersonalEmail:this.employee.PersonalEmail,
          DateOfBirth: this.employee.DateOfBirth,
          DesignationId: this.employee.DesignationId,
          DepartmentId: this.employee.DepartmentId,
          ReportingTo: this.employee.ReportingTo,
          DateOfJoining: this.employee.DateOfJoining,
          DateOfExit: this.employee.DateOfExit,
          PermanentAddressLine1: this.employee.PermanentAddressLine1,
          PermanentAddressCity: this.employee.PermanentAddressCity,
          PermanentAddressPincode: this.employee.PermanentAddressPincode,
          BankAccountNumber: this.employee.BankAccountNumber,
          BankAccountName: this.employee.BankAccountName,
          BankId: this.employee.BankId,
          BankIfscCode: this.employee.BankIfscCode,
          BankAccountTypeId: this.employee.BankAccountTypeId,
          FatherName: this.employee.FatherName,
          EmployementTypeId: this.employee.EmployementTypeId,
          GenderId: this.employee.GenderId,
          MaritalStatusId: this.employee.MaritalStatusId,
          Aadhar: this.employee.Aadhar,
          PAN: this.employee.PAN,
          ReligionId: this.employee.ReligionId,
          BloodGroupId: this.employee.BloodGroupId,
          EmergencyContact: this.employee.EmergencyContact,
          BranchId: this.employee.BranchId,
          UAN: this.employee.UAN,
          ESI: this.employee.ESI,
          CheckInTime: this.employee.CheckInTime,
          CheckOutTime: this.employee.CheckOutTime,
          IsPermanentSameAsPresent: this.employee.IsPermanentSameAsPresent,
          PresentAddressLine1: this.employee.PresentAddressLine1,
          PresentAddressLine2: this.employee.PresentAddressLine2,
          PresentAddressCity: this.employee.PresentAddressCity,
          PresentAddressPincode: this.employee.PresentAddressPincode,
          PresentAddressStateId: this.employee.PresentAddressStateId,
          PresentAddressCountryId: this.employee.PresentAddressCountryId,
          PermanentAddressLine2: this.employee.PermanentAddressLine2,
          PermanentAddressStateId: this.employee.PermanentAddressStateId,
          PermanentAddressCountryId: this.employee.PermanentAddressCountryId,
          BankBrachName: this.employee.BankBrachName,

          });
        }, (error) => {
          console.error('Error fetching employee:', error);
        });
      this.mySubscription.add(subs);
    }
    this.AllEmployees();
    this.AllmastersData();
  }
  AllEmployees() {
    const subs = this.employeeService.getAllEmployees().subscribe((x: any) => {
      this.reportingEmp = x;
    })
    this.mySubscription.add(subs);
  }
  AllmastersData(): void {
    const subs = this.masterService.getAllMasters().subscribe(
      (data: any) => {
        this.mastersData = data;
        this.FiltermastersData();
      }, (error) => {
        console.error('Error fetching master data:', error);
      });
    this.mySubscription.add(subs);
  }
  ViewEmployees() {
    this.router.navigateByUrl('/employees');
  }
  ClearEmployeeForm() {
    this.employee = {
      Title: '', EmployeeName: '', EmployeeStatusId: '', ReportingTo: '', GenderId: '', MaritalStatusId: '', BranchId: '', OfficeEmail: '', OfficeMobileNumber: '',
      EmployeeId: '', PersonalMobileNumber: '', PersonalEmail: '', DateOfBirth: '', DesignationId: '', DepartmentId: '', FatherName: '', MotherName: '', EmployementTypeId: '',
      Aadhar: '', PAN: '', ReligionId: '', BloodGroupId: '', EmergencyContact: '', UAN: '', ESI: '', DateOfJoining: '', CheckInTime: '', CheckOutTime: '', DateOfExit: '',
      AccountName: '', PresentAddressLine1: '', PresentAddressLine2: '', PresentAddressCity: '', PresentAddressPincode: '', PresentAddressStateId: '', PresentAddressCountryId: '',
      IsPermanentSameAsPresent: '', PermanentAddressLine1: '', PermanentAddressLine2: '', PermanentAddressCity: '', PermanentAddressPincode: '', PermanentAddressStateId: '',
      PermanentAddressCountryId: '', BankAccountNumber: '', BankAccountName: '', BankId: '', BankIfscCode: '', BankAccountTypeId: '', BankBranchName: ''
    };
  }
  SaveEmployee(): void {
  console.log('Employee Data:', this.employee);
if (!this.employFilleeForm.valid){
  this.employFilleeForm.markAllAsTouched();
    alert('Employee Name and Date of Birth are required!');
    return;
  }

  const formValues = this.employFilleeForm.value;

  this.employee = {
    ...this.employee,
    Title:formValues.Title,
    EmployeeName: formValues.EmployeeName,
    EmployeeStatusId: formValues.EmployeeStatusId,
    OfficeEmail: formValues.OfficeEmail,
    OfficeMobileNumber: formValues.OfficeMobileNumber,
    EmployeeId: formValues.EmployeeId,
    PersonalMobileNumber: formValues.PersonalMobileNumber,
    PersonalEmail: formValues.PersonalEmail,
    DateOfBirth: formValues.DateOfBirth,
    DesignationId: formValues.DesignationId,
    DepartmentId: formValues.DepartmentId,
    ReportingTo: formValues.ReportingTo,
    DateOfJoining: formValues.DateOfJoining,
    DateOfExit: formValues.DateOfExit,
    PermanentAddressLine1: formValues.PermanentAddressLine1,
    PermanentAddressCity: formValues.PermanentAddressCity,
    PermanentAddressPincode: formValues.PermanentAddressPincode,
    BankAccountNumber: formValues.BankAccountNumber,
    BankAccountName: formValues.BankAccountName,
    BankId: formValues.BankId,
    BankIfscCode: formValues.BankIfscCode,
    BankAccountTypeId: formValues.BankAccountTypeId,
    FatherName: formValues.FatherName,
    EmployementTypeId: formValues.EmployementTypeId,
    GenderId: formValues.GenderId,
    MaritalStatusId: formValues.MaritalStatusId,
    Aadhar: formValues.Aadhar,
    PAN: formValues.PAN,
    ReligionId: formValues.ReligionId,
    BloodGroupId: formValues.BloodGroupId,
    EmergencyContact: formValues.EmergencyContact,
    BranchId: formValues.BranchId,
    UAN: formValues.UAN,
    ESI: formValues.ESI,
    CheckInTime: formValues.CheckInTime,
    CheckOutTime: formValues.CheckOutTime,
    IsPermanentSameAsPresent: formValues.IsPermanentSameAsPresent,
    PresentAddressLine1: formValues.PresentAddressLine1,
    PresentAddressLine2: formValues.PresentAddressLine2,
    PresentAddressCity: formValues.PresentAddressCity,
    PresentAddressPincode: formValues.PresentAddressPincode,
    PresentAddressStateId: formValues.PresentAddressStateId,
    PresentAddressCountryId: formValues.PresentAddressCountryId,
    PermanentAddressLine2: formValues.PermanentAddressLine2,
    PermanentAddressStateId: formValues.PermanentAddressStateId,
    PermanentAddressCountryId: formValues.PermanentAddressCountryId,
    BankBrachName: formValues.BankBrachName,
  };

  if (this.employee.Id) {
    const subs = this.employeeService.updateEmployee(this.employee).subscribe(
      () => {
        alert('Employee updated successfully');
        this.router.navigateByUrl('/employees');
      },
      (error) => {
        console.error('Error updating employee:', error);
        alert(error.error?.message || 'An error occurred while updating the employee');
      }
    );
    this.mySubscription.add(subs);
  } else {
    const subs = this.employeeService.addEmployee(this.employee).subscribe(
      () => {
        alert('Employee added successfully');
        this.router.navigateByUrl('/employees');
      },
      (error) => {
        console.error('Error adding employee:', error);
        alert(error.error?.message || 'An error occurred while adding the employee');
      }
    );
    this.mySubscription.add(subs);
  }
}

  FiltermastersData(): void {
    this.employeeStatusMaster = this.mastersData.filter((x: any) => x.Type === 'Employee Status' && x.Group === 'Employee');
    this.genderMaster = this.mastersData.filter((x: any) => x.Type === 'Gender' && x.Group === 'Employee');
    this.maritalStatuesMaster = this.mastersData.filter((x: any) => x.Type === 'Marital Status' && x.Group === 'Employee');
    this.branchMaster = this.mastersData.filter((x: any) => x.Type === 'Branch' && x.Group === 'Employee');
    this.employementTypeMaster = this.mastersData.filter((x: any) => x.Type == 'Employement Type' && x.Group === 'Employee');
    this.employeeStateMaster = this.mastersData.filter((x: any) => x.Type == 'State' && x.Group === 'Employee');
    this.employeeCountryMaster = this.mastersData.filter((x: any) => x.Type == 'Country' && x.Group === 'Employee');
    this.bloodGroupMaster = this.mastersData.filter((x: any) => x.Type == 'Blood Group' && x.Group === 'Employee');
    this.religionMaster = this.mastersData.filter((x: any) => x.Type == 'Religion' && x.Group === 'Employee');
    this.accountTypeMaster = this.mastersData.filter((x: any) => x.Type == 'Account Type' && x.Group === 'Employee');
    this.bankNameMaster = this.mastersData.filter((x: any) => x.Type == 'Bank Name' && x.Group === 'Employee');
    this.departmentMaster = this.mastersData.filter((x: any) => x.Type == 'Department' && x.Group === 'Employee');
    this.designationMaster = this.mastersData.filter((x: any) => x.Type == 'Designation' && x.Group === 'Employee');
  }
  onSameAsPresentChange() {
     this.IsPermanentSameAsPresent = !this.IsPermanentSameAsPresent;
    if (this.IsPermanentSameAsPresent) {
      this.employFilleeForm.patchValue({
      PermanentAddressLine1: this.employFilleeForm.get('PresentAddressLine1')?.value,
      PermanentAddressLine2: this.employFilleeForm.get('PresentAddressLine2')?.value,
      PermanentAddressCity: this.employFilleeForm.get('PresentAddressCity')?.value,
      PermanentAddressPincode: this.employFilleeForm.get('PresentAddressPincode')?.value,
      PermanentAddressStateId: this.employFilleeForm.get('PresentAddressStateId')?.value,
      PermanentAddressCountryId: this.employFilleeForm.get('PresentAddressCountryId')?.value,
      });
    }
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}


