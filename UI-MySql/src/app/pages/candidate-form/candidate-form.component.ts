import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/candidate';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-candidate-form',
  imports: [AdminLayoutComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.scss'
})
export class CandidateFormComponent implements OnInit {

  candidateForm: FormGroup = new FormGroup({
    CandidateName: new FormControl('', [Validators.required]),
    EmailAddress: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    SkillSet: new FormControl(''),
    PanCardNumber: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
    AadharCardNumber: new FormControl('', [Validators.required, Validators.pattern('\\d{12}')])

  });
  mySubscription: Subscription = new Subscription();
  selectedCandidateId = ''
  candidate: Candidate = { Id: '', CandidateName: '', EmailAddress: '', PhoneNumber: '', SkillSet: '', PanCardNumber: '', AadharCardNumber: '' }

  constructor(private router: Router, private candidateService: CandidateService) {
  }
  ngOnInit(): void {
    this.selectedCandidateId = history.state['Id'];
    if (this.selectedCandidateId != '' && this.selectedCandidateId != undefined) {
      const subs = this.candidateService.getCandidateById(this.selectedCandidateId).subscribe((x: any) => {
        this.candidate = x;
        this.candidateForm.patchValue(x);
      })
      // this.emailGroup();
      this.mySubscription.add(subs);
    }
  }
  ViewCandidate() {
    this.router.navigate(['/candidate']);
  }


  ClearCandidateForm() {
    // this.candidate = { Id: '', CandidateName: '', PhoneNumber: '', SkillSet: '', EmailAddress: '', PanCardNumber: '', AadharCardNumber: '' }
    this.candidateForm.reset();
  }

  // SaveCandidate(): void {
  //   const formValue = this.candidateForm.value;
  //   if (!this.candidate.CandidateName || !this.candidate.PhoneNumber) {
  //     alert('Candidate Name and Phone Number are required!');
  //     return;
  //   }

  //   if (!formValue.Id || formValue.Id === '') {
  //     const subs = this.candidateService.addCandidate(formValue).subscribe(
  //       () => {
  //         alert('Candidate added successfully');
  //         this.router.navigateByUrl('/candidate');
  //       },
  //       (error) => {
  //         console.error('Error adding candidate:', error);
  //         alert(error.error?.message || 'An error occurred while adding the candidate');
  //       }
  //     );
  //   } else {
  //     const subs = this.candidateService.updateCandidate(formValue).subscribe(
  //       () => {
  //         alert('Candidate updated successfully');
  //         this.router.navigateByUrl('/candidate');
  //       },
  //       (error) => {
  //         console.error('Error updating candidate:', error);
  //         alert(error.error?.message || 'An error occurred while updating the candidate');
  //       }
  //     );
  //     this.mySubscription.add(subs);
  //   }
  // }

  SaveCandidate(): void {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched();
      alert('Please fill all required fields correctly!');
      return;
    }

    const formValue = this.candidateForm.value;

    const request$ = this.selectedCandidateId
      ? this.candidateService.updateCandidate({ ...formValue, Id: this.selectedCandidateId })
      : this.candidateService.addCandidate(formValue);

    const subs = request$.subscribe(
      () => {
        alert(`Candidate ${this.selectedCandidateId ? 'updated' : 'added'} successfully`);
        this.router.navigateByUrl('/candidate');
      },
      (error) => {
        console.error('Error saving candidate:', error);
        alert(error.error?.message || 'An error occurred');
      }
    );

    this.mySubscription.add(subs);
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}



