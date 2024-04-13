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
import { HttpClientModule } from '@angular/common/http';
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
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
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

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    ScheduleComponent,
    ScheduleItemFormComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    InvalidFormControlDirective,
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
    AuthModule.forRoot(environment.auth),
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
  ],
  providers: [GlobalService, MessageService, SpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
