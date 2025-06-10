import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsArray, IsBoolean, Min, Max } from 'class-validator';
import { Gender } from './mental-assessment.dto';

export enum SleepIssue {
  FALLING_ASLEEP = 'falling_asleep',
  STAYING_ASLEEP = 'staying_asleep',
  WAKING_EARLY = 'waking_early',
  POOR_QUALITY = 'poor_quality',
  OVERSLEEPING = 'oversleeping',
  NIGHTMARES = 'nightmares',
  SLEEP_APNEA = 'sleep_apnea',
  SNORING = 'snoring',
  RESTLESS_LEGS = 'restless_legs',
  TEETH_GRINDING = 'teeth_grinding',
  SLEEP_WALKING = 'sleep_walking',
  OTHER = 'other',
}

export enum SleepEnvironment {
  TOO_WARM = 'too_warm',
  TOO_COLD = 'too_cold',
  TOO_BRIGHT = 'too_bright',
  TOO_NOISY = 'too_noisy',
  UNCOMFORTABLE_BED = 'uncomfortable_bed',
  DISTURBANCES = 'disturbances',
  ELECTRONICS = 'electronics',
  POOR_AIR_QUALITY = 'poor_air_quality',
  OTHER = 'other',
}

export class SleepImprovementDto {
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
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(14)
  sleepDuration: number;

  @ApiProperty({
    description: 'Time typically going to bed (24h format)',
    example: '23:30',
  })
  @IsNotEmpty()
  @IsString()
  bedtime: string;

  @ApiProperty({
    description: 'Time typically waking up (24h format)',
    example: '07:00',
  })
  @IsNotEmpty()
  @IsString()
  wakeTime: string;

  @ApiProperty({
    description: 'Time it typically takes to fall asleep (in minutes)',
    example: 30,
    minimum: 0,
    maximum: 240,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(240)
  timeToFallAsleep: number;

  @ApiProperty({
    description: 'Number of times typically waking up during the night',
    example: 2,
    minimum: 0,
    maximum: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(20)
  nightWakings: number;

  @ApiProperty({
    description: 'Specific sleep issues experienced',
    enum: SleepIssue,
    isArray: true,
    example: ['falling_asleep', 'waking_early'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(SleepIssue, { each: true })
  sleepIssues: SleepIssue[];

  @ApiProperty({
    description: 'Sleep environment issues',
    enum: SleepEnvironment,
    isArray: true,
    example: ['too_noisy', 'too_bright'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(SleepEnvironment, { each: true })
  environmentIssues?: SleepEnvironment[];

  @ApiProperty({
    description: 'Whether using screens before bed (TV, phone, computer, etc.)',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  usesScreensBeforeBed: boolean;

  @ApiProperty({
    description: 'Time between last screen use and sleep attempt (in minutes)',
    example: 15,
    minimum: 0,
    maximum: 240,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(240)
  screenTimeBeforeBed?: number;

  @ApiProperty({
    description: 'Whether caffeine is consumed within 6 hours of bedtime',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  consumesCaffeineBeforeBed: boolean;

  @ApiProperty({
    description: 'Whether alcohol is consumed within 3 hours of bedtime',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  consumesAlcoholBeforeBed: boolean;

  @ApiProperty({
    description: 'Pre-sleep routine details',
    example: 'Reading for 15 minutes, brushing teeth, setting alarm',
    required: false,
  })
  @IsOptional()
  @IsString()
  preSleepRoutine?: string;

  @ApiProperty({
    description: 'Sleep aid methods currently used',
    example: 'White noise machine, sleep mask, melatonin supplements',
    required: false,
  })
  @IsOptional()
  @IsString()
  currentSleepAids?: string;

  @ApiProperty({
    description: 'Stress level on a scale of 1-10',
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
    description: 'Exercise frequency per week',
    example: 3,
    minimum: 0,
    maximum: 14,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(14)
  exerciseFrequency: number;

  @ApiProperty({
    description: 'Goals for sleep improvement',
    example: 'Fall asleep faster, reduce night wakings, wake feeling more refreshed',
  })
  @IsNotEmpty()
  @IsString()
  sleepGoals: string;
} 