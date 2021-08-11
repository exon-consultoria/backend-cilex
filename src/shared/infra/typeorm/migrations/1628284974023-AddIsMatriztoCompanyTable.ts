import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsMatriztoCompanyTable1628284974023
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'companies',
      new TableColumn({
        name: 'isMatriz',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('companies', 'isMatriz');
  }
}
