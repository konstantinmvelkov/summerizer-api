import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Highlight, HighlightSchema } from './schemas/highlight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Highlight.name,
        schema: HighlightSchema,
      },
    ]),
  ],
  providers: [HighlightsService],
  exports: [HighlightsService],
})
export class HighlightsModule {}
