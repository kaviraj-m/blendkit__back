import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AiFitnessController } from './ai-fitness.controller';
import { AiFitnessService } from './ai-fitness.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AiFitnessController],
  providers: [AiFitnessService],
  exports: [AiFitnessService],
})
export class AiFitnessModule {} 