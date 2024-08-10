import { HangoutLocation, ParticipationCriteria } from "../schema/professional-hangout.schema";

export class CreateProfessionalHangoutStep1Dto {
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
  hangoutLocation: HangoutLocation;

}

export class CreateProfessionalHangoutStep2Dto {
    participationCriteria: ParticipationCriteria;
    individual: boolean;
    couple: boolean;
    anyone: boolean;
    individualSeats: number;
    coupleSeats: number;
    participationInformation: string;
    bringYourOwn: string;
    individualPrice: number;
    couplePrice: number;
    isApproved: boolean;
    isCancelled: boolean;
}