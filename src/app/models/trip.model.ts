export interface Trip {
  tripId: string;
  driverId: string;
  driverName: string;
}

export interface Feedback {
  tripId: string;
  rating: number;
  onTime: boolean;
  cabClean: boolean;
  comment: string;
}

export interface DriverSummary {
  driverId: string;
  driverName: string;
  tripCount: number;
  ratingCount: number;
  averageRating: number | null;
  feedbacks: Feedback[];
}
