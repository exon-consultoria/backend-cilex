import { MigrationInterface, QueryRunner } from 'typeorm';

export default class changeEntryColumnDatePayedName1661018159362
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "datePayed" to "date_payed"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "date_payed" to "datePayed"`,
    );
  }
}
