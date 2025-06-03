// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MastersComponent } from './pages/masters/masters.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ApplicationComponent } from './pages/application/application.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { RoleComponent } from './pages/role/role.component';
import { BusinessSetupComponent } from './pages/business-setup/business-setup.component';
import { UserComponent } from './pages/user/user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { CandidateComponent } from './pages/candidate/candidate.component';
import { CandidateFormComponent } from './pages/candidate-form/candidate-form.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { TimesheetComponent } from './pages/timesheet/timesheet.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { OfferletterComponent } from './pages/offerletter/offerletter.component';
import { OfferletterFormComponent } from './pages/offerletter-form/offerletter-form.component';
import { AppSettingComponent } from './pages/app-setting/app-setting.component';
import { OfferletterViewComponent } from './pages/offerletter-view/offerletter-view.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HolidayComponent } from './pages/holiday/holiday.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { NotificationGroupComponent } from './pages/notification-group/notification-group.component';
import { NotificationGroupEmployeeComponent } from './pages/notification-group-employee/notification-group-employee.component';
import { ModuleComponent } from './pages/module/module.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'masters', component: MastersComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'offerletters', component: OfferletterComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'application', component: ApplicationComponent, canActivate: [AuthGuard] },
  { path: 'employee-form', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'offerletter-form', component: OfferletterFormComponent, canActivate: [AuthGuard] },
  { path: 'offerletter-view', component: OfferletterViewComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'customer-form', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'setup', component: BusinessSetupComponent, canActivate: [AuthGuard] },
  { path: 'empsalary', component: SalaryComponent, canActivate: [AuthGuard] },
  { path: 'timesheet', component: TimesheetComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'userform', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'holiday', component: HolidayComponent, canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: 'module', component: ModuleComponent, canActivate: [AuthGuard] },
  { path: 'invoice-details', component: InvoiceDetailComponent, canActivate: [AuthGuard] },
  { path: 'announcement', component: AnnouncementComponent, canActivate: [AuthGuard] },
  { path: 'empsalary', component: SalaryComponent, canActivate: [AuthGuard] },
  { path: 'candidate', component: CandidateComponent, canActivate: [AuthGuard] },
  { path: 'candidate-form', component: CandidateFormComponent, canActivate: [AuthGuard] },
  // { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'leave', component: LeaveComponent, canActivate: [AuthGuard] },
  { path: 'app-setting', component: AppSettingComponent, canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: 'invoice-details', component: InvoiceDetailComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'notificationGroup', component: NotificationGroupComponent, canActivate: [AuthGuard] },
  { path: 'notificationGroupEmployee', component: NotificationGroupEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'business-setup', component: BusinessSetupComponent, canActivate: [AuthGuard] },
];
