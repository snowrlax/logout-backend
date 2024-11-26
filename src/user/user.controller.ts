import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginWithPhonePass(loginUserDto);
  }

  @Post('/loginWithOtp')
  loginWithOtp(@Body() loginUserDto: LoginUserOtpDto) {
    return this.userService.loginWithPhoneOtp(loginUserDto);
  }

  @Post('/basicDetails')
  basicDetails(@Body() createUserDto: BasicDetailsDto) {
    return this.userService.basicDetails(createUserDto);
  }

  @Patch('/intrests/:userId')
  intrests(
    @Param('userId') userId: string,
    @Body() createUserDto: IntrestsDto,
  ) {
    return this.userService.intrests(userId, createUserDto);
  }

  @Patch('/career/:userId')
  career(@Param('userId') userId: string, @Body() createUserDto: CareerDto) {
    return this.userService.career(userId, createUserDto);
  }

  @Patch('/education/:userId')
  education(
    @Param('userId') userId: string,
    @Body() createUserDto: EducationDto,
  ) {
    return this.userService.education(userId, createUserDto);
  }

  @Patch('/socials/:userId')
  socials(@Param('userId') userId: string, @Body() createUserDto: SocialsDto) {
    return this.userService.socials(userId, createUserDto);
  }

  @Patch('/mycontacts/:userId')
  myContacts(
    @Param('userId') userId: string,
    @Body() createUserDto: MyContactsDto,
  ) {
    return this.userService.myContacts(userId, createUserDto);
  }

  @Patch('/preferences/:userId')
  preferences(
    @Param('userId') userId: string,
    @Body() createUserDto: PersonalPreferencesDto,
  ) {
    return this.userService.preferences(userId, createUserDto);
  }

  @Patch('/ngoDetails/:userId')
  ngoDetails(
    @Param('userId') userId: string,
    @Body() createUserDto: NgoDetailsDto,
  ) {
    return this.userService.ngoDetails(userId, createUserDto);
  }

  @Patch('/celebrityArena/:userId')
  celebrity(
    @Param('userId') userId: string,
    @Body() createUserDto: CelebrityVerificationDto,
  ) {
    return this.userService.celebrity(userId, createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/hangouts/participant/:id')
  findMyHangouts(@Param('id') id: string) {
    return this.userService.findMyHangouts(id);
  }

  @Get('/hangouts/host/:id')
  findMyHostedHangouts(@Param('id') id: string) {
    return this.userService.findMyHostedHangouts(id);
  }

  @Post('/friends/searchFriend')
  findFriend(@Body() searchFriendDto: SearchFriendDto) {
    console.log('search friend dto :', searchFriendDto);

    return this.userService.findFriend(searchFriendDto);
  }

  @Patch('/friends/addFriend')
  addFriend(@Body() addFriendDto: AddFriendDto) {
    return this.userService.addFriend(addFriendDto);
  }

  @Patch('/friends/acceptFriend')
  acceptFriend(@Body() acceptFriend: AddFriendDto) {
    return this.userService.acceptFriend(acceptFriend);
  }

  @Delete('/friends/removeFriend')
  removeFriend(@Body() removeFriendDto: AddFriendDto) {
    return this.userService.removeFriend(removeFriendDto);
  }

  @Patch('basicDetails/:id')
  updateBasicDetails(
    @Param('id') id: string,
    @Body() updateUserDto: BasicDetailsDto,
  ) {
    return this.userService.updateBasicDetails(id, updateUserDto);
  }

  @Patch('intrests/:id')
  updateIntrests(@Param('id') id: string, @Body() updateUserDto: IntrestsDto) {
    return this.userService.updateIntrests(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
