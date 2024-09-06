import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ApplyHangoutDto,
  CreateCasualHangoutStep1Dto,
  CreateCasualHangoutStep2Dto,
} from './dto/create-casual-hangout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CasualHangout } from './schema/casual-hangout.schema';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class CasualHangoutService {
  constructor(
    @InjectModel(CasualHangout.name)
    private casualHangoutModel: mongoose.Model<CasualHangout>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  createStep1(createCasualHangoutDto: CreateCasualHangoutStep1Dto) {
    try {
      // check if host exists
      const host = this.userModel
        .findById(createCasualHangoutDto.hostId)
        .exec();
      if (!host) {
        throw new NotFoundException(
          `Host with ID ${createCasualHangoutDto.hostId} not found`,
        );
      }

      const newCasualHangout = new this.casualHangoutModel(
        createCasualHangoutDto,
      );
      return newCasualHangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  createStep2(id: string, createCasualHangoutDto: CreateCasualHangoutStep2Dto) {
    try {
      const casualHangout = this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        throw new NotFoundException(`Hangout with ID ${id} not found`);
      }
      return this.casualHangoutModel.findByIdAndUpdate(
        id,
        createCasualHangoutDto,
        {
          new: true,
        },
      );
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async applyHangout(hangoutId: string, applyHangoutDto: ApplyHangoutDto) {
    try {
      const casualHangout = await this.casualHangoutModel
        .findById(hangoutId)
        .exec();
      if (!casualHangout) {
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
      const isUserAlreadyApplied = casualHangout.requestedUsers.find(
        (user) => user.userId === applyHangoutDto.userId,
      );
      if (isUserAlreadyApplied) {
        return 'User already applied';
      }
      casualHangout.requestedUsers.push(applyHangoutDto);
      return casualHangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  findAll() {
    try {
      const casualHangout = this.casualHangoutModel.find().exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return casualHangout;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  findOne(id: string) {
    try {
      const casualHangout = this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return casualHangout;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  updateStep1(id: string, updateCasualHangoutDto: CreateCasualHangoutStep1Dto) {
    try {
      const casualHangout = this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return this.casualHangoutModel.findByIdAndUpdate(
        id,
        updateCasualHangoutDto,
        { new: true },
      );
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  updateStep2(id: string, updateCasualHangoutDto: CreateCasualHangoutStep2Dto) {
    try {
      const casualHangout = this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return this.casualHangoutModel.findByIdAndUpdate(
        id,
        updateCasualHangoutDto,
        { new: true },
      );
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  remove(id: string) {
    try {
      return this.casualHangoutModel.findByIdAndDelete(id);
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }
}
