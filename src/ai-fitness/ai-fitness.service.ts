import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FitnessRequestDto } from './dto/fitness-request.dto';
import { WellbeingRequestDto } from './dto/wellbeing-request.dto';

@Injectable()
export class AiFitnessService {
  private readonly logger = new Logger(AiFitnessService.name);
  private readonly geminiApiKey: string;
  private readonly geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly openaiApiKey: string;
  private readonly openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.geminiApiKey = this.configService.get<string>('GEMINI_API_KEY') || 'AIzaSyCADmBskaAZRPBDLYduEBCk6JQfrnQ7OBw';
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
  }

  async generateWorkoutPlan(requestDto: FitnessRequestDto): Promise<any> {
    const prompt = `You are an expert fitness trainer with years of experience in creating personalized workout plans.
    Generate a comprehensive workout plan based on the following information:
    - Age: ${requestDto.age}
    - Gender: ${requestDto.gender}
    - Height: ${requestDto.height}
    - Weight: ${requestDto.weight}
    - Fitness level: ${requestDto.fitnessLevel}
    - Goals: ${requestDto.goals}
    - Preferred workout duration: ${requestDto.preferredDuration} minutes
    - Medical conditions: ${requestDto.medicalConditions || 'None'}
    - Available equipment: ${requestDto.availableEquipment || 'None'}
    
    Provide a structured 7-day program that includes:
    1. Daily workout routines with specific exercises
    2. Sets, reps, and rest periods for each exercise
    3. Warm-up and cool-down recommendations
    4. Progressive overload strategy
    5. Realistic expectations and timeline for achieving goals
    
    Format the response in a clear, organized manner that can be easily followed.`;

    return this.callAiService(prompt, 'gemini');
  }

  async generateNutritionAdvice(requestDto: FitnessRequestDto): Promise<any> {
    const prompt = `You are a certified nutritionist specializing in personalized meal planning.
    Generate detailed nutrition advice based on the following information:
    - Age: ${requestDto.age}
    - Gender: ${requestDto.gender}
    - Height: ${requestDto.height}
    - Weight: ${requestDto.weight}
    - Fitness level: ${requestDto.fitnessLevel}
    - Goals: ${requestDto.goals}
    - Dietary preferences: ${requestDto.dietaryPreferences || 'None'}
    - Allergies: ${requestDto.allergies || 'None'}
    - Medical conditions: ${requestDto.medicalConditions || 'None'}
    
    Provide comprehensive nutrition guidance including:
    1. Recommended daily caloric intake and macronutrient breakdown
    2. A 7-day meal plan with specific meals and portion sizes
    3. Meal timing recommendations in relation to workouts
    4. Hydration guidelines
    5. Supplement recommendations if appropriate
    6. Foods to avoid or limit
    7. Tips for maintaining consistency with the nutrition plan
    
    Format the response in a clear, organized manner that can be easily followed.`;

    return this.callAiService(prompt, 'gemini');
  }

  async generateWellbeingAdvice(requestDto: WellbeingRequestDto): Promise<any> {
    const prompt = `You are an expert in mental health and wellness with years of experience helping individuals improve their wellbeing.
    Generate personalized mental wellbeing recommendations based on the following information:
    - Age: ${requestDto.age}
    - Gender: ${requestDto.gender}
    - Mental health goals: ${requestDto.mentalHealthGoals}
    - Stress level (1-10): ${requestDto.stressLevel}
    - Sleep quality (1-10): ${requestDto.sleepQuality}
    - Current mental wellness practices: ${requestDto.currentPractices || 'None'}
    
    Provide comprehensive wellbeing guidance including:
    1. Daily mindfulness or meditation practices (with specific instructions)
    2. Stress management techniques tailored to their stress level
    3. Sleep hygiene recommendations to improve sleep quality
    4. Journaling prompts for self-reflection
    5. Physical activities that complement mental wellbeing
    6. Cognitive behavioral strategies for managing negative thoughts
    7. Recommended resources (apps, books, podcasts) for ongoing support
    
    Format the response in a clear, organized manner that emphasizes practical, actionable steps.`;

    return this.callAiService(prompt, 'gemini');
  }

  async getExerciseLibrary(type?: string, difficulty?: string): Promise<any> {
    let exerciseType = type || 'all';
    let exerciseDifficulty = difficulty || 'all';
    
    const prompt = `As a fitness expert, provide detailed information about ${exerciseType} exercises 
    at the ${exerciseDifficulty} difficulty level. For each exercise, include:
    1. Proper form and technique
    2. Muscles targeted
    3. Common mistakes to avoid
    4. Variations to make it easier or harder
    5. Recommended sets and reps
    6. Rest periods
    7. Equipment needed (if any)
    
    Present this information in a structured, easy-to-follow format suitable for a fitness application library.`;

    return this.callAiService(prompt, 'gemini');
  }

  async generateDailyWellnessTips(): Promise<any> {
    const date = new Date().toLocaleDateString();
    
    const prompt = `Generate 5 evidence-based daily wellness tips for ${date} covering:
    1. Nutrition - A practical, science-backed nutrition tip
    2. Physical Activity - A quick, effective exercise that can be done anywhere
    3. Mental Wellbeing - A mindfulness practice or stress-relief technique
    4. Sleep - A tip for improving sleep quality
    5. Productivity - A strategy for maintaining focus and energy throughout the day
    
    Each tip should be concise (1-2 sentences), actionable, and based on scientific research.`;

    return this.callAiService(prompt, 'gemini');
  }

  private async callAiService(prompt: string, model: 'gemini' | 'openai' = 'gemini'): Promise<any> {
    try {
      if (model === 'gemini') {
        return await this.callGeminiApi(prompt);
      } else {
        return await this.callOpenAiApi(prompt);
      }
    } catch (error) {
      this.logger.error(`Error calling AI API: ${error.message}`);
      
      if (error.response) {
        this.logger.error(`Response error data: ${JSON.stringify(error.response.data)}`);
      }
      
      throw new HttpException(
        'Failed to generate AI response',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async callGeminiApi(prompt: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.post(
          `${this.geminiApiUrl}?key=${this.geminiApiKey}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      );

      if (response.data?.candidates && response.data.candidates.length > 0) {
        const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text || '';
        
        return {
          success: true,
          message: 'Response generated successfully',
          response: aiResponse,
          model: 'Gemini',
        };
      } else {
        throw new Error('Invalid response structure from Gemini API');
      }
    } catch (error) {
      this.logger.error(`Gemini API error: ${error.message}`);
      throw error;
    }
  }

  private async callOpenAiApi(prompt: string): Promise<any> {
    if (!this.openaiApiKey) {
      this.logger.warn('OpenAI API key not configured, falling back to Gemini');
      return this.callGeminiApi(prompt);
    }

    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.post(
          this.openaiApiUrl,
          {
            model: 'gpt-4-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are an expert in fitness and wellbeing, providing detailed, personalized advice.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 2048
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.openaiApiKey}`
            }
          }
        )
      );

      if (response.data?.choices && response.data.choices.length > 0) {
        const aiResponse = response.data.choices[0]?.message?.content || '';
        
        return {
          success: true,
          message: 'Response generated successfully',
          response: aiResponse,
          model: 'OpenAI GPT-4',
        };
      } else {
        throw new Error('Invalid response structure from OpenAI API');
      }
    } catch (error) {
      this.logger.error(`OpenAI API error: ${error.message}`);
      // Fall back to Gemini if OpenAI fails
      this.logger.warn('Falling back to Gemini API');
      return this.callGeminiApi(prompt);
    }
  }
} 