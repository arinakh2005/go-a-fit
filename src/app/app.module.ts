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

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    ScheduleComponent,
    ScheduleItemFormComponent,
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
  ],
  providers: [GlobalService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
