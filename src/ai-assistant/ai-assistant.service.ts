import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiAssistantService {
  private readonly logger = new Logger(AiAssistantService.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY') || 'AIzaSyCADmBskaAZRPBDLYduEBCk6JQfrnQ7OBw';
  }

  async generateResponse(prompt: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.candidates && response.data.candidates.length > 0) {
        // Extract text from the response
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        
        return {
          success: true,
          message: 'Response generated successfully',
          response: aiResponse,
        };
      } else {
        this.logger.error('Invalid response structure from Gemini API');
        throw new HttpException('Failed to generate AI response', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      this.logger.error(`Error calling Gemini API: ${error.message}`);
      
      if (error.response) {
        this.logger.error(`Response error data: ${JSON.stringify(error.response.data)}`);
      }
      
      throw new HttpException(
        'Failed to generate AI response',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 