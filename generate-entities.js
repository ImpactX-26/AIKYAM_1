const fs = require('fs');
const path = require('path');

const entities = {
  'profile/entities/applicant-profile.entity.ts': `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
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
  qualification_status: string; // QUALIFIED, PARTIALLY_QUALIFIED, NOT_QUALIFIED

  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
`,
  'profile/entities/personal-info.entity.ts': `import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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
`,
  'documents/entities/document.entity.ts': `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
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
`,
  'agents/entities/agent-run.entity.ts': `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ApplicantProfile } from '../../profile/entities/applicant-profile.entity';

@Entity('agent_runs')
export class AgentRun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ApplicantProfile)
  profile: ApplicantProfile;

  @Column()
  agent_name: string;

  @Column({ type: 'text', nullable: true })
  input_summary: string;

  @Column({ type: 'jsonb', nullable: true })
  tool_calls: any;

  @Column({ type: 'text', nullable: true })
  output: string;

  @Column({ nullable: true })
  latency_ms: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
`
};

Object.entries(entities).forEach(([relPath, content]) => {
  const fullPath = path.join(__dirname, 'backend/src/modules', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log("Entities generated.");
