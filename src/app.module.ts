import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HighlightsModule } from './highlights/highlights.module';
import { HighlightsController } from './highlights/highlights.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    HighlightsModule,
  ],
  controllers: [AppController, HighlightsController],
  providers: [AppService],
})
export class AppModule {}
