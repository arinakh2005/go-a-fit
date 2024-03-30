import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SystemRole } from '../../../enums/system-role.enum';
import { UserRegister, UserUpdate } from '../../../types/User';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrl: './user-register-form.component.scss',
})
export class UserRegisterFormComponent {
  @Input()
  public isNew: boolean = true;
  @Input()
  public user: UserUpdate = {
    id: '',
    name: '',
    surname: '',
    patronymic: '',
    dateOfBirth: '',
    email: '',
    imageUrl: '',
    username: '',
    password: '',
    systemRole: SystemRole.Athlete,
    fitCentAmount: 0,
  };

  @Output()
  public byClose = new EventEmitter();
  @Output()
  public byAdd = new EventEmitter<UserRegister>();
  @Output()
  public byUpdate = new EventEmitter<UserUpdate>();
  @Output()
  public byDelete = new EventEmitter<string>();

  public form = this.formBuilder.group({
    surname: [null, Validators.compose([
      Validators.required,
      Validators.minLength(2),
    ])],
    name: [null, Validators.compose([
      Validators.required,
      Validators.minLength(2),
    ])],
    patronymic: [null],
    dateOfBirth: [null, Validators.required],
    email: [null,Validators.compose([
      Validators.required,
      Validators.email,
    ])],
    username: [null, Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-Z0-9\s]+'),
    ])],
    password: [null, Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('/^(?=.*[a-zA-Z]).{8,20}$/'),
    ])],
    imageUrl: [null],
    systemRole: [SystemRole.Athlete, Validators.required],
    fitCentAmount: [0],
  });

  public readonly systemRoles = [
    { value: SystemRole.Athlete, label: 'Спортсмен' },
    { value: SystemRole.Coach, label: 'Тренер' },
    { value: SystemRole.Admin, label: 'Адміністратор' },
  ];
  public readonly SystemRole = SystemRole;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  public onAdd(): void {
    if (!this.form.valid) return;

    const { surname, name, patronymic, dateOfBirth, email, username, password, imageUrl, systemRole } = this.form.value;

    this.byAdd.emit({
      surname, name, patronymic, dateOfBirth, imageUrl, systemRole, email, username, password,
    } as unknown as UserRegister);
  }

  public onUpdate(): void {
    if (!this.form.valid) return;

    const { surname, name, patronymic, dateOfBirth, email, username, password, imageUrl, systemRole, fitCentAmount } = this.form.value;

    this.byUpdate.emit({
      id: this.user.id,
      surname, name, patronymic, dateOfBirth, imageUrl, systemRole, email, username, password, fitCentAmount
    } as unknown as UserUpdate);
  }

  public onDelete(): void {
    this.byDelete.emit(this.user.id);
  }
}
