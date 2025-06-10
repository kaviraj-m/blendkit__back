import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AiAssistantRequestDto {
  @ApiProperty({
    description: 'The prompt to send to the AI assistant',
    example: 'Explain how AI works in a few words',
  })
  @IsNotEmpty()
  @IsString()
  prompt: string;
} 