import { Injectable } from '@angular/core';
import { createChart, DeepPartial, UTCTimestamp, TimeChartOptions, CrosshairMode } from 'lightweight-charts';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  generateChart(chartElement: HTMLElement, chartOptions: DeepPartial<TimeChartOptions>) {
    const chart = createChart(chartElement, chartOptions);

    let firstLineSeries = chart.addLineSeries({
      baseLineColor: '#2962FF',
      color: '#2962FF',
    });

    firstLineSeries.setData([
      { value: 0, time: 1642425322 as UTCTimestamp }, 
      { value: 8, time: 1642511722 as UTCTimestamp }, 
      { value: 10, time: 1642598122 as UTCTimestamp },
      { value: 20, time: 1642684522 as UTCTimestamp }, 
      { value: 3, time: 1642770922 as UTCTimestamp }, 
      { value: 43, time: 1642857322 as UTCTimestamp }, 
      { value: 41, time: 1642943722 as UTCTimestamp }, 
      { value: 43, time: 1643030122 as UTCTimestamp }, 
      { value: 56, time: 1643116522 as UTCTimestamp }, 
      { value: 46, time: 1643202922 as UTCTimestamp },
    ]);
    
    let secondLineSeries = chart.addLineSeries({
      baseLineColor: '#2962FF',
      color: '#e91e63',
    });

    secondLineSeries.setData([
      { value: 5+0, time: 1642425322 as UTCTimestamp }, 
      { value: 5+8, time: 1642511722 as UTCTimestamp }, 
      { value: 5+10, time: 1642598122 as UTCTimestamp },
      { value: 5+20, time: 1642684522 as UTCTimestamp }, 
      { value: 5+3, time: 1642770922 as UTCTimestamp }, 
      { value: 5+43, time: 1642857322 as UTCTimestamp }, 
      { value: 5+41, time: 1642943722 as UTCTimestamp }, 
      { value: 5+43, time: 1643030122 as UTCTimestamp }, 
      { value: 5+56, time: 1643116522 as UTCTimestamp }, 
      { value: 5+46, time: 1643202922 as UTCTimestamp },
    ]);

    chart.timeScale().fitContent();
  };
}
