import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class UserCompanyTable1623269754632
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_company',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
        ],
      }),
    );

    // User Foreign key
    await queryRunner.addColumn(
      'user_company',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'user_company',
      new TableForeignKey({
        name: 'UserCompany',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Company Foreign key

    await queryRunner.addColumn(
      'user_company',
      new TableColumn({
        name: 'company_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'user_company',
      new TableForeignKey({
        name: 'CompanyUser',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_company', 'CompanyUser');

    await queryRunner.dropColumn('user_company', 'company_id');

    await queryRunner.dropForeignKey('user_company', 'UserCompany');

    await queryRunner.dropColumn('user_company', 'user_id');

    await queryRunner.dropTable('user_company');
  }
}
