import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { SystemRoleGuard } from './guards/system-role.guard';
import { SystemRole } from './enums/system-role.enum';
import { AttendanceTrackerComponent } from './components/attendance-tracker/attendance-tracker.component';
import { FitProductsComponent } from './components/fit-products/fit-products.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { PersonalActivitiesComponent } from './components/personal-activities/personal-activities.component';
import { GroupActivityComponent } from './components/attendance-tracker/group-activity/group-activity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'attendance-tracker', component: AttendanceTrackerComponent },
  { path: 'attendance-tracker/group/:id', component: GroupActivityComponent, canActivate: [SystemRoleGuard], data: { roles: [SystemRole.Admin, SystemRole.Coach] }},
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [SystemRoleGuard], data: { roles: [SystemRole.Admin, SystemRole.Coach] }},
  { path: 'user/new', component: UserComponent, canActivate: [SystemRoleGuard], data: { roles: [SystemRole.Admin] }},
  { path: 'user/:id', component: UserComponent },
  { path: 'user-register', component: UserComponent, canActivate: [SystemRoleGuard], data: { roles: [SystemRole.Admin] }},
  { path: 'coaches', component: CoachesComponent },
  { path: 'fit-products', component: FitProductsComponent },
  { path: 'personal-activities', component: PersonalActivitiesComponent },
  { path: '**', redirectTo: 'home' },
];

export const RouterPaths = {
  DEFAULT: '/',
  HOME: '/home',
  SCHEDULE: '/schedule',
  ATTENDANCE_TRACKER: '/attendance-tracker',
  PERSONAL_ACTIVITIES: '/personal-activities',
  LOGIN: '/login',
  USERS: '/users',
  COACHES: '/coaches',
  FIT_PRODUCTS: '/fit-products',
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
