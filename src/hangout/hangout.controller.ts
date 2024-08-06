import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHangoutDto } from './dto/create-hangout.dto';
import { UpdateHangoutDto } from './dto/update-hangout.dto';
import { HangoutService } from './hangout.service';

@Controller('hangout')
export class HangoutController {
  constructor(private readonly hangoutService: HangoutService) {}

  @Post()
  create(@Body() createHangoutDto: CreateHangoutDto) {
    return this.hangoutService.create(createHangoutDto);
  }

  @Get()
  findAll() {
    return this.hangoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hangoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHangoutDto: UpdateHangoutDto) {
    return this.hangoutService.update(+id, updateHangoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hangoutService.remove(+id);
  }
}
