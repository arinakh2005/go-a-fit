import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ScheduleItemFormComponent } from './components/schedule/schedule-item-form/schedule-item-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalService } from './sevices/global.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './components/login/login.component';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerService } from './sevices/spinner.service';
import { UserComponent } from './components/users/user/user.component';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { DividerModule } from 'primeng/divider';
import { UsersComponent } from './components/users/users.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { InvalidFormControlDirective } from './directives/invalid-form-control.directive';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './sevices/auth.service';
import { UserService } from './sevices/user.service';
import { ValidationMessageService } from './sevices/validation.service';
import { SystemRoleGuard } from './guards/system-role.guard';
import { AttendanceTrackerComponent } from './components/attendance-tracker/attendance-tracker.component';
import { GroupService } from './sevices/group.service';
import { FitProductsComponent } from './components/fit-products/fit-products.component';
import { DataViewModule } from 'primeng/dataview';
import { FitProductService } from './sevices/fit-product.service';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { TrainingPackageService } from './sevices/training-package.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuHeaderComponent,
    ScheduleComponent,
    ScheduleItemFormComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    InvalidFormControlDirective,
    AttendanceTrackerComponent,
    FitProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    PanelMenuModule,
    StyleClassModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    InputMaskModule,
    DropdownModule,
    ToastModule,
    RippleModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputGroupAddonModule,
    InputGroupModule,
    DividerModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    TagModule,
    ImageModule,
    FileUploadModule,
    DataViewModule,
    RatingModule,
    AvatarModule,
    ChipModule,
  ],
  providers: [
    GlobalService,
    MessageService,
    SpinnerService,
    AuthService,
    UserService,
    TrainingPackageService,
    GroupService,
    FitProductService,
    ValidationMessageService,
    SystemRoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
