import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface PromptOptions {
  systemPrompt?: string;
  responseSchema?: any; // Simple JSON schema for structured output
}

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private genAI: GoogleGenerativeAI;
  private isMock = false;
  private modelName = 'gemini-2.5-flash';

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      this.logger.warn('No GEMINI_API_KEY provided. Running in MOCK mode.');
      this.isMock = true;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.modelName = this.configService.get<string>('LLM_MODEL', 'gemini-2.5-flash');
    }
  }

  async generateStructured(prompt: string, options?: PromptOptions): Promise<any> {
    if (this.isMock) {
      return this.mockGenerateStructured(prompt, options);
    }
    
    try {
      const modelParams: any = { model: this.modelName };
      if (options?.systemPrompt) {
        modelParams.systemInstruction = options.systemPrompt;
      }
      const model = this.genAI.getGenerativeModel(modelParams);

      const chatSession = model.startChat({
        generationConfig: {
          temperature: 0.2,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
          ...(options?.responseSchema && { responseSchema: options.responseSchema }),
        },
      });

      const result = await chatSession.sendMessage(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      this.logger.error('LLM generation failed:', error);
      throw new Error('Failed to generate real recommendations from AI.');
    }
  }

  async processDocument(filePath: string, type: string): Promise<any> {
    if (this.isMock) {
      return { type, confidence: 0.95, extractedData: { mock: true, name: 'Sample' } };
    }
    // Full implementation would read file, upload via File API if needed, then pass to model.
    return { type, confidence: 0.9, extractedData: {} };
  }

  private mockGenerateStructured(prompt: string, options?: PromptOptions): any {
    this.logger.debug('MOCK LLM called with prompt:', prompt);
    if (prompt.includes('Intake')) {
      return { nextQuestion: 'What is your current highest education level?', fieldToUpdate: null, value: null };
    }
    if (prompt.includes('Validation')) {
      return { issues: [{ type: 'missing_info', severity: 'low', question: 'Please upload your degree certificate.' }] };
    }
    if (prompt.includes('base_eligible_chance')) {
      return {
        base_eligible_chance: 85,
        general_reason: 'Your qualifications meet the standard criteria for most German public universities.',
        top_tier_eligible: true
      };
    }
    return { result: 'Mock response' };
  }
}
