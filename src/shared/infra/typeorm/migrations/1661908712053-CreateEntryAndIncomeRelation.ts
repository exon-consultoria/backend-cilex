import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateEntryAndIncomeRelation1661908712053
  implements MigrationInterface {
  name = 'CreateEntryAndIncomeRelation1661908712053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" ADD "incomeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "UQ_76f7fd51c1e617299ad80212830" UNIQUE ("incomeId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "FK_76f7fd51c1e617299ad80212830" FOREIGN KEY ("incomeId") REFERENCES "income"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "FK_76f7fd51c1e617299ad80212830"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "UQ_76f7fd51c1e617299ad80212830"`,
    );
    await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "incomeId"`);
  }
}
