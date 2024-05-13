import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../sevices/user.service';
import { UserAttendanceService } from '../../sevices/user-attendance.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserAttendance } from '../../types/UserAttendance';

@Component({
  selector: 'app-personal-activities',
  templateUrl: './personal-activities.component.html',
  styleUrl: './personal-activities.component.scss',
})
export class PersonalActivitiesComponent implements OnInit, OnDestroy {
  public data: any;
  public chartConfig: any;
  public attendances: UserAttendance[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    public readonly userService: UserService,
    private readonly userAttendanceService: UserAttendanceService,
    private readonly messageService: MessageService,
  ) { }

  public ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: ['Грудень', 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень'],
      datasets: [
        {
          label: 'Відвідано занять',
          backgroundColor: '#D4DDFC',
          borderColor: '#D4DDFC',
          data: [13, 10, 8, 11, 9, 12, 6]
        },
        {
          label: 'Пропущено занять',
          backgroundColor: documentStyle.getPropertyValue('--red-600'),
          borderColor: documentStyle.getPropertyValue('--red-600'),
          data: [0, 2, 0, 1, 3, 1, 1]
        }
      ]
    };

    this.chartConfig = this.getChartConfig();
    this.fetchUserAttendances();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private getChartConfig(): any {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
      maintainAspectRatio: false,
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

  private fetchUserAttendances(): void {
    if (!this.userService.user?.athlete?.id) return;

    this.subscriptions.push(
      this.userAttendanceService.getAttendancesByAthleteId(this.userService.user!.athlete!.id).subscribe((response) => {
        if (response.status === 'success') {
          const preparedTableData = response.result.map((attendanceRecord) => {
            const coach = attendanceRecord.conductedCoach!.user;
            const coachFullName = `${coach.surname} ${coach.name} ${coach.patronymic || ''}`;

            return { ...attendanceRecord, coachFullName };
          });
          this.attendances.push(...preparedTableData);
        } else {
          this.messageService.add({severity: response.status, summary: response.message || 'Помилка серверу при отриманні даних'});
        }
      }),
    );
  }
}
