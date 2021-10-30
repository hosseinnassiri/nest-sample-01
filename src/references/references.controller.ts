import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { Reference } from './reference.schema';

@Controller('references')
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get()
  async findAll(): Promise<Reference[]> {
    return this.referencesService.findAll();
  }
}
