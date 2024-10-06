export class CreateUserReviewDto {
  hangoutId: string;
  toUserId: string;
  fromUserId: string;
  rating: number;
  review: string;
}

export class CreateHostReviewDto {
  hangoutId: string;
  toUserId: string;
  fromUserId: string;
  rating: number;
  review: string;
}

export class CreateHangoutReviewDto {
  hangoutId: string;
  userId: string;
  rating: number;
  review: string;
}
