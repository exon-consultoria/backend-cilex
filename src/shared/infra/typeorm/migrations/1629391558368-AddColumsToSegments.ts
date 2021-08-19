import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumsToSegments1629391558368
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'segments',
      new TableColumn({
        name: 'classIcon',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'segments',
      new TableColumn({
        name: 'description',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'segments',
      new TableColumn({
        name: 'isLocked',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('segments', 'isLocked');
    await queryRunner.dropColumn('segments', 'description');
    await queryRunner.dropColumn('segments', 'classIcon');
  }
}
