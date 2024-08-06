export class CreateHangoutDto {
  // step 1
  userID: string;
  hangoutType: string;
  hangoutCategory: string;
  hangoutSubCategory: string;
  hangoutTitle: string;
  hangoutDescription: string;
  hangoutImages: string[];
  date: string;
  startTime: string;
  endTime: string;
  location: HangoutLocation;

  // step 2
  participationCriteria: ParticipationCriteria;
  individual: boolean;
  couple: boolean;
  anyone: boolean;
  individualSeats: number;
  coupleSeats: number;

  // step 3
  participationInformation: string;
  bringYourOwn: string;

  // step 4
  individualPrice: number;
  couplePrice: number;
}
