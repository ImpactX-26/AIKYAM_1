import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
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
