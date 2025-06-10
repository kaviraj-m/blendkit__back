import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, Min, Max, IsBoolean, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { Gender } from './fitness-request.dto';

export enum SleepIssue {
  FALLING_ASLEEP = 'falling_asleep',
  STAYING_ASLEEP = 'staying_asleep',
  WAKING_EARLY = 'waking_early',
  POOR_QUALITY = 'poor_quality',
  OVERSLEEPING = 'oversleeping',
  NONE = 'none',
}

export class WellbeingRequestDto {
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
    description: 'Mental health goals',
    example: 'Reduce anxiety, improve sleep, manage stress',
  })
  @IsNotEmpty()
  @IsString()
  mentalHealthGoals: string;

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
    description: 'Sleep quality on a scale of 1-10',
    example: 5,
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  sleepQuality: number;

  @ApiProperty({
    description: 'Average sleep duration in hours',
    example: 6.5,
    minimum: 1,
    maximum: 14,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(14)
  sleepDuration?: number;

  @ApiProperty({
    description: 'Specific sleep issues',
    enum: SleepIssue,
    isArray: true,
    example: ['falling_asleep', 'waking_early'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(SleepIssue, { each: true })
  sleepIssues?: SleepIssue[];

  @ApiProperty({
    description: 'Current mental wellness practices (if any)',
    example: 'Occasional meditation, journaling',
    required: false,
  })
  @IsOptional()
  @IsString()
  currentPractices?: string;

  @ApiProperty({
    description: 'Energy level throughout the day on a scale of 1-10',
    example: 6,
    minimum: 1,
    maximum: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  energyLevel?: number;

  @ApiProperty({
    description: 'Mood patterns or concerns',
    example: 'Mood swings, afternoon depression',
    required: false,
  })
  @IsOptional()
  @IsString()
  moodPatterns?: string;

  @ApiProperty({
    description: 'Screen time in hours per day',
    example: 4.5,
    minimum: 0,
    maximum: 24,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  screenTime?: number;

  @ApiProperty({
    description: 'Social connection level on a scale of 1-10',
    example: 5,
    minimum: 1,
    maximum: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  socialConnection?: number;

  @ApiProperty({
    description: 'Work-life balance satisfaction on a scale of 1-10',
    example: 4,
    minimum: 1,
    maximum: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  workLifeBalance?: number;

  @ApiProperty({
    description: 'Previously tried wellbeing approaches',
    example: 'CBT therapy, meditation apps',
    required: false,
  })
  @IsOptional()
  @IsString()
  previousApproaches?: string;
} 