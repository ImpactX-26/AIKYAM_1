import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApplicantProfile } from '../../profile/entities/applicant-profile.entity';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ApplicantProfile)
  profile: ApplicantProfile;

  @Column()
  type: string;

  @Column()
  file_path: string;

  @Column({ default: 'UPLOADED' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  extracted_data: any;

  @Column({ type: 'float', nullable: true })
  confidence: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
