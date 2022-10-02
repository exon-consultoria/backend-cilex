import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeIncomeIdToNullable1662681482289
  implements MigrationInterface {
  name = 'ChangeIncomeIdToNullable1662681482289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'entry',
      'income_id',
      new TableColumn({
        name: 'income_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'entry',
      'income_id',
      new TableColumn({
        name: 'income_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
  }
}
