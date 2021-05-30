import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.css']
})
export class ChartPageComponent implements OnInit {
// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
//company
public pieChartLabels: Label[] = ['SoftServe', 'Global Logic', 'Osisris Unlimided', 'Intellias', 'Sigma', 'Epam'];
public pieChartData: number[] = [10, 15, 2, 6, 3, 6];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(88, 237, 235, 0.3)', 'rgba(179, 50, 179, 0.3)', 'rgba(170, 179, 50, 0.3)'],
  },
];

//technology
public pieChartTechnologyLabels: Label[] = ['Java', '.Net', 'Scala', 'Android', 'PHP', 'JavaScript'];
public pieChartTechnologyData: number[] = [26, 25, 4, 8, 21, 28];
public pieChartTechnologyType: ChartType = 'pie';
public pieChartTechnologyLegend = true;
public pieChartTechnologyPlugins = [pluginDataLabels];
public pieChartTechnologyColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(88, 237, 235, 0.3)', 'rgba(179, 50, 179, 0.3)', 'rgba(170, 179, 50, 0.3)'],
  },
];

  constructor() { }

  ngOnInit(): void {
  }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
}
