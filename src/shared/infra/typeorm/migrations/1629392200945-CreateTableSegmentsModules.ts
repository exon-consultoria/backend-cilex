import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableSegmentsModules1629392200945
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'segment_modules',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'module_id',
            type: 'uuid',
          },
          {
            name: 'segment_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'segment_modules',
      new TableForeignKey({
        name: 'ModuleSegment',
        columnNames: ['module_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'modules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'segment_modules',
      new TableForeignKey({
        name: 'SegmentModule',
        columnNames: ['segment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'segments',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('segment_modules', 'SegmentModule');
    await queryRunner.dropForeignKey('segment_modules', 'ModuleSegment');
    await queryRunner.dropTable('segment_modules');
  }
}
