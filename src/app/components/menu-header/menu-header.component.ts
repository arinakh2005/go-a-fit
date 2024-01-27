import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  public ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Головна',
        icon: PrimeIcons.HOME,
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
      },
      {
        label: 'Тренери',
        icon: PrimeIcons.USERS,
      },
    ];
  }
}
