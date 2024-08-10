import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProfessionalHangoutStep1Dto, CreateProfessionalHangoutStep2Dto } from './dto/create-professional-hangout.dto';
import { ProfessionalHangoutService } from './professional-hangout.service';

@Controller('professional-hangout')
export class ProfessionalHangoutController {
  constructor(
    private readonly professionalHangoutService: ProfessionalHangoutService,
  ) { }

  @Post("step1")
  createStep1(@Body() createProfessionalHangoutDto: CreateProfessionalHangoutStep1Dto) {
    return this.professionalHangoutService.createStep1(createProfessionalHangoutDto);
  }

  @Patch("step2")
  createStep2(@Body() createProfessionalHangoutDto: CreateProfessionalHangoutStep2Dto) {
    return this.professionalHangoutService.createStep2(createProfessionalHangoutDto);
  }

  @Get()
  findAll() {
    return this.professionalHangoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalHangoutService.findOne(id);
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
