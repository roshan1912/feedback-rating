import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Trip, Feedback } from '../../models/trip.model';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [ReactiveFormsModule, StarRating],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css',
})
export class FeedbackForm {
  @Input() trips: Trip[] = [];

  @Input() ratedTripIds: string[] = [];

  @Output() feedbackSubmitted = new EventEmitter<Feedback>();

  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      tripId: ['', Validators.required],
      rating: [null, Validators.required],
      onTime: [true],
      cabClean: [true],
      comment: ['', Validators.maxLength(200)],
    });
  }

  get selectedTrip(): Trip | undefined {
    const tripId = this.feedbackForm.get('tripId')?.value;

    return this.trips.find((trip) => trip.tripId === tripId);
  }

  get commentLength(): number {
    return this.feedbackForm.get('comment')?.value?.length ?? 0;
  }

  isRated(tripId: string): boolean {
    return this.ratedTripIds.includes(tripId);
  }

  submitFeedback(): void {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const feedback = this.feedbackForm.getRawValue() as Feedback;

    if (this.isRated(feedback.tripId)) {
      return;
    }

    this.feedbackSubmitted.emit(feedback);

    this.feedbackForm.reset({
      tripId: '',
      rating: null,
      onTime: true,
      cabClean: true,
      comment: '',
    });
  }
}
