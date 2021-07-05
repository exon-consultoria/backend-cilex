import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreatePersonCompanyTable1620624457334
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'person_company',
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

    await queryRunner.addColumn(
      'person_company',
      new TableColumn({
        name: 'person_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'person_company',
      new TableForeignKey({
        name: 'PersonCompany',
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'people',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'person_company',
      new TableColumn({
        name: 'company_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'person_company',
      new TableForeignKey({
        name: 'CompanyPerson',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('person_company', 'CompanyPerson');

    await queryRunner.dropColumn('person_company', 'company_id');

    await queryRunner.dropForeignKey('person_company', 'PersonCompany');

    await queryRunner.dropColumn('person_company', 'person_id');

    await queryRunner.dropTable('person_company');
  }
}
