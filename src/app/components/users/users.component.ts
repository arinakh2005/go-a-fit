import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User, UserRegister, UserUpdate } from '../../types/User';
import { Table } from 'primeng/table';
import { UserService } from '../../sevices/user.service';
import { Subscription } from 'rxjs';
import { SystemRoleColors } from '../../enums/system-role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UserService],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public multiSelectedUsers: User[] = [];
  public isUserFormVisible = false;
  public selectedUser: User | null = null;
  public systemRoleColor = SystemRoleColors;

  private subscriptions: Subscription[] = [];

  @ViewChild('userTable', { static: false })
  public userTable!: Table;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(this.userService.getUsers().subscribe((response) => {
      if (!response.status) {
        this.users = [];
        return;
      }
      this.users = response.result || [];
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onCreateUserClick(): void {

  }

  public onDeleteUsersClick(): void {

  }

  public onEditUserClick(userId: string): void {
    this.router.navigate([`user/${userId}`]);
  }

  public onDeleteUserClick(user: User): void {

  }

  public createUser(userRegister: UserRegister): void {

  }

  public editUser(userToUpdate: UserUpdate): void {

  }

  public deleteUser(userId: string): void {

  }

  public searchUser($event: Event): void {
    this.userTable.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
}
