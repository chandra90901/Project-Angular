import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OfferletterService } from '../../services/offerletter.service';
import { OfferLetter } from '../../models/offerletter';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-offerletter',
  imports: [AdminLayoutComponent, CommonModule, FormsModule],
  templateUrl: './offerletter.component.html',
  styleUrl: './offerletter.component.scss'
})
export class OfferletterComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number[] = [];
  currentPageOfferLetters: any[] = [];
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  mySubscription: Subscription = new Subscription();
  offerletters: OfferLetter[] = [];
  offerletter: any = {
    Id: ''
  };
  private Id: any;
  messageService: any;
  selectedEmployeeType: any;
  constructor(
    private router: Router,
    private offerletterService: OfferletterService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.loadOff();
  }
  loadOff() {
    const subs = this.offerletterService.getAllOfferLetters().subscribe({
      next: (x: any) => {
        this.offerletters = x;
        this.totalItems = this.offerletters.length;
        this.calculateTotalPages();
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentPageOfferLetters = this.offerletters.slice(start, end);
      },
      error: (err) => console.error('Error fetching offerletters', err),
    });
    this.mySubscription.add(subs);
  }
  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.loadOff();
  }
  updateCurrentPageOfferLetters(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageOfferLetters = this.offerletters.slice(start, end);
  }
  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updateCurrentPageOfferLetters();
  }
  calculateTotalPages(): void {
    const totalOfferLetters = this.offerletters.length;
    const totalPages = Math.ceil(totalOfferLetters / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  AddNewOfferletterForm() {
    this.router.navigateByUrl('/offerletter-form');
  }
  EditOfferLetter(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/offerletter-form'], navigationExtras);
  }
  editViewOfferLetter(id: number) {
    if (!id) {
      console.error('Invalid ID:', id);
      return;
    }
    console.log('Editing view offer letter for ID:', id);
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/offerletter-view'], navigationExtras);
  }
  openDeleteModal(modal: any, EmployeeType: string) {
    this.selectedEmployeeType = EmployeeType;
    this.modalService.open(modal, { centered: true });
  }
  confirmDelete(modal: any) {
    if (!this.selectedEmployeeType) return;
    let subs = this.offerletterService.deleteOfferLetter(this.selectedEmployeeType).subscribe(
      (response: any) => {
        console.log(response);
        this.offerletters = this.offerletters.filter((off) => off.Id !== this.selectedEmployeeType);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Offerletter deleted successfully',
        });
        modal.dismiss();
        this.selectedEmployeeType = '';
        this.loadOff();
      },
      (error) => {
        console.error('Error deleting Offerletter:', error);
      }
    );
    this.mySubscription.add(subs);
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}

