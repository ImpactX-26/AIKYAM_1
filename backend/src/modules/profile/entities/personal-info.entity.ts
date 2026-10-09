import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApplicantProfile } from './applicant-profile.entity';

@Entity('personal_info')
export class PersonalInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ApplicantProfile)
  profile: ApplicantProfile;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  nationality: string;
}
