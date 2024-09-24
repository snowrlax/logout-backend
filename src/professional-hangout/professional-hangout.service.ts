import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApplyProfessionalHangoutDto,
  CreateProfessionalHangoutStep1Dto,
  CreateProfessionalHangoutStep2Dto,
} from './dto/create-professional-hangout.dto';
import { ProfessionalHangout } from './schema/professional-hangout.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { ApproveUserDto } from 'src/casual-hangout/dto/create-casual-hangout.dto';
import { SubCategory } from 'src/category/schema/category.schema';

@Injectable()
export class ProfessionalHangoutService {
  constructor(
    @InjectModel(ProfessionalHangout.name)
    private professionalHangoutModel: mongoose.Model<ProfessionalHangout>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async createStep1(
    createProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto,
  ) {
    try {
      const newProfessionalHangout = new this.professionalHangoutModel(
        createProfessionalHangoutDto,
      );
      return newProfessionalHangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async createStep2(
    hangoutId: string,
    createProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto,
  ) {
    try {
      const professionalHangout = await this.professionalHangoutModel
        .findById(hangoutId)
        .exec();
      if (!professionalHangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      return await this.professionalHangoutModel.findByIdAndUpdate(
        hangoutId,
        createProfessionalHangoutDto,
        { new: true },
      );
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async applyHangout(
    hangoutId: string,
    applyHangoutDto: ApplyProfessionalHangoutDto,
  ) {
    try {
      const professionalHangout = await this.professionalHangoutModel
        .findById(hangoutId)
        .exec();
      if (!professionalHangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      // check if user exists
      const user = await this.userModel.findById(applyHangoutDto.userId).exec();
      if (!user) {
        throw new NotFoundException(
          `User with ID ${applyHangoutDto.userId} not found`,
        );
      }
      // check if user is already in the requestedUsers array
      const isUserAlreadyApplied = professionalHangout.requestedUsers.find(
        (user) => user.userId === applyHangoutDto.userId,
      );
      if (isUserAlreadyApplied) {
        return 'User already applied';
      }
      professionalHangout.requestedUsers.push(applyHangoutDto);
      return professionalHangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async approveUser(
    hostId: string,
    hangoutId: string,
    approvedUser: ApproveUserDto,
  ) {
    try {
      const hangout = await this.professionalHangoutModel
        .findById(hangoutId)
        .exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.hostId !== hostId) {
        throw new ForbiddenException('You are not authorized to approve users');
      }
      // check if user exists in the requestedUsers array
      const isUserExists = hangout.requestedUsers.find(
        (user) => user.userId === approvedUser.userId,
      );
      if (!isUserExists) {
        throw new NotFoundException(
          `User with ID ${approvedUser.userId} not found`,
        );
      }
      const approvedUserFiltered = hangout.requestedUsers.filter(
        (user) => user.userId === approvedUser.userId,
      );

      hangout.approvedUsers.push(approvedUserFiltered[0]);

      hangout.requestedUsers = hangout.requestedUsers.filter(
        (user) => user.userId !== approvedUser.userId,
      );
      return hangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async paidUser(
    hostId: string,
    hangoutId: string,
    approvedUser: ApproveUserDto,
  ) {
    try {
      const hangout = await this.professionalHangoutModel
        .findById(hangoutId)
        .exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.hostId !== hostId) {
        throw new ForbiddenException('You are not authorized to approve users');
      }
      // check if user exists in the approvedUsers array
      const isUserExists = hangout.approvedUsers.find(
        (user) => user.userId === approvedUser.userId,
      );
      if (!isUserExists) {
        throw new NotFoundException(
          `User with ID ${approvedUser.userId} not found`,
        );
      }
      const approvedUserFiltered = hangout.approvedUsers.filter(
        (user) => user.userId === approvedUser.userId,
      );

      hangout.paidUsers.push(approvedUserFiltered[0]);

      hangout.approvedUsers = hangout.approvedUsers.filter(
        (user) => user.userId !== approvedUser.userId,
      );
      return hangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async markArrivedUser(
    hostId: string,
    hangoutId: string,
    approvedUser: ApproveUserDto,
  ) {
    try {
      const hangout = await this.professionalHangoutModel
        .findById(hangoutId)
        .exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.hostId !== hostId) {
        throw new ForbiddenException('You are not authorized to approve users');
      }
      // check if user exists in the approvedUsers array
      const isUserExists = hangout.paidUsers.find(
        (user) => user.userId === approvedUser.userId,
      );
      if (!isUserExists) {
        throw new NotFoundException(
          `User with ID ${approvedUser.userId} not found`,
        );
      }
      hangout.paidUsers = hangout.paidUsers.map((user) => {
        if (user.userId === approvedUser.userId) {
          user.markArrived = true;
        }
        return user;
      });

      return await hangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async findRecommended(userId: string) {
    try {
      // get userdata from User model and based on that filter out only those hangouts which matches user category and subcategory
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const subCategory: SubCategory[] = user.intrests.flatMap(
        (intrest) => intrest.subCategories,
      );

      const category = user.intrests.map((intrest) => intrest.categoryName);

      const hangouts = await this.professionalHangoutModel.find().exec();

      const recommendedHangouts = hangouts.filter((hangout) => {
        return category.includes(hangout.hangoutCategory) ||
          subCategory.some(
            (subCat) => subCat.name === hangout.hangoutSubCategory,
          )
          ? hangout
          : null;
      });

      return recommendedHangouts;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async findAll() {
    const professionalHangout = await this.professionalHangoutModel
      .find()
      .exec();
    if (!professionalHangout) {
      return 'Professional Hangout not found';
    }
    return professionalHangout;
  }

  async findOne(id: string) {
    const professionalHangout = await this.professionalHangoutModel
      .findById(id)
      .exec();
    if (!professionalHangout) {
      return 'Professional Hangout not found';
    }
    return professionalHangout;
  }

  async findHangoutByName(hangoutName: string) {
    try {
      const casualHangout = await this.professionalHangoutModel.find({
        name: hangoutName,
      });
      if (!casualHangout) {
        return 'Professional Hangout not found';
      }
      return casualHangout;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async updateStep1(
    id: string,
    updateProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto,
  ) {
    const professionalHangout = await this.professionalHangoutModel
      .findById(id)
      .exec();
    if (!professionalHangout) {
      return 'Professional Hangout not found';
    }
    return this.professionalHangoutModel.findByIdAndUpdate(
      id,
      updateProfessionalHangoutDto,
      { new: true },
    );
  }

  async updateStep2(
    id: number,
    updateProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto,
  ) {
    const professionalHangout = await this.professionalHangoutModel
      .findById(id)
      .exec();
    if (!professionalHangout) {
      return 'Professional Hangout not found';
    }
    return this.professionalHangoutModel.findByIdAndUpdate(
      id,
      updateProfessionalHangoutDto,
      { new: true },
    );
  }

  async remove(id: number) {
    return await this.professionalHangoutModel.findByIdAndDelete(id);
  }
}
