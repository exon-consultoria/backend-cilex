import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRecurrenceIdFieldToAppointments1658458451412
  implements MigrationInterface {
  name = 'AddRecurrenceIdFieldToAppointments1658458451412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'recurrence_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'recurrence_id');
  }
}
