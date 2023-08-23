import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event_types')
export class EventTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  public createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  public deletedAt: Date | null;
}
