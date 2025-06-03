import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { HolidayService } from '../../services/holiday.service';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartsService } from '../../services/charts.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [AdminLayoutComponent, FormsModule, NgForOf, CommonModule, BaseChartDirective]
})
export class DashboardComponent implements OnInit {
  userDetail: any;
  Holidays: any[] = [];
  selectedHolidayId: string = '';
  selectedYear: number | null = null;
  allHolidays: any[] = [];
  holidays: any[] = [];
  filteredHolidays: any[] = [];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ ],
    datasets: [
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
    ],
    datasets: [
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  
  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
            {name: 'grandchild2.2.1'}
          ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];

  constructor(private authService: AuthService,
    private holidayService: HolidayService, private chartService : ChartsService) { }
  ngOnInit(): void {
    this.selectedYear = new Date().getFullYear();
    this.loadHolidays();
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.barChartData = this.chartService.getBarChartData();
    this.lineChartData = this.chartService.getLineChartData();
  }
  loadHolidays(): void {
    this.holidayService.getAllHolidays().subscribe(
      (data: any) => {
        this.allHolidays = data.map((holiday: any) => ({
          ...holiday,
          Date: new Date(holiday.Date)
        }));
        this.filterByYear();
      },
      (error: any) => {
        console.error('Error fetching holidays:', error);
      }
    );
  }
  filterByYear(): void {
    if (!this.selectedYear) {
      this.holidays = [];
    } else {
      this.holidays = this.allHolidays.filter((holiday: any) =>
        holiday.Date.getFullYear() === Number(this.selectedYear)
      );
    }
    console.log('Selected Year:', this.selectedYear);
    console.log('Filtered Holidays:', this.holidays);
  }
  logout(): void {
    this.authService.logout();
  }
}