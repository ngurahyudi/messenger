import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1649911278936 implements MigrationInterface {
  name = 'Init1649911278936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`user\` (\`id\` varchar(36) NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(25) NOT NULL DEFAULT 'SYSTEM', \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(25) NOT NULL DEFAULT 'SYSTEM', \`deleted_date\` datetime(6) NULL, \`data_version\` int NOT NULL, \`user\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`user_message\` (\`id\` varchar(36) NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(25) NOT NULL DEFAULT 'SYSTEM', \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(25) NOT NULL DEFAULT 'SYSTEM', \`deleted_date\` datetime(6) NULL, \`data_version\` int NOT NULL, \`user_id\` varchar(36) NOT NULL, \`message_id\` varchar(36) NOT NULL, \`response_id\` varchar(255) NULL, \`response\` varchar(255) NULL, \`json_response\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`message\` (\`id\` varchar(36) NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(25) NOT NULL DEFAULT 'SYSTEM', \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(25) NOT NULL DEFAULT 'SYSTEM', \`deleted_date\` datetime(6) NULL, \`data_version\` int NOT NULL, \`type\` enum ('1', '2') NOT NULL COMMENT 'POSTBACK=1, MESSAGE=2' DEFAULT '2', \`sort_order\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`json_options\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_message\` ADD CONSTRAINT \`FK_ea0810084dc34adcad60c70a087\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_message\` ADD CONSTRAINT \`FK_a041c042a3fdf5715ff502be483\` FOREIGN KEY (\`message_id\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_message\` DROP FOREIGN KEY \`FK_a041c042a3fdf5715ff502be483\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_message\` DROP FOREIGN KEY \`FK_ea0810084dc34adcad60c70a087\``,
    );
    await queryRunner.query(`DROP TABLE \`message\``);
    await queryRunner.query(`DROP TABLE \`user_message\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
