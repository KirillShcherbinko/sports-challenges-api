import { User } from '../../users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userId'])
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', insert: false, update: false })
  userId: number;

  @Column({ name: 'refresh_token' })
  refreshToken: string;
}
