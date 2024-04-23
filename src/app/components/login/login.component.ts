import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../sevices/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserLogin } from '../../types/User';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../sevices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form: FormGroup<{
    username: FormControl<string>,
    password: FormControl<string>,
  }>;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9._\s]+'),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern('/^(?=.*[a-zA-Z]).{8,20}$/'), // TODO: add validation
      ])],
    }) as FormGroup;
  }

  public ngOnInit(): void {
    if (this.userService.user) {
      this.router.navigate(['/']);
    }
  }

  public signIn(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      for (let key in this.form.controls) {
        (this.form.controls as any)[key].updateValueAndValidity({ onlySelf: true });
      }
      return;
    }

    const userLogin = this.form.getRawValue() as UserLogin;

    this.authService.login(userLogin).subscribe((response) => {
      if (response.status === 'success') {
        this.authService.setJwtToken(response.result.authToken);
        this.userService.user = response.result.user as User;
        this.router.navigate(['/']);
      } else {
        this.messageService.add({ severity: response.status, summary: response.message || 'Помилка серверу. Спробуйте, будь ласка, пізніше' });
      }
    });
  }
}
