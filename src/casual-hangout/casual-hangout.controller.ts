import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CasualHangoutService } from './casual-hangout.service';
import { CreateCasualHangoutDto } from './dto/create-casual-hangout.dto';
import { UpdateCasualHangoutDto } from './dto/update-casual-hangout.dto';

@Controller('casual-hangout')
export class CasualHangoutController {
  constructor(private readonly casualHangoutService: CasualHangoutService) {}

  @Post()
  create(@Body() createCasualHangoutDto: CreateCasualHangoutDto) {
    return this.casualHangoutService.create(createCasualHangoutDto);
  }

  @Get()
  findAll() {
    return this.casualHangoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casualHangoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCasualHangoutDto: UpdateCasualHangoutDto) {
    return this.casualHangoutService.update(+id, updateCasualHangoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casualHangoutService.remove(+id);
  }
}
