import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventTypeEntity } from './event-type.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => EventTypeEntity, { lazy: true, cascade: false })
  @JoinColumn({ name: 'event_type_uuid' })
  eventType: Promise<EventTypeEntity>;

  @Column()
  eventTypeUuid: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
  })
  date: Date;

  @Column('varchar', { nullable: false })
  description: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;
}
