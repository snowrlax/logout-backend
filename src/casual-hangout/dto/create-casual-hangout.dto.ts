import { HangoutLocation, ParticipationCriteria, User } from "../schema/casual-hangout.schema";

export class CreateCasualHangoutStep1Dto {
    hostId: string;
    hangoutType: string;
    hangoutTitle: string;
    hangoutDescription: string;
    hangoutImages: string[];
    hangoutCategory: string;
    hangoutSubCategory: string;
    date: string;
    startTime: string;
    endTime: string;
    hangoutLocation: HangoutLocation

}

export class CreateCasualHangoutStep2Dto {
    participationCriteria: ParticipationCriteria;
    isApproved: boolean = false;
    isCancelled: boolean = false;
    requestedUsers: User[];
    approvedUsers: User[];  
}
