import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ERole } from '../../shared/common/enums/roles.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @ApiPropertyOptional()
  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @ApiProperty({ enum: ERole, default: ERole.USER })
  @Column({ type: 'enum', enum: ERole, default: ERole.USER })
  role: ERole;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
