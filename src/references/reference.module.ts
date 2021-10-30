import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { Reference, ReferenceSchema } from './reference.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reference.name, schema: ReferenceSchema }])],
  controllers: [ReferencesController],
  providers: [ReferencesService],
})
export class ReferenceModule {}