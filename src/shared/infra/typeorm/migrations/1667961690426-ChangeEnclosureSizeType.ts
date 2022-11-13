import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeEnclosureSizeType1667961690426
  implements MigrationInterface {
  name = 'ChangeEnclosureSizeType1667961690426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('enclosures', 'enclosure_size');

    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size_big',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size_medium',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size_small',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size',
        type: 'json',
      }),
    );

    await queryRunner.dropColumn('enclosures', 'enclosure_size_big');
    await queryRunner.dropColumn('enclosures', 'enclosure_size_medium');
    await queryRunner.dropColumn('enclosures', 'enclosure_size_small');
  }
}
