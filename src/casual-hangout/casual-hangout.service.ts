import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SubCategory } from 'src/category/schema/category.schema';
import { User } from 'src/user/schema/user.schema';
import {
  ApplyHangoutDto,
  ApproveUserDto,
  CreateCasualHangoutStep1Dto,
  CreateCasualHangoutStep2Dto,
} from './dto/create-casual-hangout.dto';
import { CasualHangout } from './schema/casual-hangout.schema';

@Injectable()
export class CasualHangoutService {
  constructor(
    @InjectModel(CasualHangout.name)
    private casualHangoutModel: mongoose.Model<CasualHangout>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

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

      const hangouts = await this.casualHangoutModel.find().exec();

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

  async getUserStatus(hangoutId: string, userId: string) {
    try {
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      const isUserHost = hangout.hostId === userId;

      if (isUserHost) {
        return { userStatus: { isUserHost: true } };
      }

      const isUserRequested = hangout.requestedUsers.find(
        (user) => user.userId === userId,
      );
      const isUserApproved = hangout.approvedUsers.find(
        (user) => user.userId === userId,
      );
      const isUserPaid = hangout.paidUsers.find(
        (user) => user.userId === userId,
      );
      const isUserArrived = hangout.paidUsers.find(
        (user) => user.userId === userId && user.markArrived === true,
      );
      const userStatus = {
        isUserRequested: isUserRequested ? true : false,
        isUserApproved: isUserApproved ? true : false,
        isUserPaid: isUserPaid ? true : false,
        isUserArrived: isUserArrived ? true : false,
      };
      return { userStatus: userStatus };
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async getAppliedUsers(hangoutId: string) {
    try {
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.requestedUsers.length === 0) {
        throw new NotFoundException(
          `No users applied for hangout with ID ${hangoutId}`,
        );
      }
      return hangout.requestedUsers;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async getApprovedUsers(hangoutId: string) {
    try {
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.approvedUsers.length === 0) {
        throw new NotFoundException(
          `No users approved for hangout with ID ${hangoutId}`,
        );
      }
      return hangout.approvedUsers;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async getPaidUsers(hangoutId: string) {
    try {
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.paidUsers.length === 0) {
        throw new NotFoundException(
          `No users paid for hangout with ID ${hangoutId}`,
        );
      }
      return hangout.paidUsers;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async getArrivedUsers(hangoutId: string) {
    try {
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.paidUsers.length === 0) {
        throw new NotFoundException(
          `No users arrived for hangout with ID ${hangoutId}`,
        );
      }
      const arrivedUsers = await this.userModel.find({
        _id: { $in: hangout.paidUsers.map((user) => user.userId) },
      });
      return arrivedUsers;
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

      const user = await this.userModel.findById(approvedUser.userId).exec();

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

      const approvedUserRequesed = user.requestedHangouts.filter(
        (id) => hangoutId !== id,
      );
      user.acceptedHangouts.push(hangoutId);

      hangout.approvedUsers.push(approvedUserFiltered[0]);

      user.requestedHangouts = approvedUserRequesed;
      user.acceptedHangouts.push(hangoutId);

      hangout.requestedUsers = hangout.requestedUsers.filter(
        (user) => user.userId !== approvedUser.userId,
      );
      user.save();
      hangout.save();
      return;
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
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      const user = await this.userModel.findById(approvedUser.userId).exec();

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

      // remove the hangout from acceptedHangouts array
      user.acceptedHangouts = user.acceptedHangouts.filter(
        (id) => id !== hangoutId,
      );

      // push the hangout into paidHangouts array
      user.paidHangouts.push(hangoutId);

      //push the user into paidUsers array
      hangout.paidUsers.push(approvedUserFiltered[0]);

      // remove the user from approvedUsers array
      hangout.approvedUsers = hangout.approvedUsers.filter(
        (user) => user.userId !== approvedUser.userId,
      );

      user.save();
      hangout.save();
      return;
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
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      if (hangout.hostId !== hostId) {
        throw new ForbiddenException('You are not authorized to approve users');
      }
      // check if user exists in the paidUsers array
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

  async publishHangout(userId: string, hangoutId: string) {
    try {
      const hangout = await this.casualHangoutModel.findById(hangoutId).exec();
      if (!hangout) {
        throw new NotFoundException(`Hangout with ID ${hangoutId} not found`);
      }
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      if (hangout.hostId !== userId) {
        throw new ForbiddenException(
          'You are not authorized to publish hangout',
        );
      }
      hangout.isPublished = true;
      return hangout.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async createStep1(createCasualHangoutDto: CreateCasualHangoutStep1Dto) {
    console.log(createCasualHangoutDto);
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

  async createStep2(
    id: string,
    createCasualHangoutDto: CreateCasualHangoutStep2Dto,
  ) {
    try {
      const casualHangout = await this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        throw new NotFoundException(`Hangout with ID ${id} not found`);
      }
      const updatedHangout = await this.casualHangoutModel.findByIdAndUpdate(
        id,
        createCasualHangoutDto,
        {
          new: true,
        },
      );
      return updatedHangout;
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
      user.requestedHangouts.push(hangoutId);

      user.save();
      casualHangout.save();
      return;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async findAll() {
    try {
      const casualHangout = await this.casualHangoutModel
        .find()
        .limit(25)
        .exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return casualHangout;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async findOne(id: string) {
    try {
      const casualHangout = await this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return casualHangout;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async findHangoutByName(hangoutName: string) {
    try {
      const casualHangout = await this.casualHangoutModel.find({
        name: hangoutName,
      });
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return casualHangout;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async findHangoutsByCity(city: string) {
    try {
      const casualHangout = await this.casualHangoutModel
        .find({
          city: city,
        })
        .limit(25)
        .exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return casualHangout;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async updateStep1(
    id: string,
    updateCasualHangoutDto: CreateCasualHangoutStep1Dto,
  ) {
    try {
      const casualHangout = await this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return await this.casualHangoutModel.findByIdAndUpdate(
        id,
        updateCasualHangoutDto,
        { new: true },
      );
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async updateStep2(
    id: string,
    updateCasualHangoutDto: CreateCasualHangoutStep2Dto,
  ) {
    try {
      const casualHangout = await this.casualHangoutModel.findById(id).exec();
      if (!casualHangout) {
        return 'Casual Hangout not found';
      }
      return await this.casualHangoutModel.findByIdAndUpdate(
        id,
        updateCasualHangoutDto,
        { new: true },
      );
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async remove(id: string) {
    try {
      return await this.casualHangoutModel.findByIdAndDelete(id);
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }
}
