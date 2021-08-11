import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeCodToCodeCompanies1628197950386
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'cod',
      new TableColumn({
        name: 'code',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'code',
      new TableColumn({
        name: 'cod',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }
}
