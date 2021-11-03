import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableProduct1635609859697
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'technical_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'picture',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'technical_picture',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'group_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'type_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'subgroup_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'subfamily_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'family_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'umu_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'umc_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'application_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'dimensions_id',
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
      'product',
      new TableForeignKey({
        name: 'ProductType',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_type',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductGroup',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_group',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductSubGroup',
        columnNames: ['subgroup_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_subgroup',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductFamily',
        columnNames: ['family_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_family',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductSubFamily',
        columnNames: ['subfamily_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_subfamily',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductApplication',
        columnNames: ['application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_application',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductDimensions',
        columnNames: ['dimensions_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_dimensions',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductUMC',
        columnNames: ['umc_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_um',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        name: 'ProductUMU',
        columnNames: ['umu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_um',
        onDelete: 'Set Null',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product', 'ProductUMU');
    await queryRunner.dropForeignKey('product', 'ProductUMC');
    await queryRunner.dropForeignKey('product', 'ProductDimensions');
    await queryRunner.dropForeignKey('product', 'ProductApplication');
    await queryRunner.dropForeignKey('product', 'ProductSubFamily');
    await queryRunner.dropForeignKey('product', 'ProductFamily');
    await queryRunner.dropForeignKey('product', 'ProductSubGroup');
    await queryRunner.dropForeignKey('product', 'ProductGroup');
    await queryRunner.dropForeignKey('product', 'ProductType');

    await queryRunner.dropTable('product');
  }
}
