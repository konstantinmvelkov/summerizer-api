import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';

@Controller('highlights')
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @Post()
  create(@Body() createHighlightDto: CreateHighlightDto) {
    return this.highlightsService.create(createHighlightDto);
  }

  @Get()
  findAll() {
    return this.highlightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.highlightsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highlightsService.remove(+id);
  }
}
