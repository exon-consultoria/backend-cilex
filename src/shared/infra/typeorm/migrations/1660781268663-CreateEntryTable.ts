import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEntryTable1660781268663
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entry',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'dateIncome',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'financialEntity',
            type: 'varchar',
          },
          {
            name: 'chartOfAccounts',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'decimal',
          },
          {
            name: 'dateToPay',
            type: 'varchar',
          },
          {
            name: 'valuePayed',
            type: 'decimal',
          },
          {
            name: 'datePayed',
            type: 'varchar',
          },
          {
            name: 'titleStatus',
            type: 'varchar',
          },
          {
            name: 'payedStatus',
            type: 'varchar',
          },
          {
            name: 'cashFlow',
            type: 'decimal',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('entry');
  }
}
