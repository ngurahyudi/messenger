import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { Message } from 'src/message/entities/message.entity';
import { MessageType } from 'src/shared/enum/message-type.enum';
import { Connection, getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class Messages1649816535465 implements Seeder {
  public async run(): Promise<void> {
    const jsonOpt = {
      quick_replies: [
        {
          title: 'Yes',
          payload: 'YES',
          content_type: 'text',
        },
        {
          title: 'No',
          payload: 'NO',
          content_type: 'text',
        },
      ],
    };

    const messageDto: CreateMessageDto[] = [
      {
        type: MessageType.POSTBACK,
        sortOrder: 1,
        code: 'HI',
        message: 'Hi!',
      },
      {
        type: MessageType.POSTBACK,
        sortOrder: 2,
        code: 'NAME1',
        message: 'What is your name?',
      },
      {
        type: MessageType.MESSAGE,
        sortOrder: 1,
        code: 'NAME2',
        message: 'What is your name?',
      },
      {
        type: MessageType.MESSAGE,
        sortOrder: 2,
        code: 'DOB',
        message: 'What is your birthday? (YYYY-MM-DD)?',
      },
      {
        type: MessageType.MESSAGE,
        sortOrder: 3,
        code: 'NDOB',
        message: 'Do you want to know how many days till your next birthday ?',
        jsonOptions: jsonOpt,
      },
    ];

    const messageRepo = getRepository(Message);
    for (const message of messageDto) {
      const isMessageAvailable = await messageRepo.findOne({
        where: { code: message.code },
      });

      if (!isMessageAvailable) {
        const data = messageRepo.create(message);
        await messageRepo.save(data);
      }
    }
  }
}
