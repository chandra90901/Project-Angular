import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import jspdf, { jsPDF } from 'jspdf'; 

import html2canvas from 'html2canvas'; 
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-reports',
  imports: [AdminLayoutComponent,MatCardModule,FormsModule,NgFor,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reportTypes = [
    { label: 'Candidate', type: 'candidate' },
    { label: 'Customer', type: 'customer' },
    { label: 'Invoice', type: 'invoice' },
    { label: 'Employee', type: 'employee' },
    { label: 'OfferLetter', type: 'offerletter' },
    { label: 'Timesheet', type: 'timesheet' }
  ];
  reportDataMap: any = {
    candidate: {
      
    },
    customer: {
      
    },
    invoice: {
      
    },
    employee: {
      
    },
    offerletter: {
      
    },
    timesheet: {
      
    }
  };

  pdfTitle = '';
  pdfData: any = {};
  objectKeys = Object.keys;

  downloadPDF(type: string) {
    this.pdfTitle = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`;
    this.pdfData = this.reportDataMap[type];

    // Wait for content to render
    setTimeout(() => {
      const content = document.getElementById('pdfContent');
      if (content) {
        html2canvas(content).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
          pdf.save(`${type}-report.pdf`);
        });
      }
    }, 100);
  }
}
