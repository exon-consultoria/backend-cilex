import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableGroupModules1629742327133
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'group_modules',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'group_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'module_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'group_modules',
      new TableForeignKey({
        name: 'GroupModules',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'group_modules',
      new TableForeignKey({
        name: 'ModulesCompany',
        columnNames: ['module_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'modules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('group_modules', 'ModulesCompany');
    await queryRunner.dropForeignKey('group_modules', 'GroupModules');
    await queryRunner.dropTable('group_modules');
  }
}
