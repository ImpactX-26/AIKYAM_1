import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantProfile } from './entities/applicant-profile.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ApplicantProfile)
    private profileRepository: Repository<ApplicantProfile>,
    private usersService: UsersService
  ) {}

  async getMe(email: string) {
    if (!email) return null;
    let profile = await this.profileRepository.findOne({ 
      where: { user: { email } },
      relations: { user: true }
    });
    
    if (!profile) {
      const user = await this.usersService.findOne(email);
      if (user) {
        profile = this.profileRepository.create({ user, completeness_score: 0 });
        await this.profileRepository.save(profile);
      }
    }
    return profile;
  }

  async getAll() {
    // For demo, just return an array of all profiles
    const profiles = await this.profileRepository.find({
      relations: { user: true }
    });
    return profiles;
  }

  async updateMe(email: string, data: any) {
    const profile = await this.getMe(email);
    if (profile) {
      Object.assign(profile, {
        education: data.education !== undefined ? data.education : profile.education,
        gpa: data.gpa !== undefined ? (data.gpa ? parseFloat(data.gpa) : null) : profile.gpa,
        english_test: data.englishTest !== undefined ? data.englishTest : profile.english_test,
        field: data.field !== undefined ? data.field : profile.field,
        contact_no: data.contactNo !== undefined ? data.contactNo : profile.contact_no,
        support_message: data.supportMessage !== undefined ? data.supportMessage : profile.support_message,
        preferred_contact_time: data.preferredTime !== undefined ? data.preferredTime : profile.preferred_contact_time,
        completeness_score: data.education ? 80 : profile.completeness_score,
        qualification_status: data.education ? 'QUALIFIED' : profile.qualification_status
      });
      return this.profileRepository.save(profile);
    }
    return null;
  }

  async markReviewed(email: string) {
    const profile = await this.getMe(email);
    if (profile && profile.completeness_score === 80) {
      profile.completeness_score = 100;
      profile.qualification_status = 'REVIEWED';
      return this.profileRepository.save(profile);
    }
    return null;
  }

  async updateVideoUrl(email: string, videoUrl: string) {
    const profile = await this.getMe(email);
    if (profile) {
      profile.introduction_video_url = videoUrl;
      return this.profileRepository.save(profile);
    }
    return null;
  }
}
