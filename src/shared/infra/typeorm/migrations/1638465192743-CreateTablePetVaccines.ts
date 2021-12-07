import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateTablePetVaccines1638465192743
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet_vaccines',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'pet_vaccines',
      new TableColumn({
        name: 'pet_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'pet_vaccines',
      new TableForeignKey({
        name: 'PetVaccines',
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'pet_vaccines',
      new TableColumn({
        name: 'vaccine_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'pet_vaccines',
      new TableForeignKey({
        name: 'VaccinePet',
        columnNames: ['vaccine_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaccines',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pet_vaccines', 'VaccinePet');

    await queryRunner.dropColumn('pet_vaccines', 'vaccine_id');

    await queryRunner.dropForeignKey('pet_vaccines', 'PetVaccines');

    await queryRunner.dropColumn('pet_vaccines', 'pet_id');

    await queryRunner.dropTable('pet_vaccines');
  }
}
