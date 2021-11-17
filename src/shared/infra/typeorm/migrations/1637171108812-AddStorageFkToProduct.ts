import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddStorageFkToProduct1637171108812
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'standard_storage',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductStorage',
        columnNames: ['standard_storage'],
        referencedColumnNames: ['id'],
        referencedTableName: 'storage',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product', 'ProductStorage');
    await queryRunner.dropColumn('product', 'standard_storage');
  }
}
