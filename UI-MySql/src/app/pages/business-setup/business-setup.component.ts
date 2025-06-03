import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusinessSetupService } from '../../services/business-setup.service';
@Component({
  selector: 'app-business-setup',
  standalone: true,
  imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule],
  templateUrl: './business-setup.component.html',
  styleUrls: ['./business-setup.component.scss']
})
export class BusinessSetupComponent implements OnInit {
  step: 'Basic' | 'Banking' | 'User' | 'KYC Docs' | 'Collect Payments' | 'Invoice' | 'Advanced' | 'API Docs' | 'INR 0 Payable' | 'Add GSTIN Or Branches' = 'Basic';
  subStep: string | null = null;
  showGstinTable: boolean = false;
  constructor(private businessSetup: BusinessSetupService) { }
  ngOnInit(): void {
    console.log('Business Setup Component Initialized');
  }
  Step(step: string): void {
    this.step = step as any;
    console.log('Current Step:', this.step);
  }
  toggleGstinTable() {
    this.showGstinTable = !this.showGstinTable;
  }
  handleSubStep(subStep: string): void {
    this.step = 'Advanced';
    this.subStep = subStep;

  }
}
