import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScheduleItem } from '../../../types/ScheduleItem';
import { OccasionType } from '../../../enums/occasion-type';
import { DateService } from '../../../sevices/date.service';
import { GlobalService } from '../../../sevices/global.service';

@Component({
  selector: 'app-schedule-item-form',
  templateUrl: './schedule-item-form.component.html',
  styleUrl: './schedule-item-form.component.scss',
})
export class ScheduleItemFormComponent implements OnChanges {
  @Input()
  public isNew: boolean = true;
  @Input()
  public scheduleItem: ScheduleItem = { title: '', start: '', end: '', isAllDay: false, occasionType: OccasionType.GroupTraining };

  @Output()
  public byClose = new EventEmitter();
  @Output()
  public byAdd = new EventEmitter<ScheduleItem>();
  @Output()
  public byUpdate = new EventEmitter<ScheduleItem>();
  @Output()
  public byDelete = new EventEmitter<string>();

  public form = this.formBuilder.group({
    title: [null, Validators.required],
    isAllDay: [null],
    start: [DateService.formatToString(), Validators.required],
    end: [DateService.formatToString(), Validators.required],
    occasionType: [OccasionType.GroupTraining, Validators.required],
    groupId: [null, Validators.required],
    coachId: [null, Validators.required],
    athleteId: [null, Validators.required],
  });

  public readonly occasionTypes = [
    { value: OccasionType.GroupTraining, label: 'Групове заняття' },
    { value: OccasionType.PersonalTraining, label: 'Індивідуальне заняття' },
    { value: OccasionType.Holiday, label: 'Вихідний' },
    { value: OccasionType.Competition, label: 'Змагання' },
    { value: OccasionType.Other, label: 'Інше'},
  ];
  public readonly OccasionTypes = OccasionType;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly globalService: GlobalService,
  ) { }

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.scheduleItem && simpleChanges.scheduleItem.currentValue) {
      this.form.patchValue({ ...this.scheduleItem as any });
    }
  }

  public onAdd(): void {
    const { end, start, title, isAllDay, occasionType, coachId, groupId, athleteId } = this.form.value;
    if (!start || !end) return;

    this.byAdd.emit({
      start: DateService.formatToISOString(start),
      end: DateService.formatToISOString(end),
      title, isAllDay, occasionType, coachId, groupId, athleteId,
    } as unknown as ScheduleItem);
  }

  public onUpdate(): void {
    const { end, start, title, isAllDay, occasionType, coachId, groupId, athleteId } = this.form.value;
    if (!start || !end) return;

    this.byUpdate.emit({
      id: this.scheduleItem?.id,
      start: DateService.formatToISOString(start),
      end: DateService.formatToISOString(end),
      title, isAllDay, occasionType, coachId, groupId, athleteId,
    } as unknown as ScheduleItem);
  }

  public onDelete(): void {
    this.byDelete.emit(this.scheduleItem?.id);
  }
}
