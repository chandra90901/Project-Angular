import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OfferLetter } from '../../models/offerletter';
import { MastersService } from '../../services/masters.service';
import { CommonModule } from '@angular/common';
import { OfferletterService } from '../../services/offerletter.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-offerletter-view',
  imports: [AdminLayoutComponent, FormsModule, CommonModule],
  templateUrl: './offerletter-view.component.html',
  styleUrl: './offerletter-view.component.scss'
})
export class OfferletterViewComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  reportingOff: OfferLetter[] = [];
  selectedEmployeeId = ''
  offerletter: OfferLetter = { Id: '', Date: '', CandidateName: '', JobTitle: '', Department: '', ReportingManager: '', EmploymentType: '', WorkLocation: '', ProbationPeriod: '', Deadline: '', }
  masterData: any = []
  candidateNames: any
  date: any
  jobTitle: any
  department: any
  reportingManage: any
  employeeType: any
  workLocation: any
  probationPeriod: any
  deadline: any
  employeeId: any
  employmentType: any;
  constructor(private router: Router,
    private masterService: MastersService,
    private offerletterService: OfferletterService) {
  }
  ngOnInit(): void {
    this.selectedEmployeeId = history.state['Id'];
    this.ClearofferletterView();
    if (this.selectedEmployeeId) {
      const subs = this.offerletterService.getEmployeeById(this.selectedEmployeeId).subscribe((x: any) => {
        this.offerletter = x;
      });
      this.mySubscription.add(subs);
    }
    this.GetEmployeeId();
    this.GetDate();
    this.GetCandidateName();
    this.GetJobTitle();
    this.GetDepartment();
    this.GetReportingManage();
    this.GetEmploymentType();
    this.GetWorkLocation();
    this.GetProbationPeriod();
    this.GetDeadline();
  }
  ViewOfferletters() {
    this.router.navigateByUrl('/offerletters');
  }
  AddNewOfferLetter() {
    this.offerletter = this.getEmptyOfferLetter();
  }
  getEmptyOfferLetter(): OfferLetter {
    throw new Error('Method not implemented.');
  }
  ClearofferletterView() {
    this.offerletter = { Id: '', Date: '', CandidateName: '', JobTitle: '', Department: '', ReportingManager: '', EmploymentType: '', WorkLocation: '', ProbationPeriod: '', Deadline: '', }
  }
  SaveOfferletter(): void {
    if (!this.offerletter.CandidateName || !this.offerletter.Department) {
      alert('CandidateName and Department are required!');
      return;
    }
    if (this.offerletter.CandidateName == this.offerletter.Department) {
      alert('offerletter should not be his own reporting manage');
      return;
    }
    if (this.offerletter.Id === '') {
      const subs = this.offerletterService.addOfferLetter(this.offerletter).subscribe(
        () => {
          alert('Offerletter added successfully');
          this.router.navigateByUrl('/offerletters');
        },
        (error) => {
          console.error('Error adding offerletters:', error);
          alert(error.error?.message || 'An error occurred while adding the offerletters');
        }
      );
    } else {
      const subs = this.offerletterService.updateOfferLetter(this.offerletter).subscribe(
        () => {
          alert('Offerletter updated successfully');
          this.router.navigateByUrl('/Offerletters');
        },
        (error) => {
          console.error('Error updating offerletter:', error);
          alert(error.error?.message || 'An error occurred while updating the offerletter');
        }
      );
      this.mySubscription.add(subs);
    }
  }
  DownloadOfferLetter() {
    const offerLetterContent = document.querySelector('.container.mt-4')?.innerHTML;
    const blob = new Blob([offerLetterContent || ''], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Offer_Letter.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  SendOfferLetterEmail() {
    const recipientEmail = prompt("Enter the candidate's email:");
    if (!recipientEmail) {
      alert("Email is required!");
      return;
    }
    const emailBody = `
        <p>Dear ${this.offerletter.CandidateName},</p>
        <p>Please find attached your Offer Letter.</p>`;
    window.location.href = `mailto:${recipientEmail}?subject=Offer Letter&body=${encodeURIComponent(emailBody)}`;
  }
  GetDate() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.date = this.masterData.filter((x: any) => x.type == 'Date')
    })
    this.mySubscription.add(subs);
  }
  GetCandidateName() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.candidateNames = this.masterData.filter((x: any) => x.Type == 'Candidate Name')
    })
    this.mySubscription.add(subs);
  }
  GetJobTitle() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.jobTitle = this.masterData.filter((x: any) => x.Type == 'Job Title')
    })
    this.mySubscription.add(subs);
  }
  GetDepartment() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.department = this.masterData.filter((x: any) => x.Type == 'Department')
    })
    this.mySubscription.add(subs);
  }
  GetReportingManage() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.reportingManage = this.masterData.filter((x: any) => x.Type == 'Reporting Manager')
    })
    this.mySubscription.add(subs);
  }
  GetEmploymentType() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.employmentType = this.masterData.filter((x: any) => x.Type == 'Employment Type')
    })
    this.mySubscription.add(subs);
  }
  GetWorkLocation() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.workLocation = this.masterData.filter((x: any) => x.Type == 'Work Location')
    })
    this.mySubscription.add(subs);
  }
  GetProbationPeriod() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.probationPeriod = this.masterData.filter((x: any) => x.Type == 'Probation Period')
    })
    this.mySubscription.add(subs);
  }
  GetDeadline() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.deadline = this.masterData.filter((x: any) => x.Type == 'Deadline')
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
}
