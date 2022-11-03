import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class EnclosureAccpetNullable1667506765026
  implements MigrationInterface {
  name = 'EnclosureAccpetNullable1667506765026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'enclosures',
      'enclosure_size',
      new TableColumn({
        name: 'enclosure_size',
        type: 'varchar',
        isArray: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'enclosures',
      'enclosure_size',
      new TableColumn({
        name: 'enclosure_size',
        type: 'varchar',
        isArray: true,
        isNullable: false,
      }),
    );
  }
}
