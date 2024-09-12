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

  @Patch('/apply/:id')
  applyHangout(
    @Param('id') id: string,
    @Body() applyHangoutDto: ApplyHangoutDto,
  ) {
    return this.casualHangoutService.applyHangout(id, applyHangoutDto);
  }

  @Get()
  findAll() {
    return this.casualHangoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casualHangoutService.findOne(id);
  }

  @Get(':userId')
  findRecommended(@Param('userId') userId: string) {
    return this.casualHangoutService.findRecommended(userId);
  }

  @Patch(':id/step1')
  updateStep1(
    @Param('id') id: string,
    @Body() updateCasualHangoutDto: CreateCasualHangoutStep1Dto,
  ) {
    return this.casualHangoutService.updateStep1(id, updateCasualHangoutDto);
  }

  @Patch(':id/step2')
  updateStep2(
    @Param('id') id: string,
    @Body() updateCasualHangoutDto: CreateCasualHangoutStep2Dto,
  ) {
    return this.casualHangoutService.updateStep2(id, updateCasualHangoutDto);
  }

  @Patch('approve/:id/:hostId')
  approveUser(
    @Param('id') id: string,
    @Param('hostId') hostId: string,
    @Body() approvedUserId: ApproveUserDto,
  ) {
    return this.casualHangoutService.approveUser(hostId, id, approvedUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casualHangoutService.remove(id);
  }
}
