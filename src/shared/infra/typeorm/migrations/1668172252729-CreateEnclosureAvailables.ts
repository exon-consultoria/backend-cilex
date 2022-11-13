import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateEnclosureAvailables1668172252729
  implements MigrationInterface {
  name = 'CreateEnclosureAvailables1668172252729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size_big_available',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size_medium_available',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size_small_available',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('enclosures', 'enclosure_size_big_available');
    await queryRunner.dropColumn(
      'enclosures',
      'enclosure_size_medium_available',
    );
    await queryRunner.dropColumn(
      'enclosures',
      'enclosure_size_small_available',
    );
  }
}
