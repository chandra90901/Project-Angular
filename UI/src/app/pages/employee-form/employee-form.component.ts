import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { MastersService } from '../../services/masters.service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-employee-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  step = 'Information'
  address_step='Present Address'
  reportingEmp:Employee[]=[];
  selectedEmployeeId=''
  employee : Employee = {_id:'',Title:'',EmployeeName:'',EmployeeStatus:'',ReportingTo:'',EmployementType:'',Gender:'',MaritalStatus:'',Branch:'',OfficeEmail:'',OfficeMobileNumber:'',EmployeeId:'',PersonalMobileNumber:'', PersonalEmail:'', DateOfBirth:'',Designation:'',Department:'',FathersName:'',Aadhar:'',PAN:'',Religion:'',BloodGroup:'',EmergencyContact:'',UAN:'',ESI:'',DateOfJoining:'',CheckInTime:'',CheckOutTime:'',DateOfExit:'',AccountName:'',Address:''}
  masterData:any=[]
  employeeStatues:any
  reportingTo:any
  employementType:any
  gender:any
  maritalStatues:any
  branchs:any
  officeEmail:any
  officeMobileNumber:any
  employeeId:any
  personalMobileNumber:any
  personalEmail:any
  dateOfBirth:any
  designation:any
  department:any
  fathersName:any
  aadhar:any
  PAN:any
  religion:any
  bloodGroup:any
  emergencyContact:any
  UAN:any
  ESI:any
  dateOfJoining:any
  checkInTime:any
  checkOutTime:any
  dateOfExit:any
  isSameAsPresent:any
  accountName:any
  address:any
  constructor(private router : Router,private masterService: MastersService,private employeeService:EmployeeService){
  }
  ngOnInit(): void {
    this.selectedEmployeeId = history.state['Id'];
    if (this.selectedEmployeeId != '' && this.selectedEmployeeId != undefined) {
      const subs = this.employeeService.getEmployeeById(this.selectedEmployeeId).subscribe((x: any) => {
        this.employee = x;
        
      })
      this.mySubscription.add(subs); 
    }
    this.GetAllEmployees();
    this.GetEmployeeStatus();
    this.GetEmployementType();
    this.GetGender();
    this.GetMaritalStatus();
    this.GetBranch();
    this.GetOfficeEmail();
    this.GetOfficeMobileNumber();
    this.GetEmployeeId();
    this.GetPersonalMobileNumber();
    this.GetPersonalEmail();
    this.GetDateOfBirth();
    this.GetDesignation();
    this.GetDepartment();
    this.GetFathersName();
    this.GetAadhar();
    this.GetPAN();
    this.GetReligion();
    this.GetBloodGroup();
    this.GetEmergencyContact();
    this.GetUAN();
    this.GetESI();
    this.GetDateOfJoining();
    this.GetCheckInTime();
    this.GetCheckOutTime();
    this.GetDateOfExit();
    this.GetAccountName();
    this.GetAddress();
  }

  GetAllEmployees(){
    const subs =this.employeeService.getAllEmployees().subscribe((x:any)=>{
      this.reportingEmp = x;
    })
    this.mySubscription.add(subs);
  }
  ViewEmployees() {
    this.router.navigateByUrl('/employees');
  }

  ClearEmployeeForm() {
    this.employee = { _id: '', Title: '', EmployeeName: '', EmployeeStatus: '', ReportingTo: '', EmployementType: '', Gender: '', MaritalStatus: '', Branch: '', OfficeEmail: '', OfficeMobileNumber: '', EmployeeId: '', PersonalMobileNumber: '', PersonalEmail: '', DateOfBirth: '', Designation: '', Department: '', FathersName: '', Aadhar: '', PAN: '', Religion: '', BloodGroup: '', EmergencyContact: '', UAN: '', ESI: '', DateOfJoining: '', CheckInTime: '', CheckOutTime: '', DateOfExit: '', AccountName: '', Address: '' }
  }
  SaveEmployee(): void {
    if (!this.employee.EmployeeName || !this.employee.DateOfBirth) {
      alert('Employee Name and Date of Birth are required!');
      return;
    }
    if (this.employee.EmployeeName == this.employee.ReportingTo) {
      alert('Employee should not be his own reporting manager');
      return;
    }

    if (this.employee._id === '') {
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
    } else {
     const subs =  this.employeeService.updateEmployee(this.employee).subscribe(
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
    }
  }

  GetEmployeeStatus() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.employeeStatues = this.masterData.filter((x: any) => x.Type == 'Employee Status')
    })
    this.mySubscription.add(subs);
  }
  // GetReportingTo() {
  //   this.masterService.getAllMasters().subscribe(x => {
  //     this.masterData = x;
  //     this.reportingTo = this.masterData.filter((x: any) => x.Type == 'Reporting To')
  //   })
  // }
  GetEmployementType() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.employementType = this.masterData.filter((x: any) => x.Type == 'Employement Type')
    })
    this.mySubscription.add(subs);
  }
  GetGender() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.gender = this.masterData.filter((x: any) => x.Type == 'Gender')
    })
    this.mySubscription.add(subs);
  }
  GetMaritalStatus() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.maritalStatues = this.masterData.filter((x: any) => x.Type == 'Marital Status')
    })
    this.mySubscription.add(subs);
  }
  GetBranch() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.branchs= this.masterData.filter((x: any) => x.Type == 'Branch')
    })
    this.mySubscription.add(subs);
  }

  GetOfficeEmail() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.officeEmail = this.masterData.filter((x: any) => x.Type == 'officeEmail')
    })
    this.mySubscription.add(subs);
  }
  GetOfficeMobileNumber() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.officeMobileNumber = this.masterData.filter((x: any) => x.Type == 'officeMoblieNumber')
    })
    this.mySubscription.add(subs);
  }
  GetEmployeeId() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.employeeId = this.masterData.filter((x: any) => x.Type == 'employeeId')
    })
    this.mySubscription.add(subs);
  }
  GetPersonalMobileNumber() {
   const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.personalMobileNumber = this.masterData.filter((x: any) => x.Type == 'personalMobileNumber')
    })
    this.mySubscription.add(subs);
  }
  GetPersonalEmail() {
  const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.personalEmail = this.masterData.filter((x: any) => x.Type == 'personalEmail')
    })
    this.mySubscription.add(subs);
  }
  GetDateOfBirth() {
    const subs  = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.dateOfBirth = this.masterData.filter((x: any) => x.Type == 'dateOfBirth')
    })
    this.mySubscription.add(subs);
  }
  GetDesignation() {
   const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.designation = this.masterData.filter((x: any) => x.Type == 'designation')
    })
    this.mySubscription.add(subs);
  }
  GetDepartment() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.department = this.masterData.filter((x: any) => x.Type == 'department')
    })
    this.mySubscription.add(subs);
  }
  GetFathersName() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.fathersName = this.masterData.filter((x: any) => x.Type == 'fathersName')
    })
    this.mySubscription.add(subs);
  }
  GetAadhar() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.aadhar = this.masterData.filter((x: any) => x.Type == 'aadhar')
    })
    this.mySubscription.add(subs);
  }
  GetPAN() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.PAN = this.masterData.filter((x: any) => x.Type == 'pan')
    })
    this.mySubscription.add(subs);
  }
  GetReligion() {
    const subs =this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.religion = this.masterData.filter((x: any) => x.Type == 'religion')
    })
    this.mySubscription.add(subs);
  }
  GetBloodGroup() {
    const subs =this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.bloodGroup = this.masterData.filter((x: any) => x.Type == 'bloodGroup')
    })
    this.mySubscription.add(subs);
  }
  GetEmergencyContact() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.emergencyContact = this.masterData.filter((x: any) => x.Type == 'emergencyContact')
    })
    this.mySubscription.add(subs);
  }
  GetUAN() {
  const subs =   this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.UAN = this.masterData.filter((x: any) => x.Type == 'uan')
    })
    this.mySubscription.add(subs);
  }
  GetESI() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.ESI = this.masterData.filter((x: any) => x.Type == 'esi')
    })
    this.mySubscription.add(subs);
  }
  GetDateOfJoining() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.dateOfJoining = this.masterData.filter((x: any) => x.Type == 'dateOfJoining')
    })
    this.mySubscription.add(subs);
  }
  GetCheckInTime() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.checkInTime = this.masterData.filter((x: any) => x.Type == 'checkInTime')
    })
    this.mySubscription.add(subs);
  }
  GetCheckOutTime() {
    const subs =this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.checkOutTime = this.masterData.filter((x: any) => x.Type == 'checkOutTime')
    })
    this.mySubscription.add(subs);
  }
  GetDateOfExit() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.dateOfExit = this.masterData.filter((x: any) => x.Type == 'dateOfExit')
    })
    this.mySubscription.add(subs);
  }
  GetAccountName() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.accountName = this.masterData.filter((x: any) => x.Type == 'AccountName')
    })
    this.mySubscription.add(subs);
  }
  GetAddress() {
   const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.accountName = this.masterData.filter((x: any) => x.Type == 'AccountName')
    })
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
		this.mySubscription.unsubscribe(); 
	}
}
