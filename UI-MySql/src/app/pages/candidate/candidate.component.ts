import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { Candidate } from '../../models/candidate';
import { CandidateService } from '../../services/candidate.service';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Candidatehistory } from '../../models/candidatehistory';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-candidate',
  imports: [AdminLayoutComponent, FormsModule, CommonModule],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss'
})
export class CandidateComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  totalItems: number = 0;
  currentPageCandidate: any[] = [];
  pageSizes: number[] = [5, 10, 25, 50];
  candidates: Candidate[] = [];
  candidateHistory: any = [];
  Candidate: any = {
    Id: '',
    CandidateName: '',
    EmailAddress: '',
    PhoneNumber: '',
    SkillSet: '',
    AadharCardNumber: '',
    PanCardNumber: '',
  }
  Candidatehistory: any = {
    Id: '',
    Date: '',
    Remark: '',
    CandidateId: '',
    CreatedBy: '',
  };
  isEditMode: boolean = false;
  messageService: any;
  selectedCandidateId: any;
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
    const subs = this.candidateService.getAllCandidates().subscribe({
      next: (x: any) => {
        this.candidates = x;
        this.totalItems = this.candidates.length;
        this.calculateTotalPages();
        this.updateCurrentPageCandidate();
        console.log('Loaded candidates:', this.candidates);
      },
      error: (err) => console.error('Error fetching candidates', err),
    });
    this.mySubscription.add(subs);
  }

  loadCanHistory(CanId: number) {
    const subs = this.candidateService.getAllCandidateHistory(CanId).subscribe({
      next: (x: any) => {
        this.candidateHistory = x;
        console.log('Loaded candidate History:', this.candidateHistory);
      },
      error: (err: any) => console.error('Error fetching candidate History ', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateCurrentPageCandidate();
  }
  updateCurrentPageCandidate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageCandidate = this.candidates.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageCandidate();
  }
  calculateTotalPages(): void {
    const totalCandidates = this.candidates.length;
    const totalPages = Math.ceil(totalCandidates / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewCandidateForm() {
    this.router.navigateByUrl('/candidate-form');
  }
  EditCandidate(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    console.log(id)
    this.router.navigate(['/candidate-form'], navigationExtras);
  }

  openDeleteModal(modal: any, candidateId: string) {
    this.selectedCandidateId = candidateId;
    this.modalService.open(modal, { centered: true });
  }

  confirmDelete(modal: any) {
    if (!this.selectedCandidateId) return;
    let subs = this.candidateService.deleteCandidate(this.selectedCandidateId).subscribe(
      (response: any) => {
        console.log(response);
        this.candidates = this.candidates.filter((can) => can.Id !== this.selectedCandidateId);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Candidate deleted successfully',
        });
        modal.dismiss();
        this.selectedCandidateId = '';
        this.loadCan();
      },
      (error) => {
        console.error('Error deleting Candidate:', error);
      }
    );
    this.mySubscription.add(subs);
  }

  selectedCandidate: any
  openHistoryModal(modal: any, Can: Candidate) {
    this.loadCanHistory(Can.Id)
    this.selectedCandidate = Can.CandidateName
    this.Candidatehistory = {
      Date: '',
      Remark: '',
      CandidateId: Can.Id,
      CreatedBy: '',
    };
    this.modalService.open(modal);
  }
  saveRemarks() {
    if (!this.Candidatehistory.Remark) {
      alert('Remarks are required!');
      return;
    }
    this.Candidatehistory.Date = new Date();
    const subs = this.http.post('http://localhost:5000/api/candidatehistory', this.Candidatehistory)
      .subscribe({
        next: (response) => {
          console.log('Remark saved:', response);
          alert('Remark saved successfully!');
          this.modalService.dismissAll();
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