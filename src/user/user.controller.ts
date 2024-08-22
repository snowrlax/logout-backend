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
import { CreateUserStep1Dto, CreateUserStep2Dto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/step1')
  createStep1(@Body() createUserDto: CreateUserStep1Dto) {
    return this.userService.createStep1(createUserDto);
  }

  @Patch('/step2/:userId')
  createStep2(
    @Param('userId') userId: string,
    @Body() createUserDto: CreateUserStep2Dto,
  ) {
    return this.userService.createStep2(userId, createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('step1/:id')
  updateStep1(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserStep1Dto,
  ) {
    return this.userService.updateStep1(id, updateUserDto);
  }

  @Patch('step2/:id')
  updateStep2(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserStep2Dto,
  ) {
    return this.userService.updateStep2(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
