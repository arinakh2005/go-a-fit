import { Component, OnInit } from '@angular/core';
import { UserService } from '../../sevices/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemRole } from '../../enums/system-role.enum';
import { TrainingPackageService } from '../../sevices/training-package.service';
import { ActiveUserTrainingPackage } from '../../types/TrainingPackage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public userForm: FormGroup<{
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
  }> | null = null;
  public activeUserTrainingPackage?: ActiveUserTrainingPackage;
  public readonly SystemRole = SystemRole;

  constructor(
    public readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly trainingPackageService: TrainingPackageService,
  ) { }

  public ngOnInit(): void {
    this.initUserForm();
    this.getActiveUserGymSubscription();
  }

  private initUserForm(): void {
    this.userForm = this.formBuilder.group({
      surname: [this.userService.user?.surname, Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])],
      name: [this.userService.user?.name, Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])],
      patronymic: [this.userService.user?.patronymic],
      dateOfBirth: [this.userService.user?.dateOfBirth, Validators.required],
      email: [this.userService.user?.email, Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      phone: [this.userService.user?.phone, Validators.required],
      username: [this.userService.user?.username, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9\s]+'),
      ])],
      password: [this.userService.user?.password, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('/^(?=.*[a-zA-Z]).{8,20}$/'),
      ])],
      imageUrl: [this.userService.user?.imageUrl],
      systemRole: [this.userService.user?.systemRole, Validators.required],
      fitCentAmount: [this.userService.user?.fitCentAmount],
    }) as FormGroup;
  }

  private getActiveUserGymSubscription(): void {
    if (this.userService.user?.systemRole !== SystemRole.Athlete) return;

    this.trainingPackageService.getActiveUserPackages(this.userService.user.id).subscribe((response) => {
      if (response.status !== 'success') return;

      this.activeUserTrainingPackage = response.result;
    });
  }
}
