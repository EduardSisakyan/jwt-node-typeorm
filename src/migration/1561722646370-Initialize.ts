import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1561722646370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `Vehicle` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `user_vehicles__vehicle` (`userId` int NOT NULL, `vehicleId` int NOT NULL, INDEX `IDX_a19a03e410dd3e2dc5e7672bde` (`userId`), INDEX `IDX_c552db756e7164b4af55400cc7` (`vehicleId`), PRIMARY KEY (`userId`, `vehicleId`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `user_vehicles__vehicle` ADD CONSTRAINT `FK_a19a03e410dd3e2dc5e7672bde6` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `user_vehicles__vehicle` ADD CONSTRAINT `FK_c552db756e7164b4af55400cc71` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user_vehicles__vehicle` DROP FOREIGN KEY `FK_c552db756e7164b4af55400cc71`');
        await queryRunner.query('ALTER TABLE `user_vehicles__vehicle` DROP FOREIGN KEY `FK_a19a03e410dd3e2dc5e7672bde6`');
        await queryRunner.query('DROP INDEX `IDX_c552db756e7164b4af55400cc7` ON `user_vehicles__vehicle`');
        await queryRunner.query('DROP INDEX `IDX_a19a03e410dd3e2dc5e7672bde` ON `user_vehicles__vehicle`');
        await queryRunner.query('DROP TABLE `user_vehicles__vehicle`');
        await queryRunner.query('DROP TABLE `User`');
        await queryRunner.query('DROP TABLE `Vehicle`');
    }

}
