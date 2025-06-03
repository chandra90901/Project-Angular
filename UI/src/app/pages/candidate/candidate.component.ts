import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Candidate } from '../../models/candidate';
import { CandidateService } from '../../services/candidate.service';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Candidateremark } from '../../models/candidateremark';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-candidate',
  imports: [AdminLayoutComponent, FormsModule],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss'
})
export class CandidateComponent implements OnInit {
  mySubscription: Subscription = new Subscription();
  candidate: Candidate[] = [];
  Candidate: any = {
    _id: '',
    CandidateName: '',
    EmailAddress: '',
    PhoneNumber: '',
    SkillSet: '',
    AadharCardNumber: '',
    PanCardNumber: '',
  }
  Candidateremark: any = {
    Date: '',
    Remark: '',
    CandidateId: '',
    CandidateName: '',
  };
  isEditMode: boolean = false;
  messageService: any;
  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private modalService: NgbModal,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadCan();
  }

  loadCan() {
    const subs = this.candidateService.getAllCandidate().subscribe({
      next: (x: any) => {
        this.candidate = x;
        console.log('Loaded candidate:', this.candidate); // Debug log
      },
      error: (err) => console.error('Error fetching candidate', err),
    });
    this.mySubscription.add(subs);
  }

  AddNewCandidateForm() {
    this.router.navigateByUrl('/candidate-form');
  }

  EditCandidate(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/candidate-form'], navigationExtras);
  }

  DeleteCan(id: string) {
    if (!id) return;
   const subs =  this.candidateService.deleteCandidate(id).subscribe(
      (response: any) => {
        console.log(response); // Log the raw response
        this.candidate = this.candidate.filter((can) => can._id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response, // Display the response message

        });
        this.mySubscription.add(subs);
      },
      (error) => {
        alert('successfully deleted');
      }
    );
  }
  openHistoryModal(modal: any, Can: Candidate) {
    this.Candidateremark = {
      Date: '',
      Remark: '',
      CandidateId: Can._id,
      CandidateName: Can.CandidateName,
    };
    this.modalService.open(modal);
  }
  saveRemarks() {
    if (!this.Candidateremark.Remark) {
      alert('Remark are required!');
      return;
    }
    this.Candidateremark.Date = new Date()
   const subs =  this.http.post('http://localhost:3000/api/add-candidateremark', this.Candidateremark)
      .subscribe({
        next: (response) => {
          console.log('Remark saved:', response);
          alert('Remark saved successfully!');
          this.modalService.dismissAll(); // Close the modal
        },
        error: (error) => {
          console.error('Error saving remark:', error);
          alert('Failed to save remark');
        }
      });
      this.mySubscription.add(subs);
    }
    ngOnDestroy(): void {
      this.mySubscription.unsubscribe(); 
    }
}