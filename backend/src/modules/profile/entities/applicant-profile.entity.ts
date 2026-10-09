import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('applicant_profiles')
export class ApplicantProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  goal: string; // STUDY, VOCATIONAL_TRAINING, EMPLOYMENT

  @Column({ type: 'int', default: 0 })
  completeness_score: number;

  @Column({ default: 'PENDING' })
  qualification_status: string;

  @Column({ nullable: true })
  education: string;

  @Column({ type: 'float', nullable: true })
  gpa: number;

  @Column({ nullable: true })
  english_test: string;

  @Column({ nullable: true })
  field: string;

  @Column({ nullable: true })
  contact_no: string;

  @Column({ type: 'text', nullable: true })
  support_message: string;

  @Column({ nullable: true })
  preferred_contact_time: string;

  @OneToOne(() => User, (user: User) => user.profile)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
