import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entity/shared.entity';
import { User } from '../../user/entities/user.entity';
import { Message } from '../../message/entities/message.entity';

@Entity({ name: 'user_message' })
export class UserMessage extends SharedEntity {
  @Column({ length: 36, name: 'user_id' })
  userId: string;
  @ManyToOne(() => User, (user) => user.userMessages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 36, name: 'message_id' })
  messageId: string;
  @ManyToOne(() => Message, (message) => message.userMessages)
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @Column({ name: 'response_id', nullable: true })
  responseId?: string;

  @Column({ nullable: true })
  response?: string;

  @Column({ name: 'json_response', type: 'json', nullable: true })
  jsonResponse?: string;
}
