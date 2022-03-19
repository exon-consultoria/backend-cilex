import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImageColor1646157367344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'companies',
      new TableColumn({
        name: 'company_logo',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'companies',
      new TableColumn({
        name: 'company_color',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('companies', 'company_color');
    await queryRunner.dropColumn('companies', 'company_logo');
  }
}
