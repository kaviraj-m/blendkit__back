import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, Min, Max, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export enum FitnessLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class FitnessRequestDto {
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
    example: 'male',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'Height in cm',
    example: 175,
    minimum: 100,
    maximum: 250,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @Max(250)
  height: number;

  @ApiProperty({
    description: 'Weight in kg',
    example: 70,
    minimum: 30,
    maximum: 300,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(30)
  @Max(300)
  weight: number;

  @ApiProperty({
    description: 'Fitness level',
    enum: FitnessLevel,
    example: 'intermediate',
  })
  @IsNotEmpty()
  @IsEnum(FitnessLevel)
  fitnessLevel: string;

  @ApiProperty({
    description: 'Fitness goals',
    example: 'Weight loss, muscle gain',
  })
  @IsNotEmpty()
  @IsString()
  goals: string;

  @ApiProperty({
    description: 'Preferred workout duration in minutes',
    example: 45,
    minimum: 10,
    maximum: 180,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @Max(180)
  preferredDuration: number;

  @ApiProperty({
    description: 'Preferred workout days per week',
    example: 3,
    minimum: 1,
    maximum: 7,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  workoutsPerWeek?: number;

  @ApiProperty({
    description: 'Medical conditions (if any)',
    example: 'Lower back pain',
    required: false,
  })
  @IsOptional()
  @IsString()
  medicalConditions?: string;

  @ApiProperty({
    description: 'Available equipment',
    example: 'Dumbbells, resistance bands',
    required: false,
  })
  @IsOptional()
  @IsString()
  availableEquipment?: string;

  @ApiProperty({
    description: 'Dietary preferences',
    example: 'Vegetarian, low carb',
    required: false,
  })
  @IsOptional()
  @IsString()
  dietaryPreferences?: string;

  @ApiProperty({
    description: 'Food allergies',
    example: 'Nuts, lactose',
    required: false,
  })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiProperty({
    description: 'Workout location preferences',
    example: 'Home, outdoors',
    required: false,
  })
  @IsOptional()
  @IsString()
  workoutLocation?: string;

  @ApiProperty({
    description: 'Existing injuries or limitations',
    example: 'Shoulder injury, knee pain',
    required: false,
  })
  @IsOptional()
  @IsString()
  injuries?: string;

  @ApiProperty({
    description: 'Previous fitness experience',
    example: '2 years of weightlifting, yoga',
    required: false,
  })
  @IsOptional()
  @IsString()
  fitnessExperience?: string;
} 