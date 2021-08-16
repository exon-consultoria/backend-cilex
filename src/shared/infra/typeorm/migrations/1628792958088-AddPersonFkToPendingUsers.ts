import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPersonFkToPendingUsers1628792958088
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pending_users',
      new TableColumn({
        name: 'person_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'pending_users',
      new TableForeignKey({
        name: 'UserPendingPeople',
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'people',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pending_users', 'UserPendingPeople');
    await queryRunner.dropColumn('pending_users', 'person_id');
  }
}
