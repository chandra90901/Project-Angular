import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/candidate';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MastersService } from '../../services/masters.service';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-candidate-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.scss'
})
export class CandidateFormComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  selectedCandidateId = ''
  candidate: Candidate = { _id: '', CandidateName: '', EmailAddress: '', PhoneNumber: '', SkillSet: '', PanCardNumber: '', AadharCardNumber: '', Candidateid: '', Date: '', Remark: '' }
  masterData: any = []
  candidateName: any
  emailAddress: any
  phoneNumber: any
  skillSet: any
  panCardNumber: any
  aadharCardNumber: any
  constructor(private router: Router, private masterService: MastersService, private candidateService: CandidateService) {

  }
  ngOnInit(): void {
    this.selectedCandidateId = history.state['Id'];
    if (this.selectedCandidateId != '' && this.selectedCandidateId != undefined) {
      const subs = this.candidateService.getCandidateById(this.selectedCandidateId).subscribe((x: any) => {
        this.candidate = x;
      })
      this.mySubscription.add(subs);
    }
    this.GetCandidateName();
    this.GetEmailAddress();
    this.GetPhoneNumber();
    this.GetSkillSet();
    this.GetPanCardNumber();
    this.GetAadharCardNumber();
  }

  ViewCandidate() {
    this.router.navigate(['/candidate']);
  }


  ClearCandidateForm() {
    this.candidate = { _id: '', CandidateName: '', PhoneNumber: '', SkillSet: '', EmailAddress: '', PanCardNumber: '', AadharCardNumber: '', Candidateid: '', Date: '', Remark: '' }
  }
  SaveCandidate(): void {
    if (!this.candidate.CandidateName || !this.candidate.PhoneNumber) {
      alert('Candidate Name and Phone Number are required!');
      return;
    }
    if (this.candidate._id === '') {
      const subs = this.candidateService.addCandidate(this.candidate).subscribe(
        () => {
          alert('Candidate added successfully');
          this.router.navigateByUrl('/candidate');
        },
        (error) => {
          console.error('Error adding candidate:', error);
          alert(error.error?.message || 'An error occurred while adding the candidate');
        }
      );
    } else {
     const subs = this.candidateService.updateCandidate(this.candidate).subscribe(
        () => {
          alert('Candidate updated successfully');
          this.router.navigateByUrl('/candidate');
        },
        (error) => {
          console.error('Error updating candidate:', error);
          alert(error.error?.message || 'An error occurred while updating the candidate');
        }
      );
      this.mySubscription.add(subs);
    }
  }
  GetCandidateName() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.candidateName = this.masterData.filter((x: any) => x.Type == 'Candidate Name')
    })
    this.mySubscription.add(subs);
  }
  GetEmailAddress() {
   const subs =  this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.emailAddress = this.masterData.filter((x: any) => x.Type == 'Email Address')
    })
    this.mySubscription.add(subs);
  }
  GetPhoneNumber() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.phoneNumber = this.masterData.filter((x: any) => x.Type == 'Phone Number')
    })
    this.mySubscription.add(subs);
  }
  GetSkillSet() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.skillSet = this.masterData.filter((x: any) => x.Type == 'Skill set')
    })
    this.mySubscription.add(subs);
  }
  GetPanCardNumber() {
    const subs = this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.panCardNumber = this.masterData.filter((x: any) => x.Type == 'PanCard Number')
    })
    this.mySubscription.add(subs);
  }
  GetAadharCardNumber() {
    const subs= this.masterService.getAllMasters().subscribe(x => {
      this.masterData = x;
      this.aadharCardNumber = this.masterData.filter((x: any) => x.Type == 'AadharCard Number')
    })
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
		this.mySubscription.unsubscribe(); 
	}
}



