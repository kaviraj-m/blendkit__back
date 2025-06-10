import { Body, Controller, Post, Get, Param, UseGuards, Query } from '@nestjs/common';
import { MentalWellbeingService } from './mental-wellbeing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MentalAssessmentDto } from './dto/mental-assessment.dto';
import { StressManagementDto } from './dto/stress-management.dto';
import { SleepImprovementDto } from './dto/sleep-improvement.dto';
import { MindfulnessDto } from './dto/mindfulness.dto';

@ApiTags('Mental Wellbeing')
@Controller('mental-wellbeing')
export class MentalWellbeingController {
  constructor(private readonly mentalWellbeingService: MentalWellbeingService) {}

  @Post('assessment')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a comprehensive mental wellbeing assessment' })
  @ApiResponse({ status: 200, description: 'Returns a detailed mental wellbeing assessment' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async getMentalAssessment(@Body() requestDto: MentalAssessmentDto) {
    return this.mentalWellbeingService.generateMentalAssessment(requestDto);
  }

  @Post('stress-management')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get personalized stress management techniques' })
  @ApiResponse({ status: 200, description: 'Returns personalized stress management recommendations' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async getStressManagement(@Body() requestDto: StressManagementDto) {
    return this.mentalWellbeingService.generateStressManagement(requestDto);
  }

  @Post('sleep-improvement')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get personalized sleep improvement plan' })
  @ApiResponse({ status: 200, description: 'Returns personalized sleep improvement recommendations' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async getSleepImprovement(@Body() requestDto: SleepImprovementDto) {
    return this.mentalWellbeingService.generateSleepImprovement(requestDto);
  }

  @Post('mindfulness')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get personalized mindfulness practices' })
  @ApiResponse({ status: 200, description: 'Returns tailored mindfulness practices and recommendations' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async getMindfulnessPractices(@Body() requestDto: MindfulnessDto) {
    return this.mentalWellbeingService.generateMindfulnessPractices(requestDto);
  }

  @Get('daily-reflection')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get daily reflection prompts and mental wellness tips' })
  @ApiResponse({ status: 200, description: 'Returns daily reflection prompts and wellness tips' })
  async getDailyReflection() {
    return this.mentalWellbeingService.generateDailyReflection();
  }

  @Get('coping-strategies')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get coping strategies for specific emotions or situations' })
  @ApiQuery({ name: 'emotion', required: false, enum: ['anxiety', 'anger', 'sadness', 'grief', 'overwhelm', 'fear'] })
  @ApiQuery({ name: 'situation', required: false, enum: ['work', 'relationships', 'social', 'health', 'uncertainty'] })
  @ApiResponse({ status: 200, description: 'Returns coping strategies for the specified emotion or situation' })
  async getCopingStrategies(
    @Query('emotion') emotion?: string,
    @Query('situation') situation?: string,
  ) {
    return this.mentalWellbeingService.generateCopingStrategies(emotion, situation);
  }

  @Get('grounding-techniques')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get quick grounding techniques for immediate stress relief' })
  @ApiQuery({ name: 'duration', required: false, description: 'Duration in minutes' })
  @ApiResponse({ status: 200, description: 'Returns grounding techniques for immediate relief' })
  async getGroundingTechniques(@Query('duration') duration?: number) {
    return this.mentalWellbeingService.generateGroundingTechniques(duration || 5);
  }

  @Get('cognitive-reframing')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get cognitive reframing exercises for negative thought patterns' })
  @ApiQuery({ name: 'thought_pattern', required: false, enum: ['catastrophizing', 'black_and_white', 'personalization', 'filtering', 'general'] })
  @ApiResponse({ status: 200, description: 'Returns cognitive reframing exercises' })
  async getCognitiveReframing(@Query('thought_pattern') thoughtPattern?: string) {
    return this.mentalWellbeingService.generateCognitiveReframing(thoughtPattern || 'general');
  }

  @Get('resources')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get mental health resources and support options' })
  @ApiQuery({ name: 'type', required: false, enum: ['crisis', 'therapy', 'self_help', 'community', 'apps', 'all'] })
  @ApiResponse({ status: 200, description: 'Returns mental health resources and support options' })
  async getMentalHealthResources(@Query('type') resourceType?: string) {
    return this.mentalWellbeingService.getMentalHealthResources(resourceType || 'all');
  }
} 