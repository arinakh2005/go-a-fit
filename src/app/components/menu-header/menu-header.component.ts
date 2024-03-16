import { Component, Inject, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService, LogoutOptions } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  constructor(
    public readonly authService: AuthService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) { }

  public ngOnInit(): void {
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
        icon: PrimeIcons.USERS,
      },
    ];
  }

  public login(): void {
    this.authService.loginWithRedirect();
  }

  public logout(): void {
    this.authService.logout();
  }
}
