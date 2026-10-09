import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service.js';
import { ProfileController } from './profile.controller.js';
import { ApplicantProfile } from './entities/applicant-profile.entity.js';
import { PersonalInfo } from './entities/personal-info.entity.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantProfile, PersonalInfo]), UsersModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {}
