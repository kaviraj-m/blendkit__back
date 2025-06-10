import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AiAssistantRequestDto } from './dto/ai-assistant-request.dto';

@ApiTags('AI Assistant')
@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('ask')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Ask a question to Arivu AI Assistant' })
  async askQuestion(@Body() requestDto: AiAssistantRequestDto) {
    return this.aiAssistantService.generateResponse(requestDto.prompt);
  }
} 