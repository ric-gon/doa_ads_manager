import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { ColorType, DeepPartial, TimeChartOptions } from 'lightweight-charts';
import { FacebookApiService } from '../../services/facebook-api.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent /* implements AfterViewInit */ {
  @ViewChild('firstChart') firstChart!: ElementRef;
  chartOptions: DeepPartial<TimeChartOptions> = {
    crosshair: { mode: 0 },
    grid: { vertLines: { visible: false }, horzLines: { visible: false } },
    layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black', } },
    handleScale: { axisPressedMouseMove: { time: false, price: false } }
  };

  data: any | JsonPipe = '';
  response: string = 'No Response';

  constructor(
    private facebookApiService: FacebookApiService,
    private chartService: ChartsService
  ) { };

  generateChart() {
    this.chartService.generateChart(this.firstChart.nativeElement, this.chartOptions);
  };

  getFacebookData(): void {
    this.data = this.facebookApiService.getAdAccountData();
  };
}
