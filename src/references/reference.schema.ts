import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReferenceDocument = Reference & Document;

@Schema()
export class Reference {
  @Prop()
  name: string;

  @Prop([String])
  topics: string[];
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);