import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RemoveChartOFEntryTable1662656612218
  implements MigrationInterface {
  name = 'RemoveChartOFEntryTable1662656612218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP COLUMN "chart_of_accounts"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" ADD "chart_of_accounts" character varying NOT NULL`,
    );
  }
}
