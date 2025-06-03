import { Component, inject, OnInit, TemplateRef, signal, WritableSignal } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-role',
  imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  roles: any[] = [];
  role: any = { _id: '', roleName: '', roleStatus: '', isAdmin:false };
  closeResult: WritableSignal<string> = signal('');
  isEditMode: boolean = false;

  constructor(private roleService: RoleService, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
   const subs =  this.roleService.getAllRoles().subscribe({
      next: (data: any) => (this.roles = data),
      error: (err) => console.error('Error fetching roles', err),
    });
    this.mySubscription.add(subs);
  }
  open(content: any, editRole?: any): void {
    this.isEditMode = !!editRole;
    this.role = editRole ? { ...editRole } : { roleName: '', roleStatus: '', isAdmin:false }; // Reset or populate
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  save() {
    if (!this.role.roleName || !this.role.roleStatus) {
      alert('Please enter a valid Role Name and Role Status!');
      return;
    }
    if (this.isEditMode) {
    const subs =   this.roleService.updateRole(this.role).subscribe({
        next: () => {
          this.loadRoles();
          this.modalService.dismissAll();

        },
      });
    } else {
      const subs  = this.roleService.addRole(this.role).subscribe({
        next: () => {
          alert('Roles saved successfully');
          this.loadRoles();
          this.modalService.dismissAll();
        },
      });
      this.mySubscription.add(subs);
    }
  }
  edit(content: TemplateRef<any>, role: Role) {
    this.isEditMode = true;
    this.role = { ...role };
    this.open(content);
  }

  cancel() {
    this.modalService.dismissAll();
  }
  deleteRole(id: string): void {
    if (confirm('Are you sure you want to delete this role?')) {
     const subs =  this.roleService.deleteRole(id).subscribe(x=>{
        this.loadRoles()
        // next: () => this.loadRoles(),
        // error: (err) => console.error('Error deleting role', err),
        // complete: () => this.loadRoles()
      });
      this.mySubscription.add(subs);
    }
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe(); 
  }
}
