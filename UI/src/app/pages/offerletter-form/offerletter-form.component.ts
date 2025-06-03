import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Offerletter } from '../../models/offerletter';
import { MastersService } from '../../services/masters.service';
import { CommonModule } from '@angular/common';
import { OfferletterService } from '../../services/offerletter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offerletter-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule],
  templateUrl: './offerletter-form.component.html',
  styleUrl: './offerletter-form.component.scss'
})
export class OfferletterFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  reportingOff:Offerletter[]=[];
  selectedEmployeeId=''
  offerletter : Offerletter = {_id:'',Date:'',EmployeeId:'',CandidateName:'',JobTitle:'',Department:'',ReportingManage:'',EmploymentType:'',WorkLocation:'',ProbationPeriod:'',Deadline:'',}
  masterData:any=[]
  candidateNames:any
  date:any
  jobTitle:any
  department:any
  reportingManage:any
  employeeType:any
  workLocation:any
  probationPeriod:any
  deadline:any
  employeeId:any
  employmentType: any;

  constructor(private router : Router,private masterService: MastersService,private offerletterService:OfferletterService){
  }
  ngOnInit(): void {
    this.selectedEmployeeId = history.state['Id'];
    if (this.selectedEmployeeId != '' && this.selectedEmployeeId != undefined) {
      const subs = this.offerletterService.getEmployeeById(this.selectedEmployeeId).subscribe((x: any) => {
        this.offerletter = x;
        
      })
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


ViewOfferletters()
{
  this.router.navigateByUrl('/offerletters');
}
  ClearofferletterForm() {
    this.offerletter = {_id:'',Date:'',EmployeeId:'',CandidateName:'',JobTitle:'',Department:'',ReportingManage:'',EmploymentType:'',WorkLocation:'',ProbationPeriod:'',Deadline:'',}
  }
  SaveOfferletter(): void {
    if (!this.offerletter.CandidateName || !this.offerletter.Department) {
      alert('CandidateName and Department are required!');
      return;
    }
    if (this.offerletter.CandidateName == this.offerletter.Department) {
      alert('offerletter should not be his own reporting manager');
      return;
    }

    if (this.offerletter._id === '') {
      const subs = this.offerletterService.addOfferletter(this.offerletter).subscribe(
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
     const subs =  this.offerletterService.updateOfferletter(this.offerletter).subscribe(
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

  GetDate(){
    const subs=this.masterService.getAllMasters().subscribe(x=>{
      this.masterData=x;
      this.date=this.masterData.filter((x:any)=>x.type=='Date')
    })
    this.mySubscription.add(subs);
  }
  GetCandidateName(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.candidateNames = this.masterData.filter((x: any) => x.Type == 'Candidate Name')
    })
    this.mySubscription.add(subs);
  }
  GetJobTitle(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.jobTitle = this.masterData.filter((x: any) => x.Type == 'Job Title')
    })
    this.mySubscription.add(subs);
  }
  GetDepartment(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.department = this.masterData.filter((x: any) => x.Type == 'Department')
    })
    this.mySubscription.add(subs);
  }
  GetReportingManage(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.reportingManage = this.masterData.filter((x: any) => x.Type == 'Reporting Manage')
    })
    this.mySubscription.add(subs);
  }
  GetEmploymentType(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.employmentType = this.masterData.filter((x: any) => x.Type == 'Employment Type')
    })
    this.mySubscription.add(subs);
  }
  GetWorkLocation(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.workLocation = this.masterData.filter((x: any) => x.Type == 'Work Location')
    })
    this.mySubscription.add(subs);
  }
  GetProbationPeriod(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.probationPeriod = this.masterData.filter((x: any) => x.Type == 'Probation Period')
    })
    this.mySubscription.add(subs);
  }
  GetDeadline(){
    const subs =  this.masterService.getAllMasters().subscribe(x => {
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
