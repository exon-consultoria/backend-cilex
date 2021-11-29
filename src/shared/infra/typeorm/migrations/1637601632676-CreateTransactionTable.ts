import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTransactionTable1637601632676
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'origin_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'destination_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'varchar',
            isNullable: false,
            default: 1,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
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
      'transaction',
      new TableForeignKey({
        name: 'TransactionProduct',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'TransactionUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'TransactionOrigin',
        columnNames: ['origin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'storage',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'TransactionDestination',
        columnNames: ['destination_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'storage',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transaction', 'TransactionDestination');
    await queryRunner.dropForeignKey('transaction', 'TransactionOrigin');
    await queryRunner.dropForeignKey('transaction', 'TransactionUser');
    await queryRunner.dropForeignKey('transaction', 'TransactionProduct');
    await queryRunner.dropTable('transaction');
  }
}
