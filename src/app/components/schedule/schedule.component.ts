import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';
import { ScheduleItem } from '../../types/ScheduleItem';
import { DateService } from '../../sevices/date.service';
import { OccasionType } from '../../enums/occasion-type';
import { ScheduleItemService } from '../../sevices/schedule-item.service';
import { MessageService } from 'primeng/api';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OccasionStatus, OccasionStatusStyleClass } from '../../enums/occasion-status.enum';
import { UserService } from '../../sevices/user.service';
import { SystemRole } from '../../enums/system-role.enum';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
  providers: [ScheduleItemService],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @ViewChild('calendarRef', { static: false })
  public calendarRef?: FullCalendarComponent;

  public scheduleOptions!: CalendarOptions;
  public isScheduleItemFormVisible = false;
  public selectedScheduleItem: ScheduleItem = {
    start: new Date(), end: new Date(), title: '',
    occasionType: OccasionType.GroupTraining,
    occasionStatus: OccasionStatus.Planned,
  };

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly scheduleService: ScheduleItemService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) { }

  public ngOnInit(): void {
    this.initScheduleOptions();
    this.subscriptions.push(this.scheduleService.getScheduleItems().subscribe((response) => {
      if (!response.status) {
        this.scheduleOptions.events = [];
        return;
      }
      const scheduleItems = response.result || [];
      this.updateCalendarEvents(scheduleItems);
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onDateCellClick(mode: 'editing' | 'creation', $event: any): void {
    if (this.userService.user?.systemRole !== SystemRole.Admin) return;

    if (mode === 'editing') {
      this.selectedScheduleItem = {
        id: $event.event.extendedProps.id,
        title: $event.event.title,
        start: DateService.formatToString($event.event.start),
        end: DateService.formatToString($event.event.end),
        isAllDay: $event.event.allDay,
        occasionType: $event.event.extendedProps.occasionType,
        occasionStatus: $event.event.extendedProps.occasionStatus,
        coachId: $event.event.extendedProps.coachId,
        athleteId: $event.event.extendedProps.athleteId,
        groupId: $event.event.extendedProps.groupId,
      };
    } else {
      this.selectedScheduleItem = {
        title: '',
        start: DateService.formatToString($event.start),
        end: DateService.formatToString($event.end),
        occasionType: OccasionType.GroupTraining,
        occasionStatus: OccasionStatus.Planned,
      };
    }
    this.isScheduleItemFormVisible = true;
  }

  public createScheduleItem(scheduleItem: ScheduleItem): void {
    this.scheduleService.createScheduleItem(scheduleItem).subscribe((result) => {
      if (result.status === 'success') {
        this.messageService.add({ severity: result.status, summary: 'Успішно створено' });
      } else {
        this.messageService.add({ severity: result.status, summary: result.message || 'Помилка при створенні' });
      }
      this.isScheduleItemFormVisible = false;
      this.scheduleService.getScheduleItems().subscribe((response) => {
        if (response.status === 'success' && response.result.length) this.updateCalendarEvents(response.result);
      });
    });
  }

  public editScheduleItem(scheduleItem: ScheduleItem): void {
    if (!scheduleItem.id) return;

    this.scheduleService.updateScheduleItem(scheduleItem.id, scheduleItem).subscribe((result) => {
      if (result.status === 'success') {
        this.messageService.add({ severity: result.status, summary: 'Успішно оновлено' });
      } else {
        this.messageService.add({ severity: result.status, summary: result.message || 'Помилка оновлення' });
      }
      this.isScheduleItemFormVisible = false;
      this.scheduleService.getScheduleItems().subscribe((response) => {
        if (response.status === 'success' && response.result.length) this.updateCalendarEvents(response.result);
      });
    });
  }

  public deleteScheduleItem(id: string): void {
    if (!id) return;

    this.scheduleService.deleteScheduleItem(id).subscribe((result) => {
      if (result.status === 'success') {
        this.messageService.add({ severity: result.status, summary: 'Успішно видалено' });
      } else {
        this.messageService.add({ severity: result.status, summary: result.message || 'Помилка видалення' });
      }
      this.isScheduleItemFormVisible = false;
      this.scheduleService.getScheduleItems().subscribe((response) => {
        if (response.status === 'success' && Array.isArray(response.result)) this.updateCalendarEvents(response.result);
      });
    });
  }

  private initScheduleOptions(): void {
    this.scheduleOptions = {
      initialView: 'dayGridMonth',
      selectable: this.userService.user?.systemRole === SystemRole.Admin,
      editable: this.userService.user?.systemRole === SystemRole.Admin,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      locale: 'uk',
      events: [],
      headerToolbar: {left: 'dayGridMonth,timeGridWeek', center: 'title', right: 'prev,next'},
      buttonText: {today: 'Сьогодні', month: 'Місяць', week: 'Тиждень', day: 'День', list: 'Список'},
      titleFormat: {year: 'numeric', month: 'long'},
      displayEventEnd: true,
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
      },
      eventClick: ($event) => this.onDateCellClick('editing', $event),
      select: ($event) => this.onDateCellClick('creation', $event),
    };
  }

  private updateCalendarEvents(scheduleItems: ScheduleItem[]): void {
    const calendarEvents: CalendarEvent[] = [];

    scheduleItems.forEach((scheduleItem) => {
      const scheduleEvent: CalendarEvent = {
        extendedProps: {
          ...scheduleItem,
          coachId: scheduleItem.coachId || scheduleItem.coach?.id,
          athleteId: scheduleItem.athleteId || scheduleItem.athlete?.id,
          groupId: scheduleItem.groupId || scheduleItem.group?.id,
        },
        title: scheduleItem.title,
        start: new Date(scheduleItem.start),
        end: new Date(scheduleItem.end),
        color: scheduleItem.group?.color,
        className: OccasionStatusStyleClass.get(scheduleItem.occasionStatus)!,
      } as CalendarEvent;
      calendarEvents.push(scheduleEvent);
    });

    this.scheduleOptions.events = [...calendarEvents];
  }
}

type CalendarEvent = {
  title: string,
  start: Date,
  end: Date,
  className: string,
  color: string,
  extendedProps: {
    id: string,
    coachId?: string,
    athleteId?: string,
    groupId?: string,
    occasionStatus: OccasionStatus,
  },
}