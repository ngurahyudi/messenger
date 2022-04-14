import { MessageType } from 'src/shared/enum/message-type.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { SharedEntity } from '../../shared/entity/shared.entity';
import { UserMessage } from '../../user-message/entities/user-message.entity';

@Entity({ name: 'message' })
export class Message extends SharedEntity {
  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.MESSAGE,
    comment: 'POSTBACK=1, MESSAGE=2',
  })
  type: MessageType;

  @Column({ name: 'sort_order' })
  sortOrder: number;

  @Column()
  code: string;

  @Column()
  message: string;

  @Column({ name: 'json_options', type: 'json', nullable: true })
  jsonOptions?: string;

  @OneToMany(() => UserMessage, (userMessage) => userMessage.message, {
    eager: true,
  })
  userMessages: UserMessage[];
}
