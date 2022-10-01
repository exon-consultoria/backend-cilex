import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateSizeColumnEnclosure1664388662477
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'size',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('enclosures', 'size');
  }
}
