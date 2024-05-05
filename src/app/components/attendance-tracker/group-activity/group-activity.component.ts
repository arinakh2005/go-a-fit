import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GroupService } from '../../../sevices/group.service';
import { Athlete, AthleteAttendanceDto } from '../../../types/Athlete';

@Component({
  selector: 'app-group-activity',
  templateUrl: './group-activity.component.html',
  styleUrl: './group-activity.component.scss',
})
export class GroupActivityComponent implements OnInit, OnDestroy {
  public groupId: string | null = null;
  public athletes: Athlete[] = [];
  public tableColumns: Column[] = [{ field: 'fullName', header: 'ПІБ', align: 'left', type: 'text', fontWeight: 'bold' }];
  public tableRecords: AthleteAttendanceDto[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly groupService: GroupService,
    private readonly messageService: MessageService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      if (!params.hasOwnProperty('id')) return;

      this.groupId = params['id'];
      this.fetchGroupTrainingByCurrentMonth();
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private fetchGroupTrainingByCurrentMonth(): void {
    if (!this.groupId) return;

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    this.subscriptions.push(
      this.groupService.getGroupAttendanceJournal(this.groupId, currentMonth, currentYear)
        .subscribe((response) => {
          if (response.status !== 'success') return;

          response.result.trainingDates.forEach((date) =>
            this.tableColumns.push({
              field: date,
              header: date,
              type: 'dateTime',
              align: 'center',
              fontWeight: 'normal',
            }),
          );
          this.tableRecords = response.result.athletesAttendances;
        }),
    );
  }
}

interface Column {
  field: string;
  header: string;
  type: 'dateTime' | 'text',
  align: 'right' | 'left' | 'center',
  fontWeight: string,
}