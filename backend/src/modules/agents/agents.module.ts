import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsService } from './agents.service.js';
import { AgentsController } from './agents.controller.js';
import { LlmModule } from '../llm/llm.module.js';
import { AgentRun } from './entities/agent-run.entity.js';

@Module({
  imports: [LlmModule, TypeOrmModule.forFeature([AgentRun])],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
