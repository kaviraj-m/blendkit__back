import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MentalWellbeingController } from './mental-wellbeing.controller';
import { MentalWellbeingService } from './mental-wellbeing.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
  controllers: [MentalWellbeingController],
  providers: [MentalWellbeingService],
  exports: [MentalWellbeingService],
})
export class MentalWellbeingModule {} 