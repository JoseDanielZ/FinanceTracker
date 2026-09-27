import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('profile')
export class UserProfileOrmEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  email?: string;
}
