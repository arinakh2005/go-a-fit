import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../../types/Group';
import { GroupService } from '../../sevices/group.service';
import { UserService } from '../../sevices/user.service';
import { SystemRole } from '../../enums/system-role.enum';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ResponseAPI } from '../../types/ResponseAPI';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-tracker',
  templateUrl: './attendance-tracker.component.html',
  styleUrl: './attendance-tracker.component.scss'
})
export class AttendanceTrackerComponent implements OnInit, OnDestroy {
  public groups: Group[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.fetchGroupsData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public openAttendanceJournal(group: Group): void {
    this.router.navigate([`attendance-tracker/group/${group.id}`]);
  }

  private fetchGroupsData(): void {
    if (!this.userService.user) return;

    let fetchMethodName: any = null;

    if (this.userService.user?.systemRole === SystemRole.Coach) {
      fetchMethodName = 'getCoachGroupsByUserId';
    } else if (this.userService.user?.systemRole === SystemRole.Athlete) {
      fetchMethodName = 'getAthleteGroupsByUserId';
    }

    if (!fetchMethodName) return;

    this.subscriptions.push((this.groupService as any)?.[fetchMethodName](this.userService.user.id).subscribe((response: ResponseAPI<Group[]>) => {
      if (response.status === 'success') {
        this.groups.push(...response.result);
      } else {
        this.messageService.add({ severity: response.status, summary: response.message || 'Помилка серверу' });
      }
    }));
  }
}
