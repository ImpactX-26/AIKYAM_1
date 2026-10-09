import { Controller, Post, Body, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post(':profileId/chat')
  async chat(@Param('profileId') profileId: string, @Body() body: { message: string }) {
    return this.agentsService.orchestrate(profileId, body.message);
  }

  @Post('recommend')
  async recommend(@Body() body: any) {
    return this.agentsService.recommendUniversities(body);
  }
}
