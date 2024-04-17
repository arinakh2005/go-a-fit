import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from './sevices/spinner.service';
import { User } from './types/User';
import { AuthService } from './sevices/auth.service';
import { UserService } from './sevices/user.service';
import { finalize, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'go-a-fit-frontend';
  public isAuthDataLoaded = false;

  private subscriptions: Subscription[] = [];

  constructor(
    public readonly spinnerService: SpinnerService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authService.getAuthorizedUser()
        .pipe(finalize(() => this.isAuthDataLoaded = true))
        .subscribe((response) => {
          if (response.status !== 'success') return;

          if (response.result.username) this.userService.user = response.result as User;
        }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription?.unsubscribe());
  }
}
