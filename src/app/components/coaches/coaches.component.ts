import { Component } from '@angular/core';
import { GlobalService } from '../../sevices/global.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss',
})
export class CoachesComponent {
  constructor(public readonly globalService: GlobalService) { }
}
