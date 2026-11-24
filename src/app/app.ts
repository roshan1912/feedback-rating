import { Component } from '@angular/core';

import { FeedbackForm } from './components/feedback-form/feedback-form';
import { Dashboard } from './components/dashboard/dashboard';

import { Trip, Feedback } from './models/trip.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedbackForm, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  trips: Trip[] = [
    {
      tripId: 'TRIP-2041',
      driverId: 'DRV-88',
      driverName: 'Ramesh K',
    },
    {
      tripId: 'TRIP-2042',
      driverId: 'DRV-88',
      driverName: 'Ramesh K',
    },
    {
      tripId: 'TRIP-2043',
      driverId: 'DRV-12',
      driverName: 'Suresh P',
    },
    {
      tripId: 'TRIP-2044',
      driverId: 'DRV-31',
      driverName: 'Anil V',
    },
    {
      tripId: 'TRIP-2045',
      driverId: 'DRV-31',
      driverName: 'Anil V',
    },
  ];

  submissions: Feedback[] = [];

  onFeedbackSubmitted(feedback: Feedback): void {
    const alreadyRated = this.submissions.some((item) => item.tripId === feedback.tripId);

    if (alreadyRated) {
      return;
    }

    this.submissions = [...this.submissions, feedback];

    console.log('Feedback submitted:', this.submissions);
  }

  get ratedTripIds(): string[] {
    return this.submissions.map((item) => item.tripId);
  }
}
