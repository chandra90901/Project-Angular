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
interface MasterData {
  Type: string;
  Value: string;
}

@Component({
  selector: 'app-user-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  employees:Employee[]=[];
  roles:Role[]=[];
  user: any = { _id: '', Username: '', Password: '', RoleId: '', EmployeeId: '', EmployeeStatus: '' };
  users:any[]=[];
  selectedUserId='';
  masterData:any=[]
  employeeStatues:any

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private userService:UserService,
    private masterService:MastersService,
    private roleService:RoleService
  ) {}

  ngOnInit(): void {
this.loadRoles();
this.loadEmployees();
this.GetEmployeeStatus();

  }
  loadRoles()
  {
   const subs =  this.employeeService.getAllEmployees().subscribe((x:any)=>{
      this.employees=x;
    })
    this.mySubscription.add(subs);

  }
  loadEmployees()
  {
    const subs = this.roleService.getAllRoles().subscribe((x:any)=>{
      this.roles=x;
    })
    this.selectedUserId = history.state['Id'];
    if(this.selectedUserId!='' && this.selectedUserId != undefined){
    const subs =   this.userService.getUserById(this.selectedUserId).subscribe((x:any)=>{
        this.user = x;
      })
      this.mySubscription.add(subs);
    }
  }
    
  GetEmployeeStatus(){
   const subs =  this.masterService.getAllMasters().subscribe(x=>{
      this.masterData = x;
      this.employeeStatues = this.masterData.filter((x: any) => x.Type == 'Employee Status')
    })
    this.mySubscription.add(subs);
  }
  

  // Navigation methods
  ViewUser(): void {
    this.router.navigateByUrl('/user');
  }

  ClearUserForm(): void {
    this.user = { _id: '', Username: '', Password: '', RoleId: '', EmployeeId: '', EmployeeStatus: '' };
  }

  SaveUser(): void {
    console.log("User Data Before Save:", this.user); // Debugging step

    if (!this.user.Username || !this.user.Password) {
        alert('UserName and Password are required!');
        return;
    }

    if (this.user._id === '') {
       const subs =  this.userService.addUser(this.user).subscribe(
            () => {
                alert('User added successfully');
                this.router.navigateByUrl('/user');
            },
            (error) => {
                console.error('Error adding User:', error);
                alert(error.error?.message || 'An error occurred while adding the user');
            }
        );
    } else {
       const subs =  this.userService.updateUser(this.user).subscribe(
            () => {
                alert('User updated successfully');
                this.router.navigateByUrl('/user');
            },
            (error) => {
                console.error('Error updating user:', error);
                alert(error.error?.message || 'An error occurred while updating the user');
            }
        );
        this.mySubscription.add(subs);
    }
}
ngOnDestroy(): void {
  this.mySubscription.unsubscribe(); 
}

}
