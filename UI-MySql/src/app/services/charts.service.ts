import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  getBarChartData(){
    return {
      labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
      datasets: [
        { data: [ 100, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
        { data: [ 28, 100, 40, 19, 86, 27, 90 ], label: 'Series B' }
      ]
    };
  }

  getLineChartData(){
    return {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
      ],
      datasets: [
        {
          data: [ 65, 59, 80, 81, 56, 55, 40 ],
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]
    }
  }
}
