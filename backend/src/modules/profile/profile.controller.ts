import { Controller, Get, Post, Body, Headers, UnauthorizedException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ProfileService } from './profile.service';
import * as os from 'os';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('me')
  async getMe(@Headers('x-user-email') email: string) {
    if (!email) throw new UnauthorizedException('Missing x-user-email header');
    return this.profileService.getMe(email);
  }

  @Get('all')
  async getAll() {
    return this.profileService.getAll();
  }

  @Post('me')
  async updateMe(@Headers('x-user-email') email: string, @Body() body: any) {
    if (!email) throw new UnauthorizedException('Missing x-user-email header');
    return this.profileService.updateMe(email, body);
  }

  @Post('review')
  async markReviewed(@Body() body: { email: string }) {
    if (!body.email) throw new UnauthorizedException('Missing email in body');
    return this.profileService.markReviewed(body.email);
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: join(__dirname, '..', '..', '..', 'public', 'uploads'),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'video-' + uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async uploadVideo(
    @Headers('x-user-email') email: string, 
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!email) throw new UnauthorizedException('Missing x-user-email header');
    if (!file) throw new UnauthorizedException('No file uploaded');

    const videoUrl = `/uploads/${file.filename}`;
    return this.profileService.updateVideoUrl(email, videoUrl);
  }
}
