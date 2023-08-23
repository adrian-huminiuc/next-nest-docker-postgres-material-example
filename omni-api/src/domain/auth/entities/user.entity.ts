import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('varchar', { nullable: false })
  @Index()
  email: string;

  @Column('varchar', { nullable: false })
  firstName: string;

  @Column('varchar', { nullable: false })
  lastName: string;

  @Column('varchar', { nullable: false })
  fullAddress: string;

  @Column('varchar', { nullable: false })
  phoneNumber: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  birthday: Date;

  @Column('varchar', { nullable: false })
  password: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  public deletedAt: Date | null;
}
