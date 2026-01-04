import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  create(@Body() data: any) {
    return this.visitsService.create(data);
  }

  @Get()
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.visitsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitsService.remove(+id);
  }
}