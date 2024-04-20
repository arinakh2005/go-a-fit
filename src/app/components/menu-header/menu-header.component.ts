import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { UserService } from '../../sevices/user.service';
import { AuthService } from '../../sevices/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { SystemRole } from '../../enums/system-role.enum';

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
    this.initMenuOptions();
  }

  public signOut(): void {
    this.authService.logout().subscribe(() => {
      this.authService.clearJwtToken();
      this.userService.reset();
      this.router.navigate(['/login']);
    });
  }

  private initMenuOptions(): void {
    if (this.userService.user?.systemRole === SystemRole.Admin) {
      this.menuItems.push(...this.getAdminMenuOptions());
    } else if (this.userService.user?.systemRole === SystemRole.Coach) {
      this.menuItems.push(...this.getCoachMenuOptions());
    } else {
      this.menuItems.push(...this.getAthleteMenuOptions());
    }
  }

  private getAdminMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: '/' },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: '/schedule' },
      { label: 'Відвідуваність', icon: PrimeIcons.ID_CARD, routerLink: `/attendance-tracker` },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: '/coaches' },
      { label: 'Користувачі', icon: PrimeIcons.USERS, routerLink: '/users' },
    ];
  }

  private getCoachMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: '/' },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: '/schedule' },
      { label: 'Облік відвідувань', icon: PrimeIcons.ID_CARD, routerLink: `/attendance-tracker/coach/${this.userService.user?.id}` },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: '/coaches' },
      { label: 'Користувачі', icon: PrimeIcons.USERS, routerLink: '/users' },
    ];
  }

  private getAthleteMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: '/' },
      { label: 'Тренування', icon: PrimeIcons.BOLT,
        items: [
          { label: 'Перегляд власної активності', icon: PrimeIcons.CHART_BAR },
          { label: 'Запит на відпрацювання', icon: PrimeIcons.HOURGLASS },
        ],
      },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: '/schedule' },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: '/coaches' },
    ];
  }
}
