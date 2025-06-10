import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsArray, Min, Max } from 'class-validator';
import { Gender } from './mental-assessment.dto';

export enum MindfulnessExperience {
  NONE = 'none',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum MindfulnessFocus {
  STRESS_REDUCTION = 'stress_reduction',
  ANXIETY_MANAGEMENT = 'anxiety_management',
  EMOTIONAL_REGULATION = 'emotional_regulation',
  FOCUS_IMPROVEMENT = 'focus_improvement',
  SLEEP_QUALITY = 'sleep_quality',
  SELF_AWARENESS = 'self_awareness',
  COMPASSION = 'compassion',
  SPIRITUAL_GROWTH = 'spiritual_growth',
  GENERAL_WELLBEING = 'general_wellbeing',
  OTHER = 'other',
}

export enum PreferredPractice {
  MEDITATION = 'meditation',
  BREATHWORK = 'breathwork',
  BODY_SCANNING = 'body_scanning',
  WALKING_MEDITATION = 'walking_meditation',
  MINDFUL_MOVEMENT = 'mindful_movement',
  VISUALIZATION = 'visualization',
  GRATITUDE_PRACTICE = 'gratitude_practice',
  MINDFUL_EATING = 'mindful_eating',
  JOURNALING = 'journaling',
  YOGA = 'yoga',
  OPEN_TO_ALL = 'open_to_all',
}

export class MindfulnessDto {
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
    description: 'Previous mindfulness experience level',
    enum: MindfulnessExperience,
    example: 'beginner',
  })
  @IsNotEmpty()
  @IsEnum(MindfulnessExperience)
  experienceLevel: MindfulnessExperience;

  @ApiProperty({
    description: 'Primary goals for mindfulness practice',
    enum: MindfulnessFocus,
    isArray: true,
    example: ['stress_reduction', 'sleep_quality'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(MindfulnessFocus, { each: true })
  focusAreas: MindfulnessFocus[];

  @ApiProperty({
    description: 'Preferred mindfulness practices',
    enum: PreferredPractice,
    isArray: true,
    example: ['meditation', 'breathwork'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(PreferredPractice, { each: true })
  preferredPractices?: PreferredPractice[];

  @ApiProperty({
    description: 'Available time for practice (in minutes per day)',
    example: 15,
    minimum: 1,
    maximum: 120,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(120)
  availableTimePerDay: number;

  @ApiProperty({
    description: 'Preferred time of day for practice',
    example: 'Morning after waking up',
    required: false,
  })
  @IsOptional()
  @IsString()
  preferredTimeOfDay?: string;

  @ApiProperty({
    description: 'Previous mindfulness practices tried',
    example: 'Headspace app for 2 weeks, occasional yoga classes',
    required: false,
  })
  @IsOptional()
  @IsString()
  previousPractices?: string;

  @ApiProperty({
    description: 'Challenges experienced with mindfulness',
    example: 'Difficulty staying focused, falling asleep during practice, finding time',
    required: false,
  })
  @IsOptional()
  @IsString()
  challenges?: string;

  @ApiProperty({
    description: 'Specific topics or themes of interest',
    example: 'Self-compassion, dealing with uncertainty, mindful communication',
    required: false,
  })
  @IsOptional()
  @IsString()
  topicsOfInterest?: string;

  @ApiProperty({
    description: 'Current environment for practice',
    example: 'Quiet bedroom with potential household noise',
    required: false,
  })
  @IsOptional()
  @IsString()
  environment?: string;

  @ApiProperty({
    description: 'Whether guided practices are preferred over self-guided',
    example: 'Guided with voice instructions',
    required: false,
  })
  @IsOptional()
  @IsString()
  guidancePreference?: string;
}