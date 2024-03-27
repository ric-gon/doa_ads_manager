import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { ColorType, DeepPartial, TimeChartOptions } from 'lightweight-charts';
import { FacebookApiService } from '../../services/facebook-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('firstChart') firstChart!: ElementRef;
  chartOptions: DeepPartial<TimeChartOptions> = {
    crosshair: {
      mode: 0
    },
    grid: {
      vertLines: {
        visible: false
      },
      horzLines: {
        visible:false
      }
    },
    layout: {
      textColor: 'white', background: {
        type: ColorType.Solid, color: 'black',
      }
    },
    handleScale:{
      axisPressedMouseMove: {
        time: false,
        price: false
      }
    }
  };

  data: string = 'No data';
  response: string = 'No Response';

  constructor(private facebookApiService: FacebookApiService, private chartService: ChartsService) {

  };

  ngAfterViewInit(): void {
    //this.chartService.generateChart(this.firstChart.nativeElement, this.chartOptions); //Angular Error because of DOM Handling
  };

  generateChart() {
    this.chartService.generateChart(this.firstChart.nativeElement, this.chartOptions);
  }


  getFacebookData() {
    this.facebookApiService.getAdAccountData();
  };
}
