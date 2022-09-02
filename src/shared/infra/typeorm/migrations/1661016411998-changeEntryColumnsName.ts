import { MigrationInterface, QueryRunner } from 'typeorm';

export default class changeEntryColumnsName1661016411998
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "dateIncome" to "date_income"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "financialEntity" to "financial_entity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "chartOfAccounts" to "chart_of_accounts"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "dateToPay" to "date_to_pay"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "valuePayed" to "value_payed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "titleStatus" to "title_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "payedStatus" to "payed_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "cashFlow" to "cash_flow"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "date_income" to "dateIncome"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "financial_entity" to "financialEntity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "chart_of_accounts" to "chartOfAccounts"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "date_to_pay" to "dateToPay"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "value_payed" to "valuePayed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "title_status" to "titleStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "payed_status" to "payedStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME "cash_flow" to "cashFlow"`,
    );
  }
}
