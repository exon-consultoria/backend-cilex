import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeEmailUniqueCompany1628282455437
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }
}
