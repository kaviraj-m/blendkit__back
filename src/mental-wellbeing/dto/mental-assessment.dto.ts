import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsArray, IsBoolean, Min, Max } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum MoodState {
  VERY_NEGATIVE = 'very_negative',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
  POSITIVE = 'positive',
  VERY_POSITIVE = 'very_positive',
}

export enum MentalHealthConcern {
  STRESS = 'stress',
  ANXIETY = 'anxiety',
  DEPRESSION = 'depression',
  BURNOUT = 'burnout',
  INSOMNIA = 'insomnia',
  CONCENTRATION = 'concentration',
  LONELINESS = 'loneliness',
  SELF_ESTEEM = 'self_esteem',
  TRAUMA = 'trauma',
  OTHER = 'other',
}

export class MentalAssessmentDto {
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
    description: 'Current anxiety level on a scale of 1-10',
    example: 6,
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  anxietyLevel: number;

  @ApiProperty({
    description: 'Current mood state',
    enum: MoodState,
    example: 'neutral',
  })
  @IsNotEmpty()
  @IsEnum(MoodState)
  currentMood: string;

  @ApiProperty({
    description: 'Primary mental health concerns',
    enum: MentalHealthConcern,
    isArray: true,
    example: ['stress', 'insomnia'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(MentalHealthConcern, { each: true })
  concerns: MentalHealthConcern[];

  @ApiProperty({
    description: 'Details about specific concerns or symptoms',
    example: 'Difficulty falling asleep, racing thoughts at night, feeling overwhelmed at work',
    required: false,
  })
  @IsOptional()
  @IsString()
  concernDetails?: string;

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
    description: 'Energy level throughout the day on a scale of 1-10',
    example: 6,
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  energyLevel: number;

  @ApiProperty({
    description: 'Ability to focus/concentrate on scale of 1-10',
    example: 7,
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  concentrationLevel: number;

  @ApiProperty({
    description: 'Social connection level on a scale of 1-10',
    example: 5,
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  socialConnection: number;

  @ApiProperty({
    description: 'Work-life balance satisfaction on a scale of 1-10',
    example: 4,
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  workLifeBalance: number;

  @ApiProperty({
    description: 'Current mental wellness practices',
    example: 'Occasional meditation, journaling',
    required: false,
  })
  @IsOptional()
  @IsString()
  currentPractices?: string;

  @ApiProperty({
    description: 'Previously tried mental wellness approaches',
    example: 'CBT therapy, meditation apps',
    required: false,
  })
  @IsOptional()
  @IsString()
  previousApproaches?: string;

  @ApiProperty({
    description: 'Whether experiencing physical symptoms',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  hasPhysicalSymptoms: boolean;

  @ApiProperty({
    description: 'Description of physical symptoms if any',
    example: 'Headaches, muscle tension, upset stomach',
    required: false,
  })
  @IsOptional()
  @IsString()
  physicalSymptoms?: string;

  @ApiProperty({
    description: 'Primary goals for mental wellbeing',
    example: 'Reduce anxiety, improve sleep quality, develop better work-life balance',
  })
  @IsNotEmpty()
  @IsString()
  wellbeingGoals: string;
} 