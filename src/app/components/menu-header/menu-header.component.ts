import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { UserService } from '../../sevices/user.service';
import { AuthService } from '../../sevices/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { SystemRole } from '../../enums/system-role.enum';
import { UserBracketComponent } from '../user-bracket/user-bracket.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FitOrderService } from '../../sevices/fit-order.service';
import { RouterPaths } from '../../app-routing.module';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  public activeMenuItem: MenuItem | null = null; // TODO
  public isLoginPage: boolean | null = null;
  public bracketDialogRef?: DynamicDialogRef;
  public urlChanges$ = new Subject();

  constructor(
    public readonly userService: UserService,
    public readonly fitOrderService: FitOrderService,
    public readonly location: Location,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.isLoginPage = this.location.path() === RouterPaths.LOGIN;
    this.location.onUrlChange((url: string) => {
      this.urlChanges$.next(url);
      this.isLoginPage = url === RouterPaths.LOGIN;
      this.menuItems = this.menuItems.map((menuItem) => {
        menuItem.visible = !this.isLoginPage;
        return menuItem;
      });
    });
    this.initMenuOptions();
  }

  public signOut(): void {
    this.authService.logout().subscribe(() => {
      this.authService.clearJwtToken();
      this.userService.reset();
      this.router.navigate([RouterPaths.LOGIN]);
    });
  }

  public openBracket(): void {
    this.bracketDialogRef = this.dialogService.open(UserBracketComponent, {
      header: 'Обрані позиції',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  private initMenuOptions(): void {
    this.menuItems = [];

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
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: RouterPaths.DEFAULT, visible: !this.isLoginPage },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: RouterPaths.SCHEDULE, visible: !this.isLoginPage },
      { label: 'Відвідуваність', icon: PrimeIcons.TABLE, routerLink: RouterPaths.ATTENDANCE_TRACKER, visible: !this.isLoginPage },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: RouterPaths.COACHES, visible: !this.isLoginPage },
      { label: 'Користувачі', icon: PrimeIcons.USERS, routerLink: RouterPaths.USERS, visible: !this.isLoginPage },
      { label: 'Fit-Gifts', icon: PrimeIcons.GIFT, routerLink: RouterPaths.FIT_PRODUCTS, visible: !this.isLoginPage },
    ];
  }

  private getCoachMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: RouterPaths.DEFAULT, visible: !this.isLoginPage },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: RouterPaths.SCHEDULE, visible: !this.isLoginPage },
      { label: 'Відвідуваність', icon: PrimeIcons.TABLE, routerLink: RouterPaths.ATTENDANCE_TRACKER, visible: !this.isLoginPage },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: RouterPaths.COACHES, visible: !this.isLoginPage },
      { label: 'Користувачі', icon: PrimeIcons.USERS, routerLink: RouterPaths.USERS, visible: !this.isLoginPage },
      { label: 'Fit-Gifts', icon: PrimeIcons.GIFT, routerLink: RouterPaths.FIT_PRODUCTS, visible: !this.isLoginPage },
    ];
  }

  private getAthleteMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: RouterPaths.DEFAULT, visible: !this.isLoginPage },
      { label: 'Тренування', icon: PrimeIcons.BOLT, visible: !this.isLoginPage,
        items: [
          { label: 'Перегляд власної активності', icon: PrimeIcons.CHART_BAR, routerLink: RouterPaths.PERSONAL_ACTIVITIES },
          { label: 'Запит на відпрацювання', icon: PrimeIcons.HOURGLASS },
        ],
      },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: RouterPaths.SCHEDULE, visible: !this.isLoginPage },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: RouterPaths.COACHES, visible: !this.isLoginPage },
      { label: 'Fit-Gifts', icon: PrimeIcons.GIFT, routerLink: RouterPaths.FIT_PRODUCTS, visible: !this.isLoginPage },
    ];
  }
}
