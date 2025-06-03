import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { ProfileService } from '../../services/profile.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { MastersService } from '../../services/masters.service';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [AdminLayoutComponent, DatePipe, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  isProfileVisible: boolean = true;
  userDetail: any
  profileData: any
  reportingEmp: Employee[] = [];
  employee: any = {};
  employees: Employee[] = [];
  selectedEmployeeId = ''
  mastersData: any = [];
  genderMaster: any = []
  employeeStatusMaster: any = []
  employementTypeMaster: any = []
  maritalStatuesMaster: any = []
  branchMaster: any = []
  countryMaster: any = []
  bankMaster: any = []
  accountTypeMaster: any = []
  designationMaster: any = []
  bloodGroupMaster: any = []
  leaveType: any = []
  constructor(private profileService: ProfileService,
    private mastersService: MastersService,
    private employeeService: EmployeeService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.profileService.getProfileById(this.userDetail.Id).subscribe(data => {
      this.profileData = data;
      this.selectedEmployeeId = history.state['Id'];
      if (this.selectedEmployeeId) {
        const subs = this.employeeService.getEmployeeById(this.selectedEmployeeId).subscribe(
          (x: any) => {
            this.employee = x;
          }, (error) => {
            console.error('Error fetching employee:', error);
          });
        this.mySubscription.add(subs);
      }
      this.loadEmp();
      this.AllEmployees();
      this.loadMaster();
    })
  }
  loadMaster() {
    const subs = this.mastersService.getAllMasters().subscribe(data => {
      this.mastersData = data;
      this.employeeStatusMaster = this.mastersData.filter((x: any) => x.Type == 'Employee Status');
      this.genderMaster = this.mastersData.filter((x: any) => x.Type == 'Gender')
      this.employementTypeMaster = this.mastersData.filter((x: any) => x.Type == 'Employement Type')
      this.maritalStatuesMaster = this.mastersData.filter((x: any) => x.Type == 'Marital Status')
      this.branchMaster = this.mastersData.filter((x: any) => x.Type == 'Branch')
      this.countryMaster = this.mastersData.filter((x: any) => x.Type == 'Country')
      this.bankMaster = this.mastersData.filter((x: any) => x.Type == 'Bank')
      this.accountTypeMaster = this.mastersData.filter((x: any) => x.Type == 'Account Type')
      this.designationMaster = this.mastersData.filter((x: any) => x.Type == 'Designation')
      this.bloodGroupMaster = this.mastersData.filter((x: any) => x.Type == 'Blood Group')
      this.leaveType = this.mastersData.filter((x: any) => x.Type == 'Leave Type')
    });
    this.mySubscription.add(subs);
  }
  loadEmp() {
    const subs = this.employeeService.getAllEmployees().subscribe({
      next: (x: any) => {
        this.employees = x;
      }
    });
    this.mySubscription.add(subs);
  }
  AllEmployees() {
    const subs = this.employeeService.getAllEmployees().subscribe((x: any) => {
      this.reportingEmp = x;
    })
    this.mySubscription.add(subs);
  }
  EditProfile(id: any) {
    console.log('Editing Profile ID:', id);
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/employee-form'], navigationExtras);
  }
  getReportingEmployeeName(reportingId: string): string {
    if (!this.reportingEmp || this.reportingEmp.length === 0) {
      return 'Not Assigned';
    }
    const reportingEmployee = this.reportingEmp.find(emp => emp.Id === reportingId);
    return reportingEmployee ? reportingEmployee.EmployeeName : this.selectedEmployeeId;
  }
  dismiss(reason: string) {
    console.log('Dismissed:', reason);
    this.isProfileVisible = false;
  }
}
