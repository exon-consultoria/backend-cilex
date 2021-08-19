import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ALterTableName1629390891045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('group_modules', 'segments');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('segments', 'group_modules');
  }
}
