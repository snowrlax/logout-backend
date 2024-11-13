import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CasualHangout } from 'src/casual-hangout/schema/casual-hangout.schema';
import { ProfessionalHangout } from 'src/professional-hangout/schema/professional-hangout.schema';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class HangoutsService {
  constructor(
    @InjectModel(CasualHangout.name)
    private casualHangoutModel: mongoose.Model<CasualHangout>,
    @InjectModel(ProfessionalHangout.name)
    private professionalHangoutModel: mongoose.Model<ProfessionalHangout>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll() {
    const casualHangouts = await this.casualHangoutModel
      .find()
      .limit(25)
      .exec();
    const professionalHangouts = await this.professionalHangoutModel
      .find()
      .limit(25)
      .exec();
    return [...casualHangouts, ...professionalHangouts];
  }

  async getRecommendedHangouts(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    const subCategory = user.intrests.flatMap(
      (intrest) => intrest.subCategories,
    );
    const category = user.intrests.map((intrest) => intrest.categoryName);
    const casualHangouts = await this.casualHangoutModel
      .find({
        category: { $in: category },
        subCategory: { $in: subCategory },
      })
      .limit(25)
      .exec();
    const professionalHangouts = await this.professionalHangoutModel
      .find({
        category: { $in: category },
        subCategory: { $in: subCategory },
      })
      .limit(25)
      .exec();

    return [...casualHangouts, ...professionalHangouts];
  }

  async getNearbyHangouts(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    const location = user && user.userAddress && user.userAddress.city;
    if (!location) {
      const casualHangouts = await this.casualHangoutModel
        .find()
        .limit(25)
        .exec();
      const professionalHangouts = await this.professionalHangoutModel
        .find()
        .limit(25)
        .exec();
      return [...casualHangouts, ...professionalHangouts];
    }

    const casualHangouts = await this.casualHangoutModel
      .find({ location })
      .limit(25)
      .exec();
    const professionalHangouts = await this.professionalHangoutModel
      .find({ location })
      .limit(25)
      .exec();

    return [...casualHangouts, ...professionalHangouts];
  }
}
