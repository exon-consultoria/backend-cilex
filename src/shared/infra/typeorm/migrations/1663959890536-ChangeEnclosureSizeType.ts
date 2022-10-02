import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeEnclosureSizeType1663959890536
  implements MigrationInterface {
  name = 'ChangeEnclosureSizeType1663959890536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'enclosures',
      'enclosure_size',
      new TableColumn({
        name: 'enclosure_size',
        type: 'json',
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
      }),
    );
  }
}
