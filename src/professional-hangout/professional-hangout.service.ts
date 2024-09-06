import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ApplyProfessionalHangoutDto,
  CreateProfessionalHangoutStep1Dto,
  CreateProfessionalHangoutStep2Dto,
} from './dto/create-professional-hangout.dto';
import { ProfessionalHangout } from './schema/professional-hangout.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';

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

  findAll() {
    const professionalHangout = this.professionalHangoutModel.find().exec();
    if (!professionalHangout) {
      return 'Professional Hangout not found';
    }
    return professionalHangout;
  }

  findOne(id: string) {
    const professionalHangout = this.professionalHangoutModel
      .findById(id)
      .exec();
    if (!professionalHangout) {
      return 'Professional Hangout not found';
    }
    return professionalHangout;
  }

  updateStep1(
    id: string,
    updateProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto,
  ) {
    const professionalHangout = this.professionalHangoutModel
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

  updateStep2(
    id: number,
    updateProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto,
  ) {
    const professionalHangout = this.professionalHangoutModel
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

  remove(id: number) {
    return this.professionalHangoutModel.findByIdAndDelete(id);
  }
}
