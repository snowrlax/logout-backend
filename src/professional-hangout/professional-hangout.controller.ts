import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProfessionalHangoutDto } from './dto/create-professional-hangout.dto';
import { UpdateProfessionalHangoutDto } from './dto/update-professional-hangout.dto';
import { ProfessionalHangoutService } from './professional-hangout.service';

@Controller('professional-hangout')
export class ProfessionalHangoutController {
  constructor(
    private readonly professionalHangoutService: ProfessionalHangoutService,
  ) {}

  @Post()
  create(@Body() createProfessionalHangoutDto: CreateProfessionalHangoutDto) {
    return this.professionalHangoutService.create(createProfessionalHangoutDto);
  }

  @Get()
  findAll() {
    return this.professionalHangoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalHangoutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessionalHangoutDto: UpdateProfessionalHangoutDto,
  ) {
    return this.professionalHangoutService.update(
      +id,
      updateProfessionalHangoutDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalHangoutService.remove(+id);
  }
}
