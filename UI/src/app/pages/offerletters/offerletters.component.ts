import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NavigationExtras, Router } from '@angular/router';
import { OfferletterService } from '../../services/offerletter.service';
import { Offerletter } from '../../models/offerletter';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-offerletters',
  imports: [AdminLayoutComponent, CommonModule],
  templateUrl: './offerletters.component.html',
  styleUrl: './offerletters.component.scss'
})
export class OfferletterComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  offerletters: Offerletter[] = [];
  offerletter: any = {
    _id: '' 
  };

private _id: any;
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
    const subs = this.offerletterService.getAllOfferletters().subscribe({
      next: (x: any) => {
        this.offerletters = x;
        console.log('Loaded offerletters:', this.offerletters); // Debug log
      },
      error: (err) => console.error('Error fetching offerletters', err),
    });
    this.mySubscription.add(subs);
  }

  AddNewOfferletterForm() {
    this.router.navigateByUrl('/offerletter-form');
  }

  EditOfferletter(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { Id: id },
    };
    this.router.navigate(['/offerletter-form'], navigationExtras);
  }

  openDeleteModal(modal: any, EmployeeType: string) {
    this.selectedEmployeeType = EmployeeType;
    this.modalService.open(modal, { centered: true }); // Open modal
  }

  confirmDelete(modal:any) {
    // alert('Are you sure youe want to delete Employee')
    if (!this.selectedEmployeeType) return;
    let subs = this.offerletterService.deleteOfferletter(this.selectedEmployeeType).subscribe(
      (response: any) => {
        console.log(response); // Log the raw response
        this.offerletters = this.offerletters.filter((off) => off._id !== this.selectedEmployeeType);
        this.messageService?.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Offerletter deleted successfully', // Display the response message

        });
        modal.dismiss();
        this.selectedEmployeeType='';
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

