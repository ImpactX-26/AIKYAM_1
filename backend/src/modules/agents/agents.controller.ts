import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AgentsService } from './agents.service';
import { diskStorage } from 'multer';
import * as os from 'os';
import { extname } from 'path';

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

  @Post('analyze-video')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: os.tmpdir(),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'video-' + uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async analyzeVideo(@UploadedFile() file: Express.Multer.File) {
    console.log('--- analyze-video ENDPOINT HIT ---');
    console.log('File:', file?.originalname, 'Size:', file?.size);
    if (!file) {
      throw new BadRequestException('No video file uploaded');
    }
    return this.agentsService.analyzeVideo(file);
  }
}
