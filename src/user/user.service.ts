import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { CasualHangout } from 'src/casual-hangout/schema/casual-hangout.schema';
import { ProfessionalHangout } from 'src/professional-hangout/schema/professional-hangout.schema';
import { CustomError } from 'src/types';
import {
  AddFriendDto,
  BasicDetailsDto,
  CareerDto,
  CelebrityVerificationDto,
  EducationDto,
  IntrestsDto,
  LoginUserDto,
  LoginUserOtpDto,
  MyContactsDto,
  NgoDetailsDto,
  PersonalPreferencesDto,
  SearchFriendDto,
  SocialsDto,
} from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(CasualHangout.name)
    private casualHangoutModel: mongoose.Model<CasualHangout>,
    @InjectModel(ProfessionalHangout.name)
    private professionalHangoutModel: mongoose.Model<ProfessionalHangout>,
  ) {}

  async loginWithPhonePass(
    loginUserDto: LoginUserDto,
  ): Promise<User | CustomError> {
    try {
      // use bcrypt here to match the hashed password
      const user = await this.userModel.findOne({
        mobileNumber: loginUserDto.mobileNumber,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      console.log('password match ', isMatch);

      if (!isMatch) {
        throw new UnauthorizedException();
      }
      // return user data
      return user;
    } catch (e) {
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async loginWithPhoneOtp(loginUserDto: LoginUserOtpDto) {
    try {
      const user = await this.userModel.findOne({
        mobileNumber: loginUserDto.mobileNumber,
      });

      const STATIC_OTP = '4444';

      console.log(loginUserDto);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (loginUserDto.otp !== STATIC_OTP) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (e) {
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async basicDetails(
    createUserDto: BasicDetailsDto,
  ): Promise<User | CustomError> {
    try {
      const saltOrRounds = 10;
      const password = createUserDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);

      createUserDto.password = hash;

      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async findMyHangouts(userId: string): Promise<any | CustomError> {
    console.log(userId);
    try {
      // find all casual hangouts where the userId is present in requestedUsers or approved users
      const userCasualHangouts = await this.casualHangoutModel
        .find({
          $or: [
            { requestedUsers: { $elemMatch: { userId: userId } } },
            { approvedUsers: { $elemMatch: { userId: userId } } },
          ],
        })
        .exec();

      console.log(userCasualHangouts);

      // find in all professional hangouts where the userId is present in requestedUsers or approved users
      const userProfessionalHangouts = await this.professionalHangoutModel
        .find({
          $or: [
            { requestedUsers: { $elemMatch: { userId: userId } } },
            { approvedUsers: { $elemMatch: { userId: userId } } },
          ],
        })
        .exec();

      console.log(userProfessionalHangouts);

      const upcomingHangouts = {
        casualHangouts: userCasualHangouts.filter(
          (hangout) =>
            hangout.date > new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
        professionalHangouts: userProfessionalHangouts.filter(
          (hangout) =>
            hangout.date > new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
      };

      const pastHangouts = {
        casualHangouts: userCasualHangouts.filter(
          (hangout) =>
            hangout.date < new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
        professionalHangouts: userProfessionalHangouts.filter(
          (hangout) =>
            hangout.date < new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
      };
      return {
        userCasualHangouts,
        userProfessionalHangouts,
        upcomingHangouts,
        pastHangouts,
      };
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async findMyHostedHangouts(userId: string): Promise<any | CustomError> {
    try {
      // find in all casual hangouts where the hostId is userId
      const userCasualHangouts = await this.casualHangoutModel
        .find({ hostId: userId })
        .exec();

      // find in all professional hangouts where the hostId is userId
      const userProfessionalHangouts = await this.professionalHangoutModel
        .find({ hostId: userId })
        .exec();

      const upcomingHangouts = {
        casualHangouts: userCasualHangouts.filter(
          (hangout) =>
            hangout.date > new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
        professionalHangouts: userProfessionalHangouts.filter(
          (hangout) =>
            hangout.date > new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
      };

      const pastHangouts = {
        casualHangouts: userCasualHangouts.filter(
          (hangout) =>
            hangout.date < new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
        professionalHangouts: userProfessionalHangouts.filter(
          (hangout) =>
            hangout.date < new Date().toISOString() &&
            !hangout.isCancelled &&
            hangout.isPublished,
        ),
      };

      const myDraftHangouts = {
        casualHangouts: userCasualHangouts.filter(
          (hangout) => !hangout.isPublished,
        ),
        professionalHangouts: userProfessionalHangouts.filter(
          (hangout) => !hangout.isPublished,
        ),
      };

      const myCancelledHangouts = {
        casualHangouts: userCasualHangouts.filter(
          (hangout) => hangout.isCancelled,
        ),
        professionalHangouts: userProfessionalHangouts.filter(
          (hangout) => hangout.isCancelled,
        ),
      };

      return {
        userCasualHangouts,
        userProfessionalHangouts,
        upcomingHangouts,
        pastHangouts,
        myDraftHangouts,
        myCancelledHangouts,
      };
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async intrests(
    userId: string,
    createUserDto: IntrestsDto,
  ): Promise<User | CustomError> {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      user.intrests.push(...createUserDto.intrests);
      return user.save();
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.response.statusCode };
    }
  }

  async career(
    userId: string,
    careerDto: CareerDto,
  ): Promise<User | CustomError> {
    try {
      return await this.userModel.findByIdAndUpdate(userId, careerDto, {
        new: true,
      });
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async education(userId: string, educationDto: EducationDto) {
    try {
      return await this.userModel.findByIdAndUpdate(userId, educationDto, {
        new: true,
      });
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async socials(userId: string, socialsDto: SocialsDto) {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      console.log(user.socials);
      // Merge the existing socials with the updated ones
      user.socials = {
        ...user.socials,
        ...socialsDto,
      };

      await user.save();
      return user;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async myContacts(userId: string, createUserDto: MyContactsDto) {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // check if the partner with that id exists
      const partnerExists = this.userModel.findById(
        createUserDto.partner.userId,
      );

      if (!partnerExists) {
        throw new NotFoundException(
          `Partner with ID ${createUserDto.partner.userId} not found`,
        );
      }

      await user.save();
      return user;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async preferences(userId: string, createUserDto: PersonalPreferencesDto) {
    try {
      return await this.userModel.findByIdAndUpdate(userId, createUserDto, {
        new: true,
      });
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async ngoDetails(userId: string, createUserDto: NgoDetailsDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(userId, createUserDto, {
        new: true,
      })
      .exec();

    return user;
  }

  async celebrity(userId: string, createUserDto: CelebrityVerificationDto) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(userId, createUserDto, {
        new: true,
      })
      .exec();

    return user;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async updateBasicDetails(id: string, updateUserDto: BasicDetailsDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async updateIntrests(id: string, updateUserDto: IntrestsDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async findFriend(searchFriendDto: SearchFriendDto) {
    try {
      // check if user exists if either mobile number or name matches
      const user = await this.userModel.findOne({
        $or: [
          { mobileNumber: searchFriendDto.mobileNumber },
          { username: searchFriendDto.username },
        ],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async addFriend(addFriendDto: AddFriendDto) {
    try {
      // check if user exists
      const user = await this.userModel.findById(addFriendDto.userId);
      const currentUser = await this.userModel.findById(addFriendDto.myId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // check if the user is already a friend
      const alreadyFriend = user.myFriends.includes(addFriendDto.userId);
      if (alreadyFriend) {
        throw new Error('Already a friend');
      }

      // check if the user is already in the requested array of user
      const alreadyRequested = user.requests.includes(addFriendDto.myId);
      if (alreadyRequested) {
        throw new Error('Already requested');
      }

      // add the user to the requests
      user.requests.push(addFriendDto.myId);
      // add the user to the sentRequests
      currentUser.sentRequests.push(addFriendDto.userId);

      // save the user and currentUser
      await user.save();

      await currentUser.save();

      return { message: 'Friend request sent' };
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async acceptFriend(acceptFriend: AddFriendDto) {
    try {
      // check if userId exists in myId's requested array
      const user = await this.userModel.findById(acceptFriend.myId);
      const currentUser = await this.userModel.findById(acceptFriend.userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // check if the currentUser is already a friend
      const alreadyFriend = user.myFriends.includes(acceptFriend.userId);
      if (alreadyFriend) {
        throw new Error('Already a friend');
      }

      // check if the currentUser is already in the requested array of user
      const alreadyRequested = user.requests.includes(acceptFriend.userId);
      if (!alreadyRequested) {
        throw new Error('Not requested');
      }

      // remove the user from the requests array
      user.requests = user.requests.filter(
        (request) => request !== acceptFriend.userId,
      );
      // add the user to the myFriends array
      user.myFriends.push(acceptFriend.userId);

      // remove the user from the sentRequests array
      currentUser.sentRequests = currentUser.sentRequests.filter(
        (sentRequest) => sentRequest !== acceptFriend.myId,
      );
      // add the user to the myFriends array
      currentUser.myFriends.push(acceptFriend.myId);

      // save the user and currentUser
      await user.save();

      await currentUser.save();

      return { message: 'Friend request accepted' };
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async removeFriend(removeFriendDto: AddFriendDto) {
    try {
      // check if user exists
      const user = await this.userModel.findById(removeFriendDto.userId);
      const currentUser = await this.userModel.findById(removeFriendDto.myId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // check if the user is already a friend
      const alreadyFriend = user.myFriends.includes(removeFriendDto.myId);
      if (!alreadyFriend) {
        throw new Error('Not a friend');
      }

      // remove the user from the
      user.myFriends = user.myFriends.filter(
        (friend) => friend !== removeFriendDto.myId,
      );
      // remove the user from the
      currentUser.myFriends = currentUser.myFriends.filter(
        (friend) => friend !== removeFriendDto.userId,
      );

      // save the user and currentUser
      await user.save();

      await currentUser.save();

      return { message: 'Friend removed' };
    } catch (e) {
      console.log(e);
      return { message: e.message, statusCode: e.code };
    }
  }

  async remove(id: number) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
