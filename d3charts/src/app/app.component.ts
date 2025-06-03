import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,BarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-d3-example';
}
