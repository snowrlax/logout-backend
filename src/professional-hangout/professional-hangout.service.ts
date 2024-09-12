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

  async findRecommended(userId: string) {}

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
