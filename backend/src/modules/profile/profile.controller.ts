import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from './profile.service';

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
}
