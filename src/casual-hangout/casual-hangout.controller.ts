import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CasualHangoutService } from './casual-hangout.service';
import {
  ApplyHangoutDto,
  ApproveUserDto,
  CreateCasualHangoutStep1Dto,
  CreateCasualHangoutStep2Dto,
} from './dto/create-casual-hangout.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Casual Hangout')
@Controller('casual-hangout')
export class CasualHangoutController {
  constructor(private readonly casualHangoutService: CasualHangoutService) {}

  @Post('/step1')
  createStep1(@Body() createCasualHangoutDto: CreateCasualHangoutStep1Dto) {
    return this.casualHangoutService.createStep1(createCasualHangoutDto);
  }

  @Patch('/step2/:id')
  createStep2(
    @Param('id') id: string,
    @Body() createCasualHangoutDto: CreateCasualHangoutStep2Dto,
  ) {
    return this.casualHangoutService.createStep2(id, createCasualHangoutDto);
  }

  // apply to hanngout
  @Patch('/apply/:id')
  applyHangout(
    @Param('id') id: string,
    @Body() applyHangoutDto: ApplyHangoutDto,
  ) {
    return this.casualHangoutService.applyHangout(id, applyHangoutDto);
  }

  // get all hangouts
  @Get()
  findAll() {
    return this.casualHangoutService.findAll();
  }

  // get hangout by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casualHangoutService.findOne(id);
  }

  // get hangout by name
  @Get(':hangoutName')
  findHangoutByName(@Param('hangoutName') hangoutName: string) {
    return this.casualHangoutService.findHangoutByName(hangoutName);
  }

  // get recommended user hangouts
  @Get(':userId')
  findRecommended(@Param('userId') userId: string) {
    return this.casualHangoutService.findRecommended(userId);
  }

  // update step 1
  @Patch(':id/step1')
  updateStep1(
    @Param('id') id: string,
    @Body() updateCasualHangoutDto: CreateCasualHangoutStep1Dto,
  ) {
    return this.casualHangoutService.updateStep1(id, updateCasualHangoutDto);
  }

  // update step 2
  @Patch(':id/step2')
  updateStep2(
    @Param('id') id: string,
    @Body() updateCasualHangoutDto: CreateCasualHangoutStep2Dto,
  ) {
    return this.casualHangoutService.updateStep2(id, updateCasualHangoutDto);
  }

  // approve users that has requested to join hangout
  @Patch('approve/:id/:hostId')
  approveUser(
    @Param('id') id: string,
    @Param('hostId') hostId: string,
    @Body() approvedUserId: ApproveUserDto,
  ) {
    return this.casualHangoutService.approveUser(hostId, id, approvedUserId);
  }

  // mark user as paid
  @Patch('paid/:id/:hostId')
  paidUser(
    @Param('id') id: string,
    @Param('hostId') hostId: string,
    @Body() approvedUserId: ApproveUserDto,
  ) {
    return this.casualHangoutService.paidUser(hostId, id, approvedUserId);
  }

  // mark user as arrived
  @Patch('markarrived/:id/:hostId')
  markArrivedUser(
    @Param('id') id: string,
    @Param('hostId') hostId: string,
    @Body() approvedUserId: ApproveUserDto,
  ) {
    return this.casualHangoutService.markArrivedUser(
      hostId,
      id,
      approvedUserId,
    );
  }

  // delete hangout
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casualHangoutService.remove(id);
  }
}
