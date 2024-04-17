import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemRole } from '../../../enums/system-role.enum';
import { UserRegister, UserUpdate } from '../../../types/User';
import { UserService } from '../../../sevices/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  public userId: string | null = null;
  public form: FormGroup<{
    surname: FormControl<string>,
    name: FormControl<string>,
    patronymic: FormControl<string | null>,
    dateOfBirth: FormControl<string | null>,
    email: FormControl<string>,
    phone: FormControl<string>,
    username: FormControl<string>,
    password: FormControl<string>,
    imageUrl: FormControl<string | null>,
    systemRole: FormControl<SystemRole>,
    fitCentAmount: FormControl<number>,
  }>;

  public readonly systemRoles = [
    { value: SystemRole.Athlete, label: 'Спортсмен' },
    { value: SystemRole.Coach, label: 'Тренер' },
    { value: SystemRole.Admin, label: 'Адміністратор' },
  ];
  public readonly SystemRole = SystemRole;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
  ) {
    this.form = this.formBuilder.group({
      surname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])],
      patronymic: [''],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      phone: ['', Validators.required],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9\s]+'),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('/^(?=.*[a-zA-Z]).{8,20}$/'),
      ])],
      imageUrl: [null],
      systemRole: [SystemRole.Athlete, Validators.required],
      fitCentAmount: [0],
    }) as FormGroup;
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      if (!params.hasOwnProperty('id')) return;

      this.userId = params['id'];
      this.fetchUser();
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onAdd(): void {
    if (!this.form.valid) return;

    const userToCreate = this.form.getRawValue() as unknown as UserRegister;

    this.subscriptions.push(this.userService.createUser(userToCreate).subscribe((response) => {
      console.log(response)
    }));
  }

  public onUpdate(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid || !this.userId) {
      for (let key in this.form.controls) {
        (this.form.controls as any)[key].updateValueAndValidity({ onlySelf: true });

        if ((this.form.controls as any)[key].errors) {
          console.log((this.form.controls as any)[key])
        }
      }
      return;
    }

    const userToUpdate = this.form.getRawValue() as unknown as UserUpdate;

    this.subscriptions.push(this.userService.updateUser(this.userId, userToUpdate).subscribe((response) => {
      console.log(response)
    }));
  }

  public onDelete(): void {
    if (!this.userId) return;

    this.subscriptions.push(this.userService.deleteUser(this.userId).subscribe((result) => {
      console.log(result)
    }));
  }

  public fetchUser(): void {
    if (!this.userId) return;

    this.subscriptions.push(this.userService.getUserById(this.userId).subscribe((response) => {
      if (response.status !== 'success') return;

      const userData = response.result;
      this.form.patchValue({
        surname: userData.surname,
        name: userData.name,
        patronymic: userData.patronymic,
        dateOfBirth: userData.dateOfBirth,
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        password: userData.password,
        imageUrl: userData.imageUrl,
        systemRole: userData.systemRole,
        fitCentAmount: userData.fitCentAmount,
      });
    }));
  }

  public onImageUpload($event: FileUploadHandlerEvent): void {
    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Користувача не існує. Будь ласка, заповніть всі обов\'язкові поля та збережіть дані.' });
      return;
    }

    this.subscriptions.push(this.userService.uploadAvatar(this.userId, $event.files[0]).subscribe((response) => {
      if (response.status === 'success') {
        this.messageService.add({ severity: response.status, summary: 'Успішно оновлено зображення' });
        this.form.controls.imageUrl.patchValue(response.result);
      } else {
        this.messageService.add({ severity: response.status, summary: response.message || 'Помилка завантаження зображення' });
      }
    }));
  }
}