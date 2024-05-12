import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../sevices/user.service';
import { AuthService } from '../../sevices/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
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
    });
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
}
