import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';
import { EventEntity } from './event.entity';

@Entity('event_subscriptions')
export class EventSubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => UserEntity, { lazy: true, cascade: false })
  @JoinColumn({ name: 'user_uuid' })
  user: Promise<UserEntity>;

  @Column()
  userUuid: string;

  @ManyToOne(() => EventEntity, { lazy: true, cascade: false })
  @JoinColumn({ name: 'event_uuid' })
  event: Promise<EventEntity>;

  @Column()
  eventUuid: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  public createdAt: Date;
}
