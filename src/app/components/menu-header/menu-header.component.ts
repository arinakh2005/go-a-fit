import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { UserService } from '../../sevices/user.service';
import { AuthService } from '../../sevices/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  public isLoginPage: boolean | null = null;
  public urlChanges$ = new Subject();

  constructor(
    public readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
    public readonly location: Location,
  ) { }

  public ngOnInit(): void {
    this.isLoginPage = this.location.path() === '/login';
    this.location.onUrlChange((url: string) => {
      this.urlChanges$.next(url);
      this.isLoginPage = url === '/login';
    });

    this.menuItems = [
      {
        label: 'Головна',
        icon: PrimeIcons.HOME,
        routerLink: '/',
      },
      {
        label: 'Тренування',
        icon: PrimeIcons.BOLT,
        items: [
          {
            label: 'Перегляд активностей',
            icon: PrimeIcons.CHART_BAR
          },
          {
            label: 'Запит на відпрацювання',
            icon: PrimeIcons.HOURGLASS
          },
        ]
      },
      {
        label: 'Розклад',
        icon: PrimeIcons.CALENDAR,
        routerLink: '/schedule',
      },
      {
        label: 'Тренери',
        icon: PrimeIcons.ID_CARD,
        routerLink: '/coaches',
      },
      {
        label: 'Користувачі',
        icon: PrimeIcons.USERS,
        routerLink: '/users',
      },
    ];
  }

  public signOut(): void {
    this.authService.logout().subscribe(() => {
      this.authService.clearJwtToken();
      this.userService.reset();
      this.router.navigate(['/login']);
    });
  }
}
