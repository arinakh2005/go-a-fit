import { Component, OnInit } from '@angular/core';
import { UserService } from '../../sevices/user.service';

@Component({
  selector: 'app-personal-activities',
  templateUrl: './personal-activities.component.html',
  styleUrl: './personal-activities.component.scss',
})
export class PersonalActivitiesComponent implements OnInit {
  public data: any;
  public chartConfig: any;

  constructor(
    public readonly userService: UserService,
  ) { }

  public ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--indigo-200'),
          borderColor: documentStyle.getPropertyValue('--indigo-200'),
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--red-200'),
          borderColor: documentStyle.getPropertyValue('--red-200'),
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.chartConfig = this.getChartConfig();
  }

  private getChartConfig(): any {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      responsive: true,
      plugins: {
        legend: {
          labels: { color: textColor }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: { weight: 500 },
          },
          grid: { color: surfaceBorder, drawBorder: false }
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false },
        },
      }
    };
  }
}
