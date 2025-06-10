import { Body, Controller, Post, Get, Param, UseGuards, Query } from '@nestjs/common';
import { AiFitnessService } from './ai-fitness.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FitnessRequestDto } from './dto/fitness-request.dto';
import { WellbeingRequestDto } from './dto/wellbeing-request.dto';

@ApiTags('AI Fitness & Wellbeing')
@Controller('ai-fitness')
export class AiFitnessController {
  constructor(private readonly aiFitnessService: AiFitnessService) {}

  @Post('workout-plan')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate a personalized workout plan' })
  @ApiResponse({ status: 200, description: 'Returns a personalized workout plan' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async generateWorkoutPlan(@Body() requestDto: FitnessRequestDto) {
    return this.aiFitnessService.generateWorkoutPlan(requestDto);
  }

  @Post('nutrition-advice')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get personalized nutrition advice' })
  @ApiResponse({ status: 200, description: 'Returns personalized nutrition recommendations' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async getNutritionAdvice(@Body() requestDto: FitnessRequestDto) {
    return this.aiFitnessService.generateNutritionAdvice(requestDto);
  }

  @Post('mental-wellbeing')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get mental wellbeing recommendations' })
  @ApiResponse({ status: 200, description: 'Returns personalized mental wellbeing advice' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async getMentalWellbeingAdvice(@Body() requestDto: WellbeingRequestDto) {
    return this.aiFitnessService.generateWellbeingAdvice(requestDto);
  }

  @Get('exercise-library')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get AI-generated exercise recommendations by type' })
  @ApiQuery({ name: 'type', required: false, enum: ['cardio', 'strength', 'flexibility', 'balance'] })
  @ApiQuery({ name: 'difficulty', required: false, enum: ['beginner', 'intermediate', 'advanced'] })
  @ApiResponse({ status: 200, description: 'Returns exercise recommendations' })
  async getExerciseLibrary(
    @Query('type') type?: string,
    @Query('difficulty') difficulty?: string,
  ) {
    return this.aiFitnessService.getExerciseLibrary(type, difficulty);
  }

  @Get('daily-wellness-tips')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get daily AI-generated wellness tips' })
  @ApiResponse({ status: 200, description: 'Returns daily wellness tips' })
  async getDailyWellnessTips() {
    return this.aiFitnessService.generateDailyWellnessTips();
  }
} 