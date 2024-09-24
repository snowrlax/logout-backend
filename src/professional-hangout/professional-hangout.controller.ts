import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApplyProfessionalHangoutDto,
  CreateProfessionalHangoutStep1Dto,
  CreateProfessionalHangoutStep2Dto,
} from './dto/create-professional-hangout.dto';
import { ProfessionalHangoutService } from './professional-hangout.service';
import { ApiTags } from '@nestjs/swagger';
import { ApproveUserDto } from 'src/casual-hangout/dto/create-casual-hangout.dto';

@ApiTags('Professional Hangout')
@Controller('professional-hangout')
export class ProfessionalHangoutController {
  constructor(
    private readonly professionalHangoutService: ProfessionalHangoutService,
  ) {}

  @Post('step1')
  createStep1(
    @Body() createProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto,
  ) {
    return this.professionalHangoutService.createStep1(
      createProfessionalHangoutDto,
    );
  }

  @Patch('step2/:id')
  createStep2(
    @Param('id') id: string,
    @Body() createProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto,
  ) {
    return this.professionalHangoutService.createStep2(
      id,
      createProfessionalHangoutDto,
    );
  }

  @Patch('/apply/:id')
  applyHangout(
    @Param('id') id: string,
    @Body() applyHangoutDto: ApplyProfessionalHangoutDto,
  ) {
    return this.professionalHangoutService.applyHangout(id, applyHangoutDto);
  }

  @Patch('approve/:id/:hostId')
  approveUser(
    @Param('id') id: string,
    @Param('hostId') hostId: string,
    @Body() approvedUserId: ApproveUserDto,
  ) {
    return this.professionalHangoutService.approveUser(
      hostId,
      id,
      approvedUserId,
    );
  }

  @Patch('paid/:id/:hostId')
  paidUser(
    @Param('id') id: string,
    @Param('hostId') hostId: string,
    @Body() approvedUserId: ApproveUserDto,
  ) {
    return this.professionalHangoutService.paidUser(hostId, id, approvedUserId);
  }

  // mark user as arrived
  @Patch('markarrived/:id/:hostId')
  markArrivedUser(
    @Param('id') id: string,
    @Param('hostId') hostId: string,
    @Body() approvedUserId: ApproveUserDto,
  ) {
    return this.professionalHangoutService.markArrivedUser(
      hostId,
      id,
      approvedUserId,
    );
  }

  @Get()
  findAll() {
    return this.professionalHangoutService.findAll();
  }

  @Get(':userId')
  findRecommended(@Param('userId') userId: string) {
    return this.professionalHangoutService.findRecommended(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalHangoutService.findOne(id);
  }

  // get hangout by name
  @Get(':hangoutName')
  findHangoutByName(@Param('hangoutName') hangoutName: string) {
    return this.professionalHangoutService.findHangoutByName(hangoutName);
  }

  @Patch(':id/step1')
  updateStep1(
    @Param('id') id: string,
    @Body() updateProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto,
  ) {
    return this.professionalHangoutService.updateStep1(
      id,
      updateProfessionalHangoutDto,
    );
  }

  @Patch(':id/step2')
  updateStep2(
    @Param('id') id: string,
    @Body() updateProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto,
  ) {
    return this.professionalHangoutService.updateStep2(
      +id,
      updateProfessionalHangoutDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalHangoutService.remove(+id);
  }
}
