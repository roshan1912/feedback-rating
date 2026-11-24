import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {
  @Input() rating = 0;

  @Output() ratingChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  hoveredRating = 0;

  setRating(value: number): void {
    this.rating = value;
    this.ratingChange.emit(value);
  }

  setHoveredRating(value: number): void {
    this.hoveredRating = value;
  }

  clearHoveredRating(): void {
    this.hoveredRating = 0;
  }

  isActive(star: number): boolean {
    return star <= (this.hoveredRating || this.rating);
  }
}
