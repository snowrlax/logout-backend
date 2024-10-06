import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateHangoutReviewDto,
  CreateHostReviewDto,
  CreateUserReviewDto,
} from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  CasualHangout,
  User,
} from 'src/casual-hangout/schema/casual-hangout.schema';
import mongoose from 'mongoose';
import { ProfessionalHangout } from 'src/professional-hangout/schema/professional-hangout.schema';
import { Review } from './schema/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: mongoose.Model<Review>,
    @InjectModel(CasualHangout.name)
    private casualHangoutModel: mongoose.Model<CasualHangout>,
    @InjectModel(ProfessionalHangout.name)
    private professionalHangoutModel: mongoose.Model<ProfessionalHangout>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async createUserRating(createReviewDto: CreateUserReviewDto) {
    try {
      return this.reviewModel.create(createReviewDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createHostRating(createReviewDto: CreateHostReviewDto) {
    try {
      return this.reviewModel.create(createReviewDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createHangoutRating(createReviewDto: CreateHangoutReviewDto) {
    try {
      return this.reviewModel.create(createReviewDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findParticipantReviews(id: string) {
    try {
      // check if the user exists
      const user = await this.userModel.findById(id);
      if (!user) {
        return new NotFoundException('User not found');
      }
      // find all reviews where the user is the participant
      return this.reviewModel.find({ participant: id });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findHostReviews(id: string) {
    try {
      // check if the user exists
      const user = await this.userModel.findById(id);
      if (!user) {
        return new NotFoundException('User not found');
      }
      // find all reviews where the user is the host
      return this.reviewModel.find({ host: id });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findHostCategoryWiseReviews(category: string, id: string) {
    try {
      // check if the user exists
      const user = await this.userModel.findById(id);
      if (!user) {
        return new NotFoundException('User not found');
      }
      // get the user's reviews
      const reviews = await this.reviewModel.find({ host: id });
      // filter the reviews by category
      const categoryWiseReviews = reviews.filter((review) => {
        const filteredCategoryReview = review.hostReview.filter(
          (cat) => cat.hangoutCategory === category,
        );
        return filteredCategoryReview;
      });
      return categoryWiseReviews;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findParticipantCategoryWiseReviews(category: string, id: string) {
    try {
      // check if the user exists
      const user = await this.userModel.findById(id);
      if (!user) {
        return new NotFoundException('User not found');
      }
      // get the user's reviews
      const reviews = await this.reviewModel.find({ participant: id });
      // filter the reviews by category
      const categoryWiseReviews = reviews.filter((review) => {
        const filteredCategoryReview = review.participantReview.filter(
          (cat) => cat.hangoutCategory === category,
        );
        return filteredCategoryReview;
      });
      return categoryWiseReviews;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findHangoutReviews(id: string) {
    try {
      // check if the hangout exists
      const hangout = await this.casualHangoutModel.findById(id);
      if (!hangout) {
        return new NotFoundException('Hangout not found');
      }
      // find all reviews where the hangout is the hangout
      return this.reviewModel.find({ hangout: id });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {}

  async remove(id: number) {}
}
