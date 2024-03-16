import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SpinnerService } from './sevices/spinner.service';
import { Subscription } from 'rxjs';

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
    public readonly authService: AuthService,
    public readonly spinnerService: SpinnerService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(this.authService.isLoading$.subscribe((isLoading) => {
      isLoading ? this.spinnerService.show() : this.spinnerService.hide();
      this.isAuthDataLoaded = !isLoading;
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription?.unsubscribe());
  }
}
