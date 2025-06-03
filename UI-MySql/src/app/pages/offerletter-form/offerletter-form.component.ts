import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Router } from '@angular/router';
import { FormsModule ,Validators} from '@angular/forms';
import { OfferLetter } from '../../models/offerletter';
import { MastersService } from '../../services/masters.service';
import { CommonModule } from '@angular/common';
import { OfferletterService } from '../../services/offerletter.service';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-offerletter-form',
  imports: [AdminLayoutComponent,ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './offerletter-form.component.html',
  styleUrl: './offerletter-form.component.scss'
})
export class OfferletterFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  reportingOff: OfferLetter[] = [];
  selectedEmployeeId = ''
  offerletter: OfferLetter = { Id: '', Date: '', CandidateName: '', JobTitle: '', Department: '', ReportingManager: '', EmploymentType: '', WorkLocation: '', ProbationPeriod: '', Deadline: '', }
  masterData: any = []
  mastersData: any = []
  jobTitleMaster: any = []
  employmentTypeMaster: any = []
  probationPeriodMaster: any = []
  workLocationMaster: any =[]
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
  reportingManager: any;

  offerletterForm=new FormGroup({
    candidateName:new FormControl('',[Validators.required]),
    date:new FormControl('',[Validators.required]),
    jobTitle:new FormControl('',[Validators.required]),
    department:new FormControl('',[Validators.required]),
    reportingManager:new FormControl('',[Validators.required]),
    deadline:new FormControl('',[Validators.required]),
    employmentType:new FormControl('',[Validators.required]),
    workLocation:new FormControl('',[Validators.required]),
    probationPeriod:new FormControl('',[Validators.required]),
  })
  constructor(private router: Router,
    private masterService: MastersService,
    private offerletterService: OfferletterService) {
  }
  ngOnInit(): void {
    this.selectedEmployeeId = history.state['Id'];
    if (this.selectedEmployeeId != '' && this.selectedEmployeeId != undefined) {
      const subs = this.offerletterService.getEmployeeById(this.selectedEmployeeId).subscribe((x: any) => {
        this.offerletter = x;
          this.offerletterForm.patchValue({
      candidateName:this.offerletter.CandidateName,
      date:this.offerletter.Date,
      jobTitle:this.offerletter.JobTitle,
      department:this.offerletter.Department,
      reportingManager:this.offerletter.ReportingManager,
      deadline:this.offerletter.Deadline,
      employmentType:this.offerletter.EmploymentType,
      workLocation:this.offerletter.WorkLocation,
      probationPeriod:this.offerletter.ProbationPeriod,
      

  })
        const DateObj = new Date(this.offerletter.Date);
        this.offerletter.Date = DateObj.toISOString().substring(0, 10);
        const DeadlineObj = new Date(this.offerletter.Deadline);
        this.offerletter.Deadline = DeadlineObj.toISOString().substring(0, 10);
      })
      this.mySubscription.add(subs);
    }
    this.GetEmployeeId();
    this.GetDate();
    this.GetCandidateName();
    this.GetJobTitleId();
    this.GetDepartment();
    this.GetReportingManager();
    this.GetEmploymentTypeId();
    this.GetWorkLocation();
    this.GetProbationPeriodId();
    this.GetDeadline();
    this.AllmastersData();
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
  ViewOfferletters() {
    this.router.navigateByUrl('/offerletters');
  }
  ClearofferletterForm() {
    this.offerletter = { Id: '', Date: '', CandidateName: '', JobTitle: '', Department: '', ReportingManager: '', EmploymentType: '', WorkLocation: '', ProbationPeriod: '', Deadline: '', }
  }
  SaveOfferletter(): void {
    // if (!this.offerletter.CandidateName || !this.offerletter.Department) {
      if(!this.offerletterForm.valid){
      this.offerletterForm.markAllAsTouched();
      alert('CandidateName and Department are required!');
      return;
    }
     const formValues = this.offerletterForm.value;
    this.offerletter={
      ...this.offerletter,
      
      Date:formValues.date!,
      CandidateName:formValues.candidateName!,
      JobTitle:formValues.jobTitle!,
      Department:formValues.department!,
      ReportingManager:formValues.reportingManager!,
      EmploymentType:formValues.employmentType!,
      WorkLocation:formValues.workLocation!,
      ProbationPeriod:formValues.probationPeriod!,
      Deadline:formValues.deadline!
    }
    if (this.offerletter.CandidateName == this.offerletter.Department) {
      alert('offerletter should not be his own reporting manager');
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
          this.router.navigateByUrl('/offerletters');
        },
        (error) => {
          console.error('Error updating offerletter:', error);
          alert(error.error?.message || 'An error occurred while updating the offerletter');
        }
      );
      this.mySubscription.add(subs);
    }
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
  GetJobTitleId() {
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
  GetReportingManager() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.reportingManager = this.masterData.filter((x: any) => x.Type == 'Reporting Manager')
    })
    this.mySubscription.add(subs);
  }
  GetEmploymentTypeId() {
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
  GetProbationPeriodId() {
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

  FiltermastersData(): void {
    this.jobTitleMaster = this.mastersData.filter((x: any) => x.Type === 'Job Title' && x.Group === 'Offer Letter');
    this.employmentTypeMaster = this.mastersData.filter((x:any) => x.Type === 'Employment Type' && x.Group ==='Offer Letter');
    this.probationPeriodMaster = this.mastersData.filter((x:any) => x.Type === 'Probation Period' && x.Group ==='Offer Letter');
    this.workLocationMaster = this.mastersData.filter((x:any) => x.Type === 'Work Location' && x.Group === 'Offer Letter');
  }
}
