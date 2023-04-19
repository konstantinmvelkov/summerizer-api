import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HighlightDocument = Highlight & Document;

@Schema({
  timestamps: { createdAt: 'createdAt' },
})
export class Highlight {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  summary: string;
}

export const HighlightSchema = SchemaFactory.createForClass(Highlight);
