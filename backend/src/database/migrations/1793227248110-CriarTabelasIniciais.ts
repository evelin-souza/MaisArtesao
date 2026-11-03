import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelasIniciais1793227248110 implements MigrationInterface {
    name = 'CriarTabelasIniciais1793227248110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artesao" DROP CONSTRAINT "UQ_8b83cbb6dddfd52b3a6774ef502"`);
        await queryRunner.query(`ALTER TABLE "artesao" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "artesao" DROP COLUMN "endereco"`);
        await queryRunner.query(`ALTER TABLE "artesao" DROP CONSTRAINT "FK_59b3901ad7e12f51c09f3f8799f"`);
        await queryRunner.query(`ALTER TABLE "artesao" ALTER COLUMN "id_usuario" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP CONSTRAINT "UQ_0a9942514087463668e9638bf90"`);
        await queryRunner.query(`ALTER TABLE "artesao" ADD CONSTRAINT "FK_59b3901ad7e12f51c09f3f8799f" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artesao" DROP CONSTRAINT "FK_59b3901ad7e12f51c09f3f8799f"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD CONSTRAINT "UQ_0a9942514087463668e9638bf90" UNIQUE ("nome")`);
        await queryRunner.query(`ALTER TABLE "artesao" ALTER COLUMN "id_usuario" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artesao" ADD CONSTRAINT "FK_59b3901ad7e12f51c09f3f8799f" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artesao" ADD "endereco" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artesao" ADD "cpf" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artesao" ADD CONSTRAINT "UQ_8b83cbb6dddfd52b3a6774ef502" UNIQUE ("cpf")`);
    }

}
