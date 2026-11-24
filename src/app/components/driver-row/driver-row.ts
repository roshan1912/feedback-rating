import { Component, Input } from '@angular/core';

import { DriverSummary } from '../../models/trip.model';

@Component({
  selector: 'app-driver-row',
  standalone: true,
  templateUrl: './driver-row.html',
  styleUrl: './driver-row.css',
})
export class DriverRow {
  @Input() driver!: DriverSummary;

  expanded = false;

  toggleDetails(): void {
    this.expanded = !this.expanded;
  }
}
