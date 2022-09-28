import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateEnclosureSizeColumn1663799475454
  implements MigrationInterface {
  name = 'CreateEnclosureSizeColumn1663799475454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size',
        isArray: true,
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('enclosures', 'enclosure_size');
  }
}
