import { Component, inject, OnInit, TemplateRef, signal, WritableSignal } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { NavigationExtras, Router } from '@angular/router';
import { Role } from '../../models/role';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Module } from '../../models/module';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models/permission';
import { MastersService } from '../../services/masters.service';
import { HighlightPermissionDirective } from './highlight-permission.directive';
@Component({
  selector: 'app-role',
  imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule, HighlightPermissionDirective, ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageRoles: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  modules: any[] = [];
  permissions: Permission[] = [];
  mySubscription: Subscription = new Subscription();
  roles: any[] = [];
  role: any = { Id: '', roleName: '', roleStatus: '', isAdmin: false };
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;
  selectedRoleId: any;
  messageService: any;
  moduleId: any;
  view: boolean = false;
  modify: boolean = false;
  mastersData: any;
  roleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required]),
    ddlStatus: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false)
  });
  constructor(private roleService: RoleService,
    private modalService: NgbModal,
    private masterService: MastersService,
    private router: Router, private permissionService: PermissionService) { }
  ngOnInit(): void {
    this.AllmastersData();
    this.loadRoles();
    this.loadModules();
    this.loadPermissions();

  }
  AllmastersData(): void {
    const subs = this.masterService.getAllMasters().subscribe(
      (data: any) => {
        this.mastersData = data;
        //alert(this.mastersData)
        this.modules = this.mastersData.filter((x: any) => x.Type === 'Module' && x.Group === 'Role');;
      }, (error) => {
        console.error('Error fetching master data:', error);
      });
    this.mySubscription.add(subs);
  }

  loadPermissions() {
    // const subs = this.permissionService.getAllPermissions().subscribe((x: any) => {
    //   this.permissions = x;
    // })
    // this.mySubscription.add(subs);
  }

  loadModules() {
    // const subs =  this.moduleService.getAllModules().subscribe((x:any)=>{
    //   this.modules=x;
    // })
    // this.mySubscription.add(subs);
  }
  loadRoles() {
    const subs = this.roleService.getAllRoles().subscribe({
      next: (x: any) => {
        this.roles = x;
        this.totalItems = this.roles.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageRoles = this.roles.slice(start, end);
      },
      error: (err) => console.error('Error fetching roles', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadRoles();
  }
  updateCurrentPageRoles(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageRoles = this.roles.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageRoles();
  }
  calculateTotalPages(): void {
    const totalRoles = this.roles.length;
    const totalPages = Math.ceil(totalRoles / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  open(content: any, editRole?: any): void {
    this.clearPermission();
    this.isEditMode = !!editRole;
    this.role = editRole ? { ...editRole } : { roleName: '', roleStatus: '', isAdmin: false };
    this.roleForm.patchValue({
      roleName: this.role.roleName,
      ddlStatus: this.role.roleStatus,
      isAdmin: this.role.isAdmin
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  save() {
    // if (!this.role.roleName || !this.role.roleStatus) {
    if (!this.roleForm.valid) {
      this.roleForm.markAllAsTouched();
      alert('Please enter a valid Role Name and Role Status!');
      return;
    }
    const formValues = this.roleForm.value;
    this.role = {
      ...this.role,
      roleName: formValues.roleName,
      roleStatus: formValues.ddlStatus,
      isAdmin: formValues.isAdmin,
    }
    if (!this.role.adminName) {
      this.role.adminName = 'Default Admin';
    }
    let subs;
    if (this.isEditMode) {
      subs = this.roleService.updateRole(this.role, this.permissions).subscribe({
        next: () => {
          alert('Role Update successfully');
          this.loadRoles();
          this.modalService.dismissAll();
          this.clearPermission();
        },
        error: (err: any) => {
          console.error('Error updating role:', err);
          alert('Error updating role. Please try again.');
        }
      });
    } else {
      subs = this.roleService.addRole(this.role, this.permissions).subscribe({
        next: () => {
          alert('Role saved successfully');
          this.loadRoles();
          this.modalService.dismissAll();
          this.clearPermission();
        },
        error: (err) => {
          console.error('Error adding role:', err);
          alert('Error adding role. Please try again.');
        }
      });
    }
    this.mySubscription.add(subs);
  }
  clearPermission() {
    this.permissions = []
    this.moduleId = 0;
    this.view = false;
    this.modify = false;
  }
  edit(content: TemplateRef<any>, role: Role) {
    this.isEditMode = true;
    this.role = { ...role };
    this.open(content);
  }
  cancel() {
    this.modalService.dismissAll();
  }

  openDeleteModal(modal: any, Role: string) {
    this.selectedRoleId = Role;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedRoleId) return;
    let subs = this.roleService.deleteRole(this.selectedRoleId).subscribe(
      (response: any) => {
        console.log(response);
        this.roles = this.roles.filter((role) => role.Id !== this.selectedRoleId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'ROle deleted successfully',
        });
        modal.dismiss();
        this.selectedRoleId = '';
        this.loadRoles();
      },
      (error) => {
        console.error('Error deleting Role:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  addPermission(roleId: number, view: boolean, modify: boolean) {
    this.permissions.push({ Id: 0, RoleId: roleId, ModuleId: this.moduleId, View: view, Modify: modify })
  }
  getModuleName(moduleId: any) {
    return this.modules.find(x => x.Id == moduleId).Data;
  }
}
