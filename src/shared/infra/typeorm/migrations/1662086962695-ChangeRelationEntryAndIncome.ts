import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeRelationEntryAndIncome1662086962695
  implements MigrationInterface {
  name = 'ChangeRelationEntryAndIncome1662086962695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME COLUMN "incomeId" TO "income_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME CONSTRAINT "UQ_76f7fd51c1e617299ad80212830" TO "UQ_702d0e9d67d9bf64001503c526a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "FK_702d0e9d67d9bf64001503c526a" FOREIGN KEY ("income_id") REFERENCES "income"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "FK_702d0e9d67d9bf64001503c526a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME CONSTRAINT "UQ_702d0e9d67d9bf64001503c526a" TO "UQ_76f7fd51c1e617299ad80212830"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME COLUMN "income_id" TO "incomeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "FK_76f7fd51c1e617299ad80212830" FOREIGN KEY ("incomeId") REFERENCES "income"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
