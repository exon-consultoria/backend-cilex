import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeRecurrenceToBoolean1658192807149
  implements MigrationInterface {
  name = 'ChangeRecurrenceToBoolean1658192807149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "recurrence"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "recurrence" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "recurrence"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "recurrence" character varying`,
    );
  }
}
