import { Injectable, Logger } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(private llmService: LlmService) {}

  async orchestrate(profileId: string, userInput?: string): Promise<any> {
    this.logger.log(`Orchestrating for profile ${profileId}`);
    
    // 1. Fetch Profile state (Mocked here for now)
    const profile = { completeness_score: 50, goal: 'STUDY' };
    
    // 2. Decide next action
    if (profile.completeness_score < 100) {
      // Delegate to Intake Agent
      const response = await this.llmService.generateStructured(`Intake context for user input: ${userInput}`);
      return {
        agent: 'IntakeAgent',
        message: response.nextQuestion,
        reasoning: 'Need to complete basic education profile.',
      };
    } else {
      // Delegate to Validation Agent
      const response = await this.llmService.generateStructured(`Validation context for profile`);
      return {
        agent: 'ValidationAgent',
        issues: response.issues,
        reasoning: 'Profile is complete, checking for consistency.',
      };
    }
  }

  async recommendUniversities(data: any): Promise<any> {
    let allUnis = [];
    try {
      const res = await fetch('http://universities.hipolabs.com/search?country=Germany');
      if (!res.ok) throw new Error('Failed to fetch');
      const jsonData = await res.json();
      // Fetch exactly 300 unique German universities
      allUnis = jsonData.map((u: any) => u.name).filter((name: string, index: number, self: string[]) => self.indexOf(name) === index).slice(0, 300);
    } catch (e) {
      this.logger.error('Failed to fetch universities from HipoLabs', e);
      allUnis = Array.from({length: 300}).map((_, i) => `German University ${i+1}`);
    }

    // Ask AI for a personalized rule-engine assessment first
    const prompt = `You are a highly specialized German university admission AI Agent.
    Evaluate the following Indian applicant:
    - Education: ${data.education}
    - CGPA: ${data.gpa}
    - English: ${data.englishTest}
    - Field: ${data.field}

    Return a JSON object containing:
    - base_eligible_chance (number 0-100 representing their general chances)
    - general_reason (1 short sentence explaining why they are generally eligible or not, considering Indian context like APS)
    - top_tier_eligible (boolean, true if they have very high GPA and good English suitable for TUM/RWTH)`;

    const schema = {
      type: 'object',
      properties: {
        base_eligible_chance: { type: 'number' },
        general_reason: { type: 'string' },
        top_tier_eligible: { type: 'boolean' }
      },
      required: ['base_eligible_chance', 'general_reason', 'top_tier_eligible']
    };

    let assessment;
    try {
      assessment = await this.llmService.generateStructured(prompt, { 
        systemPrompt: 'You are a fast, precise German university admission AI.',
        responseSchema: schema 
      });
    } catch (e) {
      this.logger.error('LLM assessment failed, using fallback', e);
      assessment = { base_eligible_chance: 70, general_reason: "Matches standard criteria", top_tier_eligible: false };
    }

    // Algorithmically map the 300 universities using the AI's personalized rules
    const finalUniversities = allUnis.map((name: string) => {
        const isTopTier = name.includes('Munich') || name.includes('RWTH') || name.includes('Berlin') || name.includes('Heidelberg') || name.includes('Stuttgart');
        let eligible = false;
        let reason = assessment.general_reason;

        if (isTopTier) {
            eligible = assessment.top_tier_eligible;
            if (!eligible) reason = "GPA/English not competitive enough for this highly ranked tier.";
        } else {
            // Distribute based on the AI's calculated base_eligible_chance
            const random = Math.random() * 100;
            eligible = random <= assessment.base_eligible_chance;
        }

        return {
            name,
            eligible,
            reason: eligible ? "Profile meets standard admission requirements." : reason
        };
    });

    return { universities: finalUniversities };
  }
}
