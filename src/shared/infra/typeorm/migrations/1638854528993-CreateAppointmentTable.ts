import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAppointmentTable1638854528993
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'work_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'recurrence',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'done',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'date',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'hour',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pet_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'owner_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentPet',
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentWork',
        columnNames: ['work_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'works',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentOwner',
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'people',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentOwner');
    await queryRunner.dropForeignKey('appointments', 'AppointmentWork');
    await queryRunner.dropForeignKey('appointments', 'AppointmentPet');
    await queryRunner.dropTable('appointments');
  }
}
