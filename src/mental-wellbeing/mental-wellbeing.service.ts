import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MentalAssessmentDto } from './dto/mental-assessment.dto';
import { StressManagementDto } from './dto/stress-management.dto';
import { SleepImprovementDto } from './dto/sleep-improvement.dto';
import { MindfulnessDto } from './dto/mindfulness.dto';

@Injectable()
export class MentalWellbeingService {
  private readonly logger = new Logger(MentalWellbeingService.name);
  private readonly geminiApiKey: string;
  private readonly geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly openaiApiKey: string;
  private readonly openaiApiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly anthropicApiKey: string;
  private readonly anthropicApiUrl = 'https://api.anthropic.com/v1/messages';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.geminiApiKey = this.configService.get<string>('GEMINI_API_KEY') || 'AIzaSyCADmBskaAZRPBDLYduEBCk6JQfrnQ7OBw';
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
    this.anthropicApiKey = this.configService.get<string>('ANTHROPIC_API_KEY') || '';
  }

  async generateMentalAssessment(requestDto: MentalAssessmentDto): Promise<any> {
    const prompt = `You are a compassionate mental health professional with expertise in psychological assessment.
    
    Based on the following information, provide a comprehensive mental wellbeing assessment:
    - Age: ${requestDto.age}
    - Gender: ${requestDto.gender}
    - Stress level (1-10): ${requestDto.stressLevel}
    - Anxiety level (1-10): ${requestDto.anxietyLevel}
    - Current mood: ${requestDto.currentMood}
    - Primary mental health concerns: ${requestDto.concerns.join(', ')}
    - Concern details: ${requestDto.concernDetails || 'Not provided'}
    - Sleep quality (1-10): ${requestDto.sleepQuality}
    - Sleep duration: ${requestDto.sleepDuration} hours
    - Energy level (1-10): ${requestDto.energyLevel}
    - Concentration level (1-10): ${requestDto.concentrationLevel}
    - Social connection level (1-10): ${requestDto.socialConnection}
    - Work-life balance (1-10): ${requestDto.workLifeBalance}
    - Current wellness practices: ${requestDto.currentPractices || 'None'}
    - Previous approaches: ${requestDto.previousApproaches || 'None'}
    - Physical symptoms: ${requestDto.hasPhysicalSymptoms ? 'Yes - ' + (requestDto.physicalSymptoms || 'Not specified') : 'None'}
    - Wellbeing goals: ${requestDto.wellbeingGoals}
    
    Please provide:
    1. An overall assessment of current mental wellbeing
    2. Identified areas of concern and potential underlying factors
    3. Strengths and positive factors
    4. Personalized recommendations for improving mental wellbeing
    5. Suggested resources or professional support if appropriate
    
    Format the response in a compassionate, non-judgmental way that acknowledges the individual's experiences and provides hope and practical guidance.`;

    return this.callAiService(prompt, 'anthropic');
  }

  async generateStressManagement(requestDto: StressManagementDto): Promise<any> {
    const prompt = `You are an expert in stress management and resilience building with years of experience helping individuals manage stress effectively.
    
    Based on the following information, create a personalized stress management plan:
    - Age: ${requestDto.age}
    - Gender: ${requestDto.gender}
    - Stress level (1-10): ${requestDto.stressLevel}
    - Sources of stress: ${requestDto.stressSources.join(', ')}
    - When stress peaks: ${requestDto.stressTiming.join(', ')}
    - Physical symptoms: ${requestDto.physicalSymptoms || 'None reported'}
    - Emotional symptoms: ${requestDto.emotionalSymptoms || 'None reported'}
    - Cognitive symptoms: ${requestDto.cognitiveSymptoms || 'None reported'}
    - Behavioral symptoms: ${requestDto.behavioralSymptoms || 'None reported'}
    - Current coping mechanisms: ${requestDto.currentCopingMechanisms || 'None reported'}
    - Previous approaches tried: ${requestDto.previousApproaches || 'None reported'}
    - Goals: ${requestDto.stressManagementGoals}
    
    Please provide a comprehensive stress management plan that includes:
    1. A brief explanation of how the reported stress pattern affects mental and physical health
    2. Immediate stress relief techniques (2-3 practices that can be done in 5 minutes or less)
    3. Daily stress management practices (3-5 evidence-based techniques)
    4. Weekly stress reduction activities (2-3 longer practices)
    5. Environmental and lifestyle changes to reduce overall stress levels
    6. Specific strategies for the identified stress sources
    7. A sample stress management schedule that can be realistically implemented
    8. Guidance on when to seek additional professional support
    
    Format the response in a supportive, practical manner that acknowledges the challenges of stress while emphasizing the individual's capacity for resilience and growth.`;

    return this.callAiService(prompt, 'anthropic');
  }

  async generateSleepImprovement(requestDto: SleepImprovementDto): Promise<any> {
    const prompt = `You are a sleep specialist with expertise in behavioral sleep medicine and sleep hygiene practices.
    
    Based on the following information, create a personalized sleep improvement plan:
    - Age: ${requestDto.age}
    - Gender: ${requestDto.gender}
    - Sleep quality (1-10): ${requestDto.sleepQuality}
    - Sleep duration: ${requestDto.sleepDuration} hours
    - Typical bedtime: ${requestDto.bedtime}
    - Typical wake time: ${requestDto.wakeTime}
    - Time to fall asleep: ${requestDto.timeToFallAsleep} minutes
    - Number of night wakings: ${requestDto.nightWakings}
    - Sleep issues: ${requestDto.sleepIssues.join(', ')}
    - Environment issues: ${requestDto.environmentIssues ? requestDto.environmentIssues.join(', ') : 'None reported'}
    - Uses screens before bed: ${requestDto.usesScreensBeforeBed ? 'Yes' + (requestDto.screenTimeBeforeBed ? ' - ' + requestDto.screenTimeBeforeBed + ' minutes before bed' : '') : 'No'}
    - Consumes caffeine before bed: ${requestDto.consumesCaffeineBeforeBed ? 'Yes' : 'No'}
    - Consumes alcohol before bed: ${requestDto.consumesAlcoholBeforeBed ? 'Yes' : 'No'}
    - Pre-sleep routine: ${requestDto.preSleepRoutine || 'None reported'}
    - Current sleep aids: ${requestDto.currentSleepAids || 'None reported'}
    - Stress level (1-10): ${requestDto.stressLevel}
    - Exercise frequency per week: ${requestDto.exerciseFrequency}
    - Sleep goals: ${requestDto.sleepGoals}
    
    Please provide a comprehensive sleep improvement plan that includes:
    1. A brief assessment of current sleep patterns and potential issues
    2. Specific recommendations for sleep hygiene practices
    3. An optimal sleep schedule based on the provided information
    4. A detailed pre-sleep routine (30-60 minutes before bed)
    5. Environmental modifications for better sleep
    6. Behavioral strategies for addressing the specific sleep issues identified
    7. Guidance on the appropriate use of sleep aids (if any)
    8. Recommendations for daytime habits that promote better sleep
    9. A 7-day implementation plan to gradually improve sleep quality
    
    Format the response in a clear, structured manner that prioritizes evidence-based approaches and acknowledges the importance of consistency in improving sleep.`;

    return this.callAiService(prompt, 'openai');
  }

  async generateMindfulnessPractices(requestDto: MindfulnessDto): Promise<any> {
    const prompt = `You are a mindfulness teacher and meditation guide with extensive experience helping people develop personalized mindfulness practices.
    
    Based on the following information, create a tailored mindfulness program:
    - Age: ${requestDto.age}
    - Gender: ${requestDto.gender}
    - Stress level (1-10): ${requestDto.stressLevel}
    - Mindfulness experience level: ${requestDto.experienceLevel}
    - Focus areas: ${requestDto.focusAreas.join(', ')}
    - Preferred practices: ${requestDto.preferredPractices ? requestDto.preferredPractices.join(', ') : 'Open to all'}
    - Available time per day: ${requestDto.availableTimePerDay} minutes
    - Preferred time of day: ${requestDto.preferredTimeOfDay || 'Not specified'}
    - Previous practices tried: ${requestDto.previousPractices || 'None'}
    - Challenges experienced: ${requestDto.challenges || 'None reported'}
    - Topics of interest: ${requestDto.topicsOfInterest || 'Not specified'}
    - Practice environment: ${requestDto.environment || 'Not specified'}
    - Guidance preference: ${requestDto.guidancePreference || 'Not specified'}
    
    Please provide a comprehensive mindfulness program that includes:
    1. A progressive 14-day mindfulness plan with specific practices for each day
    2. Detailed instructions for 3-5 core mindfulness practices tailored to their needs
    3. Recommendations for integrating mindfulness into daily life
    4. Strategies for overcoming the challenges they've identified
    5. Guidance for deepening practice over time
    6. Recommended resources (apps, books, videos) aligned with their interests and needs
    
    Format the response in a warm, encouraging tone that makes mindfulness accessible and emphasizes the benefits of consistent practice.`;

    return this.callAiService(prompt, 'openai');
  }

  async generateDailyReflection(): Promise<any> {
    const date = new Date().toLocaleDateString();
    
    const prompt = `You are a mental wellness coach specializing in daily reflection practices.
    
    Create a set of daily reflection materials for ${date} that includes:
    
    1. A thought-provoking quote related to mental wellbeing
    2. Three journal prompts that encourage self-reflection and emotional awareness
    3. A brief mindfulness exercise (2-3 minutes) to center the mind
    4. A simple mental wellness tip that can be applied throughout the day
    5. An affirmation to support positive thinking
    
    The materials should be concise, practical, and easily integrated into a busy day. The tone should be warm, supportive, and encouraging without being overly sentimental.`;

    return this.callAiService(prompt, 'gemini');
  }

  async generateCopingStrategies(emotion?: string, situation?: string): Promise<any> {
    const emotionPrompt = emotion ? `specifically for managing ${emotion}` : 'for various emotions';
    const situationPrompt = situation ? `in ${situation} situations` : 'in different situations';
    
    const prompt = `You are a mental health expert specializing in emotional regulation and coping strategies.
    
    Please provide evidence-based coping strategies ${emotionPrompt} ${situationPrompt}.
    
    Include:
    1. 5-7 practical, specific coping techniques that can be implemented immediately
    2. Brief explanations of why each strategy is effective
    3. Step-by-step instructions for implementing each technique
    4. Guidance on when each strategy is most appropriate to use
    5. How to tell if the strategy is working
    
    Format the response in a clear, actionable manner that makes these strategies accessible to someone who may be experiencing emotional distress.`;

    return this.callAiService(prompt, 'gemini');
  }

  async generateGroundingTechniques(duration: number): Promise<any> {
    const prompt = `You are a trauma-informed mental health professional specializing in grounding techniques for managing overwhelm, anxiety, and stress.
    
    Please provide ${duration}-minute grounding exercises that can help someone quickly regain emotional balance. 
    
    Include:
    1. 3-5 different grounding techniques that can be completed in ${duration} minutes or less
    2. Step-by-step instructions for each technique
    3. The specific sensory systems targeted by each technique (visual, auditory, tactile, etc.)
    4. How to modify each technique for different environments (public, workspace, home)
    5. Brief explanation of how these techniques help regulate the nervous system
    
    Format the response in a clear, calming manner appropriate for someone who may be experiencing heightened anxiety or emotional distress.`;

    return this.callAiService(prompt, 'gemini');
  }

  async generateCognitiveReframing(thoughtPattern: string): Promise<any> {
    const prompt = `You are a cognitive behavioral therapist specializing in identifying and reframing negative thought patterns.
    
    Please provide cognitive reframing exercises specifically for ${thoughtPattern} thinking patterns.
    
    Include:
    1. A brief explanation of what ${thoughtPattern} thinking is and how it affects emotions and behavior
    2. 3-5 examples of common ${thoughtPattern} thoughts
    3. Step-by-step guide to identifying these thoughts when they occur
    4. A structured framework for questioning and reframing these thoughts
    5. 3-5 examples of how to reframe the example thoughts
    6. A daily practice for building the skill of cognitive reframing
    
    Format the response in a supportive, educational manner that helps build self-awareness and cognitive flexibility.`;

    return this.callAiService(prompt, 'gemini');
  }

  async getMentalHealthResources(resourceType: string): Promise<any> {
    const prompt = `You are a mental health advocate and resource specialist with extensive knowledge of mental health support options.
    
    Please provide a curated list of mental health resources focusing on ${resourceType} support.
    
    Include:
    1. A brief introduction to the types of resources being provided
    2. 5-10 specific resources with brief descriptions of each
    3. Information on accessibility, cost (if applicable), and who might benefit most
    4. How to determine which resources are most appropriate for different needs
    5. Guidance on when to seek professional help versus self-help resources
    
    Important: Only include widely recognized, reputable resources. For crisis resources, emphasize established hotlines and text lines. For therapy resources, focus on methods for finding qualified professionals rather than specific practitioners. For self-help resources, prioritize evidence-based approaches.
    
    Format the response in a clear, organized manner that makes the information easily accessible to someone who may be seeking support.`;

    return this.callAiService(prompt, 'gemini');
  }

  private async callAiService(prompt: string, model: 'gemini' | 'openai' | 'anthropic' = 'gemini'): Promise<any> {
    try {
      switch (model) {
        case 'gemini':
          return await this.callGeminiApi(prompt);
        case 'openai':
          return await this.callOpenAiApi(prompt);
        case 'anthropic':
          return await this.callAnthropicApi(prompt);
        default:
          return await this.callGeminiApi(prompt);
      }
    } catch (error) {
      this.logger.error(`Error calling AI API: ${error.message}`);
      
      if (error.response) {
        this.logger.error(`Response error data: ${JSON.stringify(error.response.data)}`);
      }
      
      // Fall back to Gemini if other models fail
      if (model !== 'gemini') {
        this.logger.warn(`Falling back to Gemini API after ${model} failure`);
        return this.callGeminiApi(prompt);
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
                content: 'You are an expert in mental wellbeing, providing detailed, personalized guidance that is evidence-based and compassionate.'
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
      throw error;
    }
  }
  
  private async callAnthropicApi(prompt: string): Promise<any> {
    if (!this.anthropicApiKey) {
      this.logger.warn('Anthropic API key not configured, falling back to OpenAI or Gemini');
      return this.openaiApiKey ? this.callOpenAiApi(prompt) : this.callGeminiApi(prompt);
    }

    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.post(
          this.anthropicApiUrl,
          {
            model: 'claude-3-opus-20240229',
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 4096
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': this.anthropicApiKey,
              'anthropic-version': '2023-06-01'
            }
          }
        )
      );

      if (response.data?.content && response.data.content.length > 0) {
        const aiResponse = response.data.content[0]?.text || '';
        
        return {
          success: true,
          message: 'Response generated successfully',
          response: aiResponse,
          model: 'Anthropic Claude',
        };
      } else {
        throw new Error('Invalid response structure from Anthropic API');
      }
    } catch (error) {
      this.logger.error(`Anthropic API error: ${error.message}`);
      // Try OpenAI if Anthropic fails
      if (this.openaiApiKey) {
        this.logger.warn('Falling back to OpenAI API');
        return this.callOpenAiApi(prompt);
      }
      // Finally try Gemini if both fail
      return this.callGeminiApi(prompt);
    }
  }
} 