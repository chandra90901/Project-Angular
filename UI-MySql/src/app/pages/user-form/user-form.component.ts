import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MastersService } from '../../services/masters.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
interface MasterData {
  Type: string;
  Value: string;
}
@Component({
  selector: 'app-user-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  employees: Employee[] = [];
  roles: Role[] = [];
  user: any = { Id: 0, Username: '', Password: '', RoleId: 0, EmployeeId: 0, Status: 'Active' };
  users: any[] = [];
  selectedUserId = '';
  masterData: any = []
  employeeStatues: any
  userForm: any;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private userService: UserService,
    private masterService: MastersService,
    private roleService: RoleService
  ) { }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      txtuserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      txtPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      txtroleId: new FormControl('', [Validators.required]),
      ddlEmployeeID: new FormControl('', [Validators.required]),
      ddlStatus: new FormControl('', [Validators.required])
    });
    this.selectedUserId = history.state['Id'];
    if (this.selectedUserId != '' && this.selectedUserId != undefined) {
      const subs = this.userService.getUserById(this.selectedUserId).subscribe((x: any) => {
        this.user = x;
        this.userForm.patchValue({
          txtuserName: x.Username,
          txtPassword: x.Password,
          txtroleId: x.RoleId,
          ddlEmployeeID: x.EmployeeId,
          ddlStatus: x.Status
        });
      }, (error) => {
        console.error('Error fetching NotificationEGs:', error);
      });
      this.mySubscription.add(subs);
    }
    this.loadUsers()
    this.loadRoles();
    this.loadEmployees();
  }
  loadUsers() {
    const subs = this.userService.getAllUsers().subscribe({
      next: (x: any) => {
        this.users = x;
      },
      error: (err) => console.error('Error fetching users', err),
    });
    this.mySubscription.add(subs);
  }
  loadRoles() {
    const subs = this.roleService.getAllRoles().subscribe((x: any) => {
      this.roles = x;
    })
    this.mySubscription.add(subs);
  }
  loadEmployees() {
    const subs = this.employeeService.getAllEmployees().subscribe((x: any) => {
      this.employees = x;
    })
    this.mySubscription.add(subs);
  }
  GetEmployeeStatus() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.employeeStatues = this.masterData.filter((x: any) => x.Type == 'Employee Status')
    })
    this.mySubscription.add(subs);
  }
  ViewUser(): void {
    this.router.navigateByUrl('/user');
  }
  ClearUserForm(): void {
    this.user = { Id: 0, Username: '', Password: '', RoleId: 0, EmployeeId: 0, Employee: '' };
  }
  SaveUser(): void {
    console.log("User Data Before Save:", this.user);
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      alert('Username and Password are required!');
      return;
    }
    const formValues = this.userForm.value;
    this.user = {
      ...this.user,
      Username: formValues.txtuserName,
      Password: formValues.txtPassword,
      RoleId: formValues.txtroleId,
      EmployeeId: formValues.ddlEmployeeID,
      Status: formValues.ddlStatus
    };
    if (this.user.Id && this.user.Id !== 0) {
      const subs = this.userService.updateUser(this.user).subscribe(x => {
        alert('User Updated successfully');
        this.router.navigateByUrl('/user');
      });
      this.mySubscription.add(subs);
    } else {
      const subs = this.userService.addUser(this.user).subscribe({
        next: () => {
          alert('User added successfully');
          this.router.navigateByUrl('/user');
        },
        error: (err) => {
          console.error('Error addeing user:', err);
          alert('An error occurred while adding the user');
        },
      });
      this.mySubscription.add(subs);
    }
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
