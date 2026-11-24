import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Trip, Feedback, DriverSummary } from '../../models/trip.model';

import { DriverRow } from '../driver-row/driver-row';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DriverRow],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  @Input() trips: Trip[] = [];

  @Input() submissions: Feedback[] = [];

  filter: 'all' | 'low' = 'all';

  get driverSummaries(): DriverSummary[] {
    const summaries: DriverSummary[] = [];

    // Step 1: Create a summary for every driver.
    this.trips.forEach((trip) => {
      let driver = summaries.find((item) => item.driverId === trip.driverId);

      if (!driver) {
        driver = {
          driverId: trip.driverId,
          driverName: trip.driverName,
          tripCount: 0,
          ratingCount: 0,
          averageRating: null,
          feedbacks: [],
        };

        summaries.push(driver);
      }

      driver.tripCount++;
    });

    // Step 2: Associate submitted feedback with drivers.
    this.submissions.forEach((feedback) => {
      const trip = this.trips.find((item) => item.tripId === feedback.tripId);

      if (!trip) return;

      const driver = summaries.find((item) => item.driverId === trip.driverId);

      if (driver) {
        driver.feedbacks.push(feedback);
        driver.ratingCount++;
      }
    });

    // Step 3: Calculate average ratings.
    summaries.forEach((driver) => {
      if (driver.ratingCount > 0) {
        const total = driver.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);

        driver.averageRating = total / driver.ratingCount;
      }
    });

    return summaries;
  }

  get filteredDrivers(): DriverSummary[] {
    if (this.filter === 'low') {
      return this.driverSummaries.filter(
        (driver) => driver.averageRating !== null && driver.averageRating < 3.5,
      );
    }

    return this.driverSummaries;
  }

  get overallAverage(): number {
    if (this.submissions.length === 0) {
      return 0;
    }

    const total = this.submissions.reduce((sum, item) => sum + item.rating, 0);

    return total / this.submissions.length;
  }
}
