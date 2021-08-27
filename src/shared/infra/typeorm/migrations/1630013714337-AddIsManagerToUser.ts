import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsManagerToUser1630013714337
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'isManager',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isManager');
  }
}
