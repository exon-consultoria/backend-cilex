import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddEnclosureSizeRelation1663540438276
  implements MigrationInterface {
  name = 'AddEnclosureSizeRelation1663540438276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'enclosures',
      new TableColumn({
        name: 'enclosure_size_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'enclosures',
      new TableForeignKey({
        name: 'EnclosureSize',
        columnNames: ['enclosure_size_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enclosure_size',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('enclosures', 'EnclosureSize');
    await queryRunner.dropColumn('enclosures', 'enclosure_size_id');
  }
}
