import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddFKtoPets1638369506125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pet',
      new TableColumn({
        name: 'enclosure_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        name: 'PetEnclosure',
        columnNames: ['enclosure_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enclosures',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pet', 'PetEnclosure');
    await queryRunner.dropColumn('pet', 'enclosure_id');
  }
}
