import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsArray, Min, Max } from 'class-validator';
import { Gender, MentalHealthConcern } from './mental-assessment.dto';

export enum StressSource {
  WORK = 'work',
  RELATIONSHIPS = 'relationships',
  FINANCES = 'finances',
  HEALTH = 'health',
  FAMILY = 'family',
  EDUCATION = 'education',
  SOCIAL = 'social',
  FUTURE = 'future_uncertainty',
  ENVIRONMENT = 'environment',
  OTHER = 'other',
}

export enum StressTiming {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night',
  ALL_DAY = 'all_day',
  INTERMITTENT = 'intermittent',
}

export class StressManagementDto {
  @ApiProperty({
    description: 'Age of the user',
    example: 30,
    minimum: 13,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(13)
  @Max(100)
  age: number;

  @ApiProperty({
    description: 'Gender of the user',
    enum: Gender,
    example: 'female',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'Current stress level on a scale of 1-10',
    example: 7,
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  stressLevel: number;

  @ApiProperty({
    description: 'Primary sources of stress',
    enum: StressSource,
    isArray: true,
    example: ['work', 'finances'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(StressSource, { each: true })
  stressSources: StressSource[];

  @ApiProperty({
    description: 'Timing of stress peaks',
    enum: StressTiming,
    isArray: true,
    example: ['morning', 'evening'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(StressTiming, { each: true })
  stressTiming: StressTiming[];

  @ApiProperty({
    description: 'Physical manifestations of stress',
    example: 'Headaches, muscle tension, teeth grinding',
    required: false,
  })
  @IsOptional()
  @IsString()
  physicalSymptoms?: string;

  @ApiProperty({
    description: 'Emotional manifestations of stress',
    example: 'Irritability, feeling overwhelmed, mood swings',
    required: false,
  })
  @IsOptional()
  @IsString()
  emotionalSymptoms?: string;

  @ApiProperty({
    description: 'Cognitive manifestations of stress',
    example: 'Racing thoughts, difficulty concentrating, forgetfulness',
    required: false,
  })
  @IsOptional()
  @IsString()
  cognitiveSymptoms?: string;

  @ApiProperty({
    description: 'Behavioral manifestations of stress',
    example: 'Changes in appetite, procrastination, nail biting',
    required: false,
  })
  @IsOptional()
  @IsString()
  behavioralSymptoms?: string;

  @ApiProperty({
    description: 'Current coping mechanisms',
    example: 'Exercise, talking with friends, mindfulness apps',
    required: false,
  })
  @IsOptional()
  @IsString()
  currentCopingMechanisms?: string;

  @ApiProperty({
    description: 'Previous stress management approaches tried',
    example: 'Meditation, yoga, therapy',
    required: false,
  })
  @IsOptional()
  @IsString()
  previousApproaches?: string;

  @ApiProperty({
    description: 'Goals for stress management',
    example: 'Learn to recognize stress triggers, develop healthy coping mechanisms, improve work-life balance',
  })
  @IsNotEmpty()
  @IsString()
  stressManagementGoals: string;
} 