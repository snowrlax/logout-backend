import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApplyHangoutDto,
  ApproveUserDto,
  CreateCasualHangoutStep1Dto,
  CreateCasualHangoutStep2Dto,
} from './dto/create-casual-hangout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CasualHangout } from './schema/casual-hangout.schema';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { SubCategory } from 'src/category/schema/category.schema';

@Injectable()
export class CasualHangoutService {
  constructor(
    @InjectModel(CasualHangout.name)
    private casualHangoutModel: mongoose.Model<CasualHangout>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  findRecommended(userid: string) {
    try {
      // get userdata from User model and based on that filter out only those hangouts which matches user category and subcategory
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
      // match the hangout HostId with hostId if so then the user sending the request is the owner of the hangout
      // check if the approvedUser exists in the requestedUsers array and filter it out and add into approvedUser
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
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
