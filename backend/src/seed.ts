import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import { ApplicantProfile } from './modules/profile/entities/applicant-profile.entity';
import * as bcrypt from 'bcrypt';

export async function seed(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const profileRepository = dataSource.getRepository(ApplicantProfile);

  const existingDemoUser = await userRepository.findOne({ where: { email: 'demo@educaro.com' } });
  if (!existingDemoUser) {
    const passwordHash = await bcrypt.hash('Demo@1234', 10);
    const demoUser = userRepository.create({
      email: 'demo@educaro.com',
      password_hash: passwordHash,
      role: 'APPLICANT',
    });
    await userRepository.save(demoUser);

    const demoProfile = profileRepository.create({
      user: demoUser,
      goal: 'STUDY',
      completeness_score: 20,
    });
    await profileRepository.save(demoProfile);
    console.log('Seed data inserted.');
  } else {
    console.log('Seed data already exists.');
  }
}
