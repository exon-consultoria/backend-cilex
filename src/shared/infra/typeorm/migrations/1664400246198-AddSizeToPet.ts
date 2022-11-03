import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddSizeToPet1664400246198 implements MigrationInterface {
  name = 'AddSizeToPet1664400246198';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pet',
      new TableColumn({
        name: 'size',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pet', 'size');
  }
}
