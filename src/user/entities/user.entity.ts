import { Column, Entity, OneToMany } from 'typeorm';
import { SharedEntity } from '../../shared/entity/shared.entity';
import { UserMessage } from '../../user-message/entities/user-message.entity';

@Entity({ name: 'user' })
export class User extends SharedEntity {
  @Column()
  user: string;

  @Column({ nullable: true })
  name?: string;

  @OneToMany(() => UserMessage, (userMessage) => userMessage.user, {
    eager: true,
  })
  userMessages: UserMessage[];
}
